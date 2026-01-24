import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  clientFirstName: string;
  clientMiddleName: string;
  clientLastName: string;
  dateOfBirth: string;
  dateAuthorized: string;
  authorizedBy: string;
  informationReleased: string;
  otherInformation: string;
  purposeMyRequest: boolean;
  purposeOther: string;
  personAuthorizedToMake: string;
  personAuthorizedToReceive: string;
  expirationDate: string;
  expirationEvent: string;
  patientSignature: string;
  patientSignatureDate: string;
  representativeSignature: string;
  representativeRelationship: string;
  representativeSignatureDate: string;
}

export const AuthorizationForm = () => {
  const patientSignatureRef = useRef<SignatureCanvas>(null);
  const representativeSignatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    clientFirstName: '',
    clientMiddleName: '',
    clientLastName: '',
    dateOfBirth: '',
    dateAuthorized: '',
    authorizedBy: '',
    informationReleased: '',
    otherInformation: '',
    purposeMyRequest: true,
    purposeOther: '',
    personAuthorizedToMake: '',
    personAuthorizedToReceive: '',
    expirationDate: '',
    expirationEvent: '',
    patientSignature: '',
    patientSignatureDate: new Date().toISOString().split('T')[0],
    representativeSignature: '',
    representativeRelationship: '',
    representativeSignatureDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearSignature = (ref: React.RefObject<SignatureCanvas>) => {
    ref.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (patientSignatureRef.current?.isEmpty()) {
      showToast('Please provide patient signature before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const patientSignatureDataUrl = patientSignatureRef.current?.toDataURL();
      const representativeSignatureDataUrl = !representativeSignatureRef.current?.isEmpty()
        ? representativeSignatureRef.current?.toDataURL()
        : null;

      const pdfDoc = await PDFDocument.create();
      const page1 = pdfDoc.addPage([612, 792]);
      const page2 = pdfDoc.addPage([612, 792]);

      const { width, height } = page1.getSize();
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');
      const helvetica = await pdfDoc.embedFont('Helvetica');

      let yPosition = height - 40;

      // PAGE 1 HEADER
      page1.drawText('AUTHORIZATION FOR USE OR DISCLOSURE OF', {
        x: 140,
        y: yPosition,
        size: 12,
        font: helveticaBold,
      });
      yPosition -= 16;
      page1.drawText('PROTECTED HEALTH INFORMATION', {
        x: 170,
        y: yPosition,
        size: 12,
        font: helveticaBold,
      });
      yPosition -= 14;
      page1.drawText('(Page 1 of 2)', {
        x: 270,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 30;

      // Client's name
      page1.drawText('1.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText("Client's name:", { x: 60, y: yPosition, size: 10, font: helvetica });
      page1.drawLine({ start: { x: 140, y: yPosition - 2 }, end: { x: 550, y: yPosition - 2 }, thickness: 1 });

      const clientName = `${formData.clientFirstName}     ${formData.clientMiddleName}     ${formData.clientLastName}`;
      page1.drawText(clientName, { x: 140, y: yPosition + 2, size: 9, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 20;
      page1.drawText('First Name           Middle Name           Last Name', {
        x: 140,
        y: yPosition,
        size: 8,
        font: helvetica,
      });

      yPosition -= 30;

      // Date of Birth
      page1.drawText('2.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Date of Birth:', { x: 60, y: yPosition, size: 10, font: helvetica });
      page1.drawText(formData.dateOfBirth, { x: 140, y: yPosition, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 24;

      // Date authorization initiated
      page1.drawText('3.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Date authorization initiated:', { x: 60, y: yPosition, size: 10, font: helvetica });
      page1.drawText(formData.dateAuthorized, { x: 200, y: yPosition, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 24;

      // Authorization Initiated by
      page1.drawText('4.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Authorization Initiated by:', { x: 60, y: yPosition, size: 10, font: helvetica });
      page1.drawLine({ start: { x: 60, y: yPosition - 16 }, end: { x: 550, y: yPosition - 16 }, thickness: 1 });
      page1.drawText(formData.authorizedBy, { x: 60, y: yPosition - 30, size: 9, font: helvetica, color: rgb(0, 0, 1) });
      yPosition -= 32;
      page1.drawText('Name (client, provider, or other)', {
        x: 200,
        y: yPosition,
        size: 8,
        font: helvetica,
      });

      yPosition -= 30;

      // Information to be released
      page1.drawText('5.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Information to be released:', { x: 60, y: yPosition, size: 10, font: helvetica });

      yPosition -= 20;

      const psychotherapyChecked = formData.informationReleased === 'psychotherapy';
      // Draw checkbox
      page1.drawRectangle({
        x: 60,
        y: yPosition - 2,
        width: 10,
        height: 10,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      if (psychotherapyChecked) {
        page1.drawText('X', { x: 62, y: yPosition, size: 10, font: helveticaBold });
      }
      page1.drawText(
        'Authorization is for Psychotherapy Notes ONLY (Important: If this authorization is for',
        { x: 80, y: yPosition, size: 9, font: helvetica }
      );
      yPosition -= 12;
      page1.drawText(
        'Psychotherapy Notes, you must not use it as an authorization for any other type of',
        { x: 80, y: yPosition, size: 9, font: helvetica }
      );
      yPosition -= 12;
      page1.drawText('protected health information.)', { x: 80, y: yPosition, size: 9, font: helvetica });

      yPosition -= 20;

      const otherChecked = formData.informationReleased === 'other';
      // Draw checkbox
      page1.drawRectangle({
        x: 60,
        y: yPosition - 2,
        width: 10,
        height: 10,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      if (otherChecked) {
        page1.drawText('X', { x: 62, y: yPosition, size: 10, font: helveticaBold });
      }
      page1.drawText('Other (describe information in detail):', { x: 80, y: yPosition, size: 9, font: helvetica });
      page1.drawLine({ start: { x: 260, y: yPosition - 2 }, end: { x: 550, y: yPosition - 2 }, thickness: 1 });
      if (formData.otherInformation) {
        page1.drawText(formData.otherInformation, { x: 260, y: yPosition - 16, size: 8, font: helvetica, color: rgb(0, 0, 1) });
      }

      yPosition -= 35;

      // Purpose of Disclosure
      page1.drawText('6.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Purpose of Disclosure: The reason I am authorizing release is:', {
        x: 60,
        y: yPosition,
        size: 10,
        font: helvetica,
      });

      yPosition -= 20;

      // Draw checkbox
      page1.drawRectangle({
        x: 60,
        y: yPosition - 2,
        width: 10,
        height: 10,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      if (formData.purposeMyRequest) {
        page1.drawText('X', { x: 62, y: yPosition, size: 10, font: helveticaBold });
      }
      page1.drawText('My request', { x: 80, y: yPosition, size: 9, font: helvetica });

      yPosition -= 18;

      // Draw checkbox
      page1.drawRectangle({
        x: 60,
        y: yPosition - 2,
        width: 10,
        height: 10,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      if (!formData.purposeMyRequest) {
        page1.drawText('X', { x: 62, y: yPosition, size: 10, font: helveticaBold });
      }
      page1.drawText('Other (describe):', { x: 80, y: yPosition, size: 9, font: helvetica });
      page1.drawLine({ start: { x: 165, y: yPosition - 2 }, end: { x: 550, y: yPosition - 2 }, thickness: 1 });
      if (formData.purposeOther) {
        page1.drawText(formData.purposeOther, { x: 165, y: yPosition - 16, size: 8, font: helvetica, color: rgb(0, 0, 1) });
      }

      yPosition -= 35;

      // Person(s) Authorized to Make the Disclosure
      page1.drawText('7.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Person(s) Authorized to Make the Disclosure:', {
        x: 60,
        y: yPosition,
        size: 10,
        font: helvetica,
      });
      page1.drawLine({ start: { x: 60, y: yPosition - 16 }, end: { x: 550, y: yPosition - 16 }, thickness: 1 });
      page1.drawText(formData.personAuthorizedToMake, { x: 60, y: yPosition - 30, size: 9, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 50;

      // Person(s) Authorized to Receive the Disclosure
      page1.drawText('8.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('Person(s) Authorized to Receive the Disclosure:', {
        x: 60,
        y: yPosition,
        size: 10,
        font: helvetica,
      });
      page1.drawLine({ start: { x: 60, y: yPosition - 16 }, end: { x: 550, y: yPosition - 16 }, thickness: 1 });
      page1.drawText(formData.personAuthorizedToReceive, { x: 60, y: yPosition - 30, size: 9, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 50;

      // Expiration
      page1.drawText('9.', { x: 40, y: yPosition, size: 10, font: helvetica });
      page1.drawText('This Authorization will expire on', { x: 60, y: yPosition, size: 10, font: helvetica });
      page1.drawText(formData.expirationDate, { x: 240, y: yPosition, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      page1.drawText('or upon the happening of the following event:', {
        x: 300,
        y: yPosition,
        size: 10,
        font: helvetica,
      });

      yPosition -= 4;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 550, y: yPosition }, thickness: 1 });
      if (formData.expirationEvent) {
        page1.drawText(formData.expirationEvent, { x: 60, y: yPosition - 14, size: 9, font: helvetica, color: rgb(0, 0, 1) });
      }

      yPosition -= 40;

      // Authorization and Signature section
      const authText = [
        'Authorization and Signature: I authorize the release of my confidential protected health',
        'information, as described above. I understand that this authorization is voluntary. I can refuse to',
        'sign this authorization. I understand that I may revoke this authorization at any time by notifying',
        'the custodian of the record in writing. I further understand that such revocation will not apply to',
        'information released by the custodian of records in response to this authorization given prior to my',
        'request to revoke. I understand that the revocation must be in writing and needs to conform to my',
        "directions. The information that is used and/or disclosed pursuant to this authorization may be",
        're-disclosed by the recipient unless the recipient is covered by state laws that limit the use',
        'and/or disclosure of my confidential protected health information.',
      ];

      for (const line of authText) {
        page1.drawText(line, { x: 40, y: yPosition, size: 8, font: helvetica });
        yPosition -= 12;
      }

      yPosition -= 20;

      // Signature of the Patient
      page1.drawText('Signature of the Patient:', { x: 40, y: yPosition, size: 9, font: helveticaBold });
      page1.drawLine({ start: { x: 40, y: yPosition - 2 }, end: { x: 420, y: yPosition - 2 }, thickness: 1 });

      if (patientSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(patientSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 40,
          y: yPosition - signatureDims.height - 2,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      yPosition -= 30;

      // Signature of Personal Representative
      page1.drawText('Signature of Personal Representative:', {
        x: 40,
        y: yPosition,
        size: 9,
        font: helveticaBold,
      });
      page1.drawLine({ start: { x: 40, y: yPosition - 2 }, end: { x: 420, y: yPosition - 2 }, thickness: 1 });

      if (representativeSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(representativeSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 40,
          y: yPosition - signatureDims.height - 2,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      yPosition -= 30;

      // Relationship to Patient if Personal Representative
      page1.drawText('Relationship to Patient if Personal Representative:', {
        x: 40,
        y: yPosition,
        size: 9,
        font: helveticaBold,
      });
      page1.drawLine({ start: { x: 40, y: yPosition - 2 }, end: { x: 300, y: yPosition - 2 }, thickness: 1 });
      if (formData.representativeRelationship) {
        page1.drawText(formData.representativeRelationship, {
          x: 40,
          y: yPosition - 16,
          size: 9,
          font: helvetica,
          color: rgb(0, 0, 1),
        });
      }

      yPosition -= 30;

      // Date of signature
      page1.drawText('Date of signature:', { x: 40, y: yPosition, size: 9, font: helveticaBold });
      page1.drawLine({ start: { x: 140, y: yPosition - 2 }, end: { x: 250, y: yPosition - 2 }, thickness: 1 });
      page1.drawText(formData.patientSignatureDate, { x: 140, y: yPosition - 16, size: 9, font: helvetica, color: rgb(0, 0, 1) });

      // PAGE 2 - Patient Rights
      yPosition = height - 50;

      page2.drawText('PATIENT RIGHTS AND HIPAA AUTHORIZATIONS', {
        x: 160,
        y: yPosition,
        size: 12,
        font: helveticaBold,
      });
      yPosition -= 14;
      page2.drawText('(Page 2 of 2)', {
        x: 270,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 30;

      page2.drawText(
        'The following specifies your rights about this authorization under the Health Insurance Portability',
        { x: 40, y: yPosition, size: 9, font: helvetica }
      );
      yPosition -= 12;
      page2.drawText('and Accountability Act of 1996, as amended from time to time ("HIPAA").', {
        x: 40,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 26;

      const page2Content = [
        {
          number: '1.',
          text: "Tell your mental health professional if you don't understand this authorization, and they will explain it to you.",
        },
        {
          number: '2.',
          text: 'You have the right to revoke or cancel this authorization at any time, except: (a) to the extent information has already been shared based on this authorization; or (b) this authorization was obtained as a condition of obtaining insurance coverage. To revoke or cancel this authorization, you must submit your request in writing to your mental health professional and your insurance company, if applicable.',
        },
        {
          number: '3.',
          text: "You may refuse to sign this authorization. Your refusal to sign will not affect your ability to obtain treatment, payment, enrollment, or affect your eligibility for benefits. If you refuse to sign this authorization, and you are in a research-related treatment program, or have authorized disclosure of information about you to a third party, your provider has the the right to refuse to treat you or accept you in a research program.",
        },
        {
          number: '4.',
          text: 'Once the information leaves this office according to the terms of this authorization, this office has no control over how it will be used by the recipient. You need to be aware that your information may no longer be protected by HIPAA.',
        },
        {
          number: '5.',
          text: 'If this office initiated this authorization, you must receive a copy of the signed authorization.',
        },
        {
          number: '6.',
          text: 'Special Instructions for completing this authorization for the use and disclosure of Psychotherapy Notes. HIPAA provides special protections to certain medical records known as "Psychotherapy Notes." All Psychotherapy Notes recorded on any medium (i.e., paper, electronic), by a mental health professional (such as a psychologist or psychiatrist) must be kept by the author and filed separate from the rest of the client\'s medical records to maintain a higher standard of protection. "Psychotherapy Notes" are defined under HIPAA as notes recorded by a health care provider who is a mental health professional documenting or analyzing the contents of conversation during a private counseling session or a group, joint, or family counseling session and that are separated from the rest of the individual\'s medical records. Excluded from the "Psychotherapy Notes" definition are the following: (a) medication prescription and monitoring, (b) counseling session start and stop times, (c) the modalities and frequencies of treatment furnished, (d) the results of clinical tests, and (e) any summary of: diagnosis, functional status, the treatment plan, symptoms, prognosis, and progress to date.',
        },
        {
          number: '',
          text: 'In order for a medical provider to release "Psychotherapy Notes" to a third party, the client who is the subject of the Psychotherapy Notes must sign this authorization to specifically allow for the release of Psychotherapy Notes. Such authorization must be separate from an authorization to release other medical records.',
        },
      ];

      for (const item of page2Content) {
        if (item.number) {
          page2.drawText(item.number, { x: 40, y: yPosition, size: 9, font: helvetica });
        }

        const words = item.text.split(' ');
        let line = '';
        const xPos = item.number ? 60 : 60;
        const maxWidth = 520;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = helvetica.widthOfTextAtSize(testLine, 9);

          if (testWidth > maxWidth && i > 0) {
            page2.drawText(line, { x: xPos, y: yPosition, size: 9, font: helvetica });
            line = words[i] + ' ';
            yPosition -= 12;
          } else {
            line = testLine;
          }
        }
        page2.drawText(line, { x: xPos, y: yPosition, size: 9, font: helvetica });
        yPosition -= 24;
      }

      const pdfBytes = await pdfDoc.save();

      const emailService = new EmailService();
      await emailService.sendSignedForm(
        `${formData.clientFirstName} ${formData.clientLastName}` || 'Client',
        pdfBytes,
        'Authorization Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      setTimeout(() => {
        setFormData({
          clientFirstName: '',
          clientMiddleName: '',
          clientLastName: '',
          dateOfBirth: '',
          dateAuthorized: '',
          authorizedBy: '',
          informationReleased: '',
          otherInformation: '',
          purposeMyRequest: true,
          purposeOther: '',
          personAuthorizedToMake: '',
          personAuthorizedToReceive: '',
          expirationDate: '',
          expirationEvent: '',
          patientSignature: '',
          patientSignatureDate: new Date().toISOString().split('T')[0],
          representativeSignature: '',
          representativeRelationship: '',
          representativeSignatureDate: '',
        });
        patientSignatureRef.current?.clear();
        representativeSignatureRef.current?.clear();
      }, 2000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('There was an error submitting the form. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/helpfulForms.jpg" />

      <main className={styles.container}>
        <section className={styles.formSection}>
          <h1>AUTHORIZATION FOR USE OR DISCLOSURE OF PROTECTED HEALTH INFORMATION</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/Authorization.pdf" target="_blank" rel="noopener noreferrer">
                View Full PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Client Name */}
            <div className={styles.formGroup}>
              <label htmlFor="clientFirstName">1. Client&apos;s Name *</label>
              <div className={styles.nameFields}>
                <input
                  type="text"
                  id="clientFirstName"
                  name="clientFirstName"
                  placeholder="First Name"
                  value={formData.clientFirstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="clientMiddleName"
                  placeholder="Middle Name"
                  value={formData.clientMiddleName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="clientLastName"
                  placeholder="Last Name"
                  value={formData.clientLastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className={styles.formGroup}>
              <label htmlFor="dateOfBirth">2. Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Date authorization initiated */}
            <div className={styles.formGroup}>
              <label htmlFor="dateAuthorized">3. Date authorization initiated *</label>
              <input
                type="date"
                id="dateAuthorized"
                name="dateAuthorized"
                value={formData.dateAuthorized}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Authorization Initiated by */}
            <div className={styles.formGroup}>
              <label htmlFor="authorizedBy">
                4. Authorization Initiated by (Name: client, provider, or other) *
              </label>
              <input
                type="text"
                id="authorizedBy"
                name="authorizedBy"
                value={formData.authorizedBy}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Information to be released */}
            <div className={styles.formGroup}>
              <label>5. Information to be released *</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="informationReleased"
                    value="psychotherapy"
                    checked={formData.informationReleased === 'psychotherapy'}
                    onChange={handleInputChange}
                  />
                  Authorization is for Psychotherapy Notes ONLY (Important: If this authorization is for
                  Psychotherapy Notes, you must not use it as an authorization for any other type of protected
                  health information.)
                </label>
                <label>
                  <input
                    type="radio"
                    name="informationReleased"
                    value="other"
                    checked={formData.informationReleased === 'other'}
                    onChange={handleInputChange}
                  />
                  Other (describe information in detail):
                </label>
                {formData.informationReleased === 'other' && (
                  <textarea
                    name="otherInformation"
                    value={formData.otherInformation}
                    onChange={handleInputChange}
                    placeholder="Describe information in detail"
                    rows={3}
                  />
                )}
              </div>
            </div>

            {/* Purpose of Disclosure */}
            <div className={styles.formGroup}>
              <label>6. Purpose of Disclosure: The reason I am authorizing release is *</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="purposeMyRequest"
                    checked={formData.purposeMyRequest}
                    onChange={() => setFormData((prev) => ({ ...prev, purposeMyRequest: true }))}
                  />
                  My request
                </label>
                <label>
                  <input
                    type="radio"
                    name="purposeMyRequest"
                    checked={!formData.purposeMyRequest}
                    onChange={() => setFormData((prev) => ({ ...prev, purposeMyRequest: false }))}
                  />
                  Other (describe):
                </label>
                {!formData.purposeMyRequest && (
                  <input
                    type="text"
                    name="purposeOther"
                    value={formData.purposeOther}
                    onChange={handleInputChange}
                    placeholder="Describe the purpose"
                  />
                )}
              </div>
            </div>

            {/* Person(s) Authorized to Make the Disclosure */}
            <div className={styles.formGroup}>
              <label htmlFor="personAuthorizedToMake">7. Person(s) Authorized to Make the Disclosure *</label>
              <input
                type="text"
                id="personAuthorizedToMake"
                name="personAuthorizedToMake"
                value={formData.personAuthorizedToMake}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Person(s) Authorized to Receive the Disclosure */}
            <div className={styles.formGroup}>
              <label htmlFor="personAuthorizedToReceive">
                8. Person(s) Authorized to Receive the Disclosure *
              </label>
              <input
                type="text"
                id="personAuthorizedToReceive"
                name="personAuthorizedToReceive"
                value={formData.personAuthorizedToReceive}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Expiration */}
            <div className={styles.formGroup}>
              <label htmlFor="expirationDate">9. This Authorization will expire on *</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="expirationEvent" style={{ marginTop: '1rem' }}>
                Or upon the happening of the following event:
              </label>
              <input
                type="text"
                id="expirationEvent"
                name="expirationEvent"
                value={formData.expirationEvent}
                onChange={handleInputChange}
                placeholder="Describe event (optional)"
              />
            </div>

            <hr className={styles.pageDivider} />

            <div className={styles.consentText}>
              <p>
                <strong>Authorization and Signature:</strong> I authorize the release of my confidential
                protected health information, as described above. I understand that this authorization is
                voluntary. I can refuse to sign this authorization. I understand that I may revoke this
                authorization at any time by notifying the custodian of the record in writing. I further
                understand that such revocation will not apply to information released by the custodian of
                records in response to this authorization given prior to my request to revoke. I understand that
                the revocation must be in writing and needs to conform to my directions. The information that is
                used and/or disclosed pursuant to this authorization may be re-disclosed by the recipient unless
                the recipient is covered by state laws that limit the use and/or disclosure of my confidential
                protected health information.
              </p>
            </div>

            {/* Patient Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <label>Signature of the Patient *</label>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={patientSignatureRef}
                      penColor="black"
                      minWidth={4}
                      maxWidth={5}
                      canvasProps={{
                        className: styles.signatureCanvas,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => clearSignature(patientSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="patientSignatureDate">DATE *</label>
                  <input
                    type="date"
                    id="patientSignatureDate"
                    name="patientSignatureDate"
                    value={formData.patientSignatureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Personal Representative Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLabel}>
                <p>
                  Signature of Personal Representative
                  <br />
                  (if applicable)
                </p>
              </div>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={representativeSignatureRef}
                      penColor="black"
                      minWidth={4}
                      maxWidth={5}
                      canvasProps={{
                        className: styles.signatureCanvas,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => clearSignature(representativeSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="representativeSignatureDate">DATE</label>
                  <input
                    type="date"
                    id="representativeSignatureDate"
                    name="representativeSignatureDate"
                    value={formData.representativeSignatureDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Relationship to Patient */}
            <div className={styles.formGroup}>
              <label htmlFor="representativeRelationship">
                Relationship to Patient if Personal Representative
              </label>
              <input
                type="text"
                id="representativeRelationship"
                name="representativeRelationship"
                value={formData.representativeRelationship}
                onChange={handleInputChange}
                placeholder="e.g., Parent, Guardian, Power of Attorney"
              />
            </div>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className={styles.spinnerContainer}>
                    <span className={styles.spinner}></span>
                    Submitting...
                  </span>
                ) : (
                  'Submit Authorization Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood the Authorization
                for Use or Disclosure of Protected Health Information form, and you agree to its terms.
              </p>
            </div>
          </form>
        </section>

        {toast && (
          <div className={`${styles.toast} ${styles[toast.type]}`}>
            {toast.message}
          </div>
        )}
      </main>

      <PmtFooter />
    </Fragment>
  );
};

export default AuthorizationForm;
