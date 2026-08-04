import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  clientSignature: string;
  clientDate: string;
  spouseSignature: string;
  spouseDate: string;
  parentGuardianSignature: string;
  parentGuardianDate: string;
  hipaaSignature: string;
  hipaaDate: string;
  printName: string;
  patientName: string;
}

export const ConsentForm = () => {
  const clientSignatureRef = useRef<SignatureCanvas>(null);
  const spouseSignatureRef = useRef<SignatureCanvas>(null);
  const parentGuardianSignatureRef = useRef<SignatureCanvas>(null);
  const hipaaSignatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    clientSignature: '',
    clientDate: new Date().toISOString().split('T')[0],
    spouseSignature: '',
    spouseDate: '',
    parentGuardianSignature: '',
    parentGuardianDate: '',
    hipaaSignature: '',
    hipaaDate: new Date().toISOString().split('T')[0],
    printName: '',
    patientName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearSignature = (ref: React.RefObject<SignatureCanvas>) => {
    ref.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clientSignatureRef.current?.isEmpty() || hipaaSignatureRef.current?.isEmpty()) {
      showToast('Please provide all required signatures before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get all signatures as data URLs
      const clientSignatureDataUrl = clientSignatureRef.current?.toDataURL();
      const spouseSignatureDataUrl = !spouseSignatureRef.current?.isEmpty()
        ? spouseSignatureRef.current?.toDataURL()
        : null;
      const parentGuardianSignatureDataUrl = !parentGuardianSignatureRef.current?.isEmpty()
        ? parentGuardianSignatureRef.current?.toDataURL()
        : null;
      const hipaaSignatureDataUrl = hipaaSignatureRef.current?.toDataURL();

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add two pages
      const page1 = pdfDoc.addPage([612, 792]); // Letter size
      const page2 = pdfDoc.addPage([612, 792]);

      const { width, height } = page1.getSize();

      // Embed font
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');
      const helvetica = await pdfDoc.embedFont('Helvetica');

      // PAGE 1 - AGREEMENT & CONSENT FOR TREATMENT
      let yPosition = height - 60;

      // Title
      page1.drawText('AGREEMENT & CONSENT FOR TREATMENT', {
        x: 80,
        y: yPosition,
        size: 14,
        font: helveticaBold,
      });

      yPosition -= 50;

      // Main text paragraphs
      const drawWrappedText = (page: any, text: string, x: number, y: number, maxWidth: number, fontSize: number, font: any) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && i > 0) {
            page.drawText(line, { x, y: currentY, size: fontSize, font });
            line = words[i] + ' ';
            currentY -= fontSize + 4;
          } else {
            line = testLine;
          }
        }
        page.drawText(line, { x, y: currentY, size: fontSize, font });
        return currentY - fontSize - 4;
      };

      const paragraphs = [
        'I understand that, consistent with the HIPAA requirements, consent to treatment and consent to release will expire after twelve months and I may revoke such consent at will, although revocation is not retroactive.',
        'I have been informed of and read the preceding information and agree to it. I authorize treatment of the person named below and agree to pay all fees for services rendered by my therapist.',
        'If you have any questions or would like additional information, please feel free to ask.'
      ];

      for (const para of paragraphs) {
        yPosition = drawWrappedText(page1, para, 60, yPosition, width - 120, 11, helvetica);
        yPosition -= 15;
      }

      yPosition -= 10;
      page1.drawText('ATTESTING THAT I UNDERSTAND THE ABOVE AND AGREE TO THERAPY', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });
      yPosition -= 16;
      page1.drawText('UNDER THE ABOVE LIST OF DISCLOSURES I HAVE SIGNED BELOW:', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });

      yPosition -= 40;

      // Client Signature
      page1.drawText('CLIENT SIGNATURE', { x: 60, y: yPosition, size: 9, font: helveticaBold });
      page1.drawText('DATE', { x: 450, y: yPosition, size: 9, font: helveticaBold });

      yPosition -= 5;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page1.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (clientSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(clientSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      page1.drawText(formData.clientDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 50;

      // Spouse Signature
      page1.drawText('SIGNATURE OF SPOUSE IF', { x: 60, y: yPosition, size: 9, font: helveticaBold });
      yPosition -= 12;
      page1.drawText('FAMILY/MARITAL COUNSELING', { x: 60, y: yPosition, size: 9, font: helveticaBold });

      yPosition -= 18;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page1.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (spouseSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(spouseSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      if (formData.spouseDate) {
        page1.drawText(formData.spouseDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      }

      yPosition -= 50;

      // Parent/Guardian Signature
      page1.drawText('SIGNATURE OF PARENT OR', { x: 60, y: yPosition, size: 9, font: helveticaBold });
      yPosition -= 12;
      page1.drawText('GUARDIAN IF CLIENT IS A MINOR', { x: 60, y: yPosition, size: 9, font: helveticaBold });

      yPosition -= 18;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page1.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (parentGuardianSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(parentGuardianSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      if (formData.parentGuardianDate) {
        page1.drawText(formData.parentGuardianDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      }

      yPosition -= 50;


      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page1.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      // PAGE 2 - HIPAA Notice
      yPosition = height - 60;

      page2.drawText('Notice of Privacy Practices—HIPAA Compliance', {
        x: 120,
        y: yPosition,
        size: 12,
        font: helveticaBold,
      });

      yPosition -= 40;

      const hipaaText = [
        '—This notice describes how your health information may be used and disclosed and how you can access this information. Please review it carefully. You have a right to feel knowledgeable about how I may use medical information about you and to know what your rights are concerning maintaining your privacy, to give you this notice, and to follow the terms of this notice.',
        '—The law permits me to use or disclose your health information as involved in your treatment.',
        '—I may use or disclose your health information for payment of your services. For example, I may send a report of your progress to the insurance company.',
        '—I may use or disclose your health information for normal healthcare operations.',
        '—I may share health care information with business associates, such as a billing service and/or a website/software developer (Paul Mojica Tech). Any business/billing service must agree to protect your privacy under HIPAA.',
        '—I may use your information to contact you. For example, I may call to remind you of your appointments. If you do not answer the phone, I may leave a message for you.',
        '—In an emergency, I may disclose your health information to a family member or another person responsible for your care.',
        '—I may release some or all of your health information when required by law.',
        '—You may request in writing that I not use or disclose your health information as described above. I will let you know if we can fulfill your request.',
        '—You have the right to inspect and receive a copy of your health information, with a few exceptions. A written request regarding the information you want to see is required.',
        '—You have the right to request an amendment or change to your health information. Please provide your request in writing.'
      ];

      for (const text of hipaaText) {
        yPosition = drawWrappedText(page2, text, 60, yPosition, width - 120, 10, helvetica);
        yPosition -= 12;
      }

      yPosition -= 20;

      page2.drawText('Acknowledgment', {
        x: 60,
        y: yPosition,
        size: 10,
        font: helveticaBold,
      });

      yPosition -= 16;
      yPosition = drawWrappedText(page2, "I have received a copy of Kirstin R. Abraham, LCSW's notice of privacy practices.", 60, yPosition, width - 120, 10, helvetica);

      yPosition -= 30;

      // HIPAA Signature
      page2.drawText('SIGNED', { x: 60, y: yPosition, size: 9, font: helveticaBold });
      page2.drawText('DATE', { x: 450, y: yPosition, size: 9, font: helveticaBold });

      yPosition -= 5;
      page2.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page2.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (hipaaSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(hipaaSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page2.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      page2.drawText(formData.hipaaDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 40;

      // Print Name
      page2.drawText('PRINT NAME', { x: 60, y: yPosition, size: 9, font: helveticaBold });
      yPosition -= 5;
      page2.drawLine({ start: { x: 60, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });
      page2.drawText(formData.printName, { x: 60, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 40;

      // Patient Name
      page2.drawText('If signing as parent or guardian, please note the name of the patient', {
        x: 60,
        y: yPosition,
        size: 9,
        font: helvetica,
      });
      yPosition -= 5;
      page2.drawLine({ start: { x: 60, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });
      if (formData.patientName) {
        page2.drawText(formData.patientName, { x: 60, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      }

      // Save the PDF
      const pdfBytes = await pdfDoc.save();

      // Send the PDF via email
      const emailService = new EmailService();
      await emailService.sendSignedForm(
        formData.printName || 'Client',
        pdfBytes,
        'Consent Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
        clientSignature: '',
        clientDate: new Date().toISOString().split('T')[0],
        spouseSignature: '',
        spouseDate: '',
        parentGuardianSignature: '',
        parentGuardianDate: '',
        hipaaSignature: '',
        hipaaDate: new Date().toISOString().split('T')[0],
        printName: '',
        patientName: '',
      });
        clientSignatureRef.current?.clear();
        spouseSignatureRef.current?.clear();
        parentGuardianSignatureRef.current?.clear();
        hipaaSignatureRef.current?.clear();
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
          <h1>AGREEMENT & CONSENT FOR TREATMENT</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/consentToTxAndHippa.pdf" target="_blank" rel="noopener noreferrer">
                View Full PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Page 1 Content */}
            <div className={styles.consentText}>
              <p>
                I understand that, consistent with the HIPAA requirements, consent to treatment and consent to
                release will expire after twelve months and I may revoke such consent at will, although
                revocation is not retroactive.
              </p>
              <p>
                I have been informed of and read the preceding information and agree to it. I authorize treatment
                of the person named below and agree to pay all fees for services rendered by my therapist.
              </p>
              <p>
                If you have any questions or would like additional information, please feel free to ask.
              </p>
              <p className={styles.attestation}>
                <strong>
                  ATTESTING THAT I UNDERSTAND THE ABOVE AND AGREE TO THERAPY UNDER THE ABOVE LIST
                  OF DISCLOSURES I HAVE SIGNED BELOW:
                </strong>
              </p>
            </div>

            {/* Client Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <label>CLIENT SIGNATURE *</label>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={clientSignatureRef}
                      clearOnResize={false}
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
                    onClick={() => clearSignature(clientSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="clientDate">DATE *</label>
                  <input
                    type="date"
                    id="clientDate"
                    name="clientDate"
                    value={formData.clientDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Spouse Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLabel}>
                <p>SIGNATURE OF SPOUSE IF<br/>FAMILY/MARITAL<br/>COUNSELING</p>
              </div>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={spouseSignatureRef}
                      clearOnResize={false}
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
                    onClick={() => clearSignature(spouseSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="spouseDate">DATE</label>
                  <input
                    type="date"
                    id="spouseDate"
                    name="spouseDate"
                    value={formData.spouseDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLabel}>
                <p>SIGNATURE OF PARENT OR<br/>GUARDIAN IF CLIENT IS A<br/>MINOR</p>
              </div>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={parentGuardianSignatureRef}
                      clearOnResize={false}
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
                    onClick={() => clearSignature(parentGuardianSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="parentGuardianDate">DATE</label>
                  <input
                    type="date"
                    id="parentGuardianDate"
                    name="parentGuardianDate"
                    value={formData.parentGuardianDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <hr className={styles.pageDivider} />

            {/* Page 2 - HIPAA Notice */}
            <h2>Notice of Privacy Practices—HIPAA Compliance</h2>

            <div className={styles.consentText}>
              <p>
                —This notice describes how your health information may be used and disclosed and how you
                can access this information. Please review it carefully. You have a right to feel knowledgeable
                about how I may use medical information about you and to know what your rights are concerning
                maintaining your privacy, to give you this notice, and to follow the terms of this notice.
              </p>
              <p>
                —The law permits me to use or disclose your health information as involved in your treatment.
              </p>
              <p>
                —I may use or disclose your health information for payment of your services. For example, I may
                send a report of your progress to the insurance company.
              </p>
              <p>
                —I may use or disclose your health information for normal healthcare operations.
              </p>
              <p>
                —I may share health care information with business associates, such as a billing service and/or
                a website/software developer (Paul Mojica Tech). Any business/billing service must agree to
                protect your privacy under HIPAA.
              </p>
              <p>
                —I may use your information to contact you. For example, I may call to remind you of your
                appointments. If you do not answer the phone, I may leave a message for you. If you prefer to use a
                machine or with the person who answers the telephone:
              </p>
              <p>
                —In an emergency, I may disclose your health information to a family member or another
                person responsible for your care.
              </p>
              <p>
                —I may release some or all of your health information when required by law.
              </p>
              <p>
                —I may disclose some or all of your health information if there is a threat to use health information
                without your prior written authorization.
              </p>
              <p>
                —You may request in writing that I not use or disclose your health information as described
                above. I will let you know if we can fulfill your request.
              </p>
              <p>
                —You have the right to know of any use or disclosure made with your health information
                beyond the above normal uses. As I will need to contact you from time to time, I will use
                whatever address or telephone number you prefer. You have the right to request that I only mail
                information to a specific address or that I call only a specific telephone number.
              </p>
              <p>
                —You have the right to inspect and receive a copy of your health information, with a few
                exceptions. A written request regarding the information you want to see is required. If you also
                want a copy of your records, you may be charged you a reasonable fee for the copies.
              </p>
              <p>
                —You have the right to request an amendment or change to your health information. Please
                provide your request to make changes to your health information in writing. If I agree to make the
                changes you request or notify you in writing that I cannot make your changes and tell you why. I may
                deny any of the details of this notice are changed, you will be notified in writing.
              </p>
              <p className={styles.acknowledgment}>
                <strong>Acknowledgment</strong><br/>
                I have received a copy of Kirstin R. Abraham, LCSW&apos;s notice of privacy practices.
              </p>
            </div>

            {/* HIPAA Signature Section */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <label>SIGNED *</label>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={hipaaSignatureRef}
                      clearOnResize={false}
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
                    onClick={() => clearSignature(hipaaSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="hipaaDate">DATE *</label>
                  <input
                    type="date"
                    id="hipaaDate"
                    name="hipaaDate"
                    value={formData.hipaaDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="printName">PRINT NAME *</label>
              <input
                type="text"
                id="printName"
                name="printName"
                value={formData.printName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientName">If signing as parent or guardian, please note the name of the patient</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.submitSection}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinnerContainer}>
                    <span className={styles.spinner}></span>
                    Submitting...
                  </span>
                ) : (
                  'Submit Consent Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood
                the Consent to Treatment and HIPAA Authorization form, and you agree to its terms.
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

export default ConsentForm;
