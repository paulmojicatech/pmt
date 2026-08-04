import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  // Referring Provider Information
  referringProviderName: string;
  providerPractice: string;
  providerPhone: string;
  providerEmail: string;
  providerFax: string;
  
  // Patient Information
  patientName: string;
  patientDOB: string;
  patientPhone: string;
  patientEmail: string;
  patientAddress: string;
  
  // Referral Information
  referralDate: string;
  reasonForReferral: string;
  clinicalHistory: string;
  currentDiagnoses: string;
  currentMedications: string;
  previousTreatments: string;
  urgencyLevel: string;
  specialConsiderations: string;
  requestedServices: string;
  
  signature: string;
}

export const ReferralForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    referringProviderName: '',
    providerPractice: '',
    providerPhone: '',
    providerEmail: '',
    providerFax: '',
    patientName: '',
    patientDOB: '',
    patientPhone: '',
    patientEmail: '',
    patientAddress: '',
    referralDate: new Date().toISOString().split('T')[0],
    reasonForReferral: '',
    clinicalHistory: '',
    currentDiagnoses: '',
    currentMedications: '',
    previousTreatments: '',
    urgencyLevel: 'routine',
    specialConsiderations: '',
    requestedServices: '',
    signature: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signatureRef.current?.isEmpty()) {
      showToast('Please provide your signature before submitting.', 'error');
      return;
    }

    if (!formData.referringProviderName || !formData.patientName || !formData.patientDOB) {
      showToast('Please provide all required information.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const signatureDataUrl = signatureRef.current?.toDataURL();

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const helvetica = await pdfDoc.embedFont('Helvetica');
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

      let currentPage = pdfDoc.addPage([612, 792]);
      const { width, height } = currentPage.getSize();
      let yPos = height - 50;

      // Title
      currentPage.drawText('Provider Referral Form', {
        x: width / 2 - 90,
        y: yPos,
        size: 16,
        font: helveticaBold,
      });
      yPos -= 40;

      // Helper function to draw wrapped text
      const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, font: any, color?: any) => {
        if (!text) return y;
        
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && i > 0) {
            const drawOptions: any = { x, y: currentY, size: fontSize, font };
            if (color) drawOptions.color = color;
            currentPage.drawText(line, drawOptions);
            line = words[i] + ' ';
            currentY -= fontSize + 4;

            if (currentY < 100) {
              currentPage = pdfDoc.addPage([612, 792]);
              currentY = height - 50;
            }
          } else {
            line = testLine;
          }
        }
        const drawOptions: any = { x, y: currentY, size: fontSize, font };
        if (color) drawOptions.color = color;
        currentPage.drawText(line, drawOptions);
        return currentY - fontSize - 4;
      };

      // Referring Provider Information
      currentPage.drawText('Referring Provider Information', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      currentPage.drawText('Provider Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.referringProviderName, { x: 160, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 15;

      if (formData.providerPractice) {
        currentPage.drawText('Practice/Facility: ', { x: 60, y: yPos, size: 10, font: helvetica });
        yPos = drawWrappedText(formData.providerPractice, 160, yPos, width - 180, 10, helvetica, rgb(0, 0, 1));
        yPos -= 10;
      }

      if (formData.providerPhone) {
        currentPage.drawText('Phone: ', { x: 60, y: yPos, size: 10, font: helvetica });
        currentPage.drawText(formData.providerPhone, { x: 110, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
        yPos -= 15;
      }

      if (formData.providerEmail) {
        currentPage.drawText('Email: ', { x: 60, y: yPos, size: 10, font: helvetica });
        currentPage.drawText(formData.providerEmail, { x: 110, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
        yPos -= 15;
      }

      if (formData.providerFax) {
        currentPage.drawText('Fax: ', { x: 60, y: yPos, size: 10, font: helvetica });
        currentPage.drawText(formData.providerFax, { x: 110, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
        yPos -= 15;
      }

      yPos -= 20;

      // Patient Information
      if (yPos < 200) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      currentPage.drawText('Patient Information', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      currentPage.drawText('Patient Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.patientName, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 15;

      currentPage.drawText('Date of Birth: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.patientDOB, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 15;

      if (formData.patientPhone) {
        currentPage.drawText('Phone: ', { x: 60, y: yPos, size: 10, font: helvetica });
        currentPage.drawText(formData.patientPhone, { x: 110, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
        yPos -= 15;
      }

      if (formData.patientEmail) {
        currentPage.drawText('Email: ', { x: 60, y: yPos, size: 10, font: helvetica });
        currentPage.drawText(formData.patientEmail, { x: 110, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
        yPos -= 15;
      }

      if (formData.patientAddress) {
        currentPage.drawText('Address: ', { x: 60, y: yPos, size: 10, font: helvetica });
        yPos = drawWrappedText(formData.patientAddress, 120, yPos, width - 140, 10, helvetica, rgb(0, 0, 1));
        yPos -= 10;
      }

      yPos -= 20;

      // Referral Information
      if (yPos < 250) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      currentPage.drawText('Referral Information', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      currentPage.drawText('Referral Date: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.referralDate, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 15;

      currentPage.drawText('Urgency Level: ', { x: 60, y: yPos, size: 10, font: helvetica });
      const urgencyText = formData.urgencyLevel.charAt(0).toUpperCase() + formData.urgencyLevel.slice(1);
      currentPage.drawText(urgencyText, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 25;

      // Clinical sections
      const clinicalSections = [
        { label: 'Reason for Referral', value: formData.reasonForReferral },
        { label: 'Clinical History', value: formData.clinicalHistory },
        { label: 'Current Diagnoses', value: formData.currentDiagnoses },
        { label: 'Current Medications', value: formData.currentMedications },
        { label: 'Previous Treatments', value: formData.previousTreatments },
        { label: 'Requested Services', value: formData.requestedServices },
        { label: 'Special Considerations', value: formData.specialConsiderations },
      ];

      for (const section of clinicalSections) {
        if (yPos < 150) {
          currentPage = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        if (section.value) {
          currentPage.drawText(section.label, {
            x: 60,
            y: yPos,
            size: 11,
            font: helveticaBold,
          });
          yPos -= 18;

          yPos = drawWrappedText(section.value, 60, yPos, width - 120, 10, helvetica, rgb(0, 0, 1));
          yPos -= 20;
        }
      }

      // Signature section
      if (yPos < 150) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 10;
      currentPage.drawText('Referring Provider Signature', {
        x: 60,
        y: yPos,
        size: 11,
        font: helveticaBold,
      });
      yPos -= 20;

      const disclaimer = 'I certify that the information provided in this referral is accurate and complete to the best of my knowledge. I am referring this patient for mental health services and request that appropriate care be provided.';
      yPos = drawWrappedText(disclaimer, 60, yPos, width - 120, 9, helvetica);
      yPos -= 30;

      currentPage.drawText('Signature', { x: 60, y: yPos, size: 10, font: helvetica });
      yPos -= 15;
      currentPage.drawLine({ start: { x: 60, y: yPos }, end: { x: 400, y: yPos }, thickness: 1 });

      if (signatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        currentPage.drawImage(signatureImage, {
          x: 60,
          y: yPos - signatureDims.height + 20,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      // Save and send
      const pdfBytes = await pdfDoc.save();

      const emailService = new EmailService();
      await emailService.sendSignedForm(
        formData.referringProviderName,
        pdfBytes,
        'Provider Referral Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          referringProviderName: '',
          providerPractice: '',
          providerPhone: '',
          providerEmail: '',
          providerFax: '',
          patientName: '',
          patientDOB: '',
          patientPhone: '',
          patientEmail: '',
          patientAddress: '',
          referralDate: new Date().toISOString().split('T')[0],
          reasonForReferral: '',
          clinicalHistory: '',
          currentDiagnoses: '',
          currentMedications: '',
          previousTreatments: '',
          urgencyLevel: 'routine',
          specialConsiderations: '',
          requestedServices: '',
          signature: '',
        });
        signatureRef.current?.clear();
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
          <h1>Provider Referral Form</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/ReferralForm.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p>
                This referral form is used by healthcare providers to refer patients for mental health services. 
                Please provide complete and accurate information to ensure appropriate care coordination and treatment.
              </p>
            </div>

            <h2>Referring Provider Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="referringProviderName">Provider Name *</label>
              <input
                type="text"
                id="referringProviderName"
                name="referringProviderName"
                value={formData.referringProviderName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="providerPractice">Practice/Facility Name</label>
              <input
                type="text"
                id="providerPractice"
                name="providerPractice"
                value={formData.providerPractice}
                onChange={handleInputChange}
                placeholder="Enter practice or facility name"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="providerPhone">Phone</label>
                <input
                  type="tel"
                  id="providerPhone"
                  name="providerPhone"
                  value={formData.providerPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 555-5555"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="providerFax">Fax</label>
                <input
                  type="tel"
                  id="providerFax"
                  name="providerFax"
                  value={formData.providerFax}
                  onChange={handleInputChange}
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="providerEmail">Email</label>
              <input
                type="email"
                id="providerEmail"
                name="providerEmail"
                value={formData.providerEmail}
                onChange={handleInputChange}
                placeholder="provider@example.com"
              />
            </div>

            <h2>Patient Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="patientName">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                required
                placeholder="Enter patient's full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientDOB">Date of Birth *</label>
              <input
                type="date"
                id="patientDOB"
                name="patientDOB"
                value={formData.patientDOB}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="patientPhone">Phone</label>
                <input
                  type="tel"
                  id="patientPhone"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 555-5555"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="patientEmail">Email</label>
                <input
                  type="email"
                  id="patientEmail"
                  name="patientEmail"
                  value={formData.patientEmail}
                  onChange={handleInputChange}
                  placeholder="patient@example.com"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientAddress">Address</label>
              <input
                type="text"
                id="patientAddress"
                name="patientAddress"
                value={formData.patientAddress}
                onChange={handleInputChange}
                placeholder="Street address, city, state, zip"
              />
            </div>

            <h2>Referral Information</h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="referralDate">Referral Date *</label>
                <input
                  type="date"
                  id="referralDate"
                  name="referralDate"
                  value={formData.referralDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="urgencyLevel">Urgency Level *</label>
                <select
                  id="urgencyLevel"
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="routine">Routine</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergent">Emergent</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="reasonForReferral">Reason for Referral</label>
              <textarea
                id="reasonForReferral"
                name="reasonForReferral"
                value={formData.reasonForReferral}
                onChange={handleInputChange}
                placeholder="Describe the primary reason for this referral"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="clinicalHistory">Clinical History</label>
              <textarea
                id="clinicalHistory"
                name="clinicalHistory"
                value={formData.clinicalHistory}
                onChange={handleInputChange}
                placeholder="Relevant medical and mental health history"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="currentDiagnoses">Current Diagnoses</label>
              <textarea
                id="currentDiagnoses"
                name="currentDiagnoses"
                value={formData.currentDiagnoses}
                onChange={handleInputChange}
                placeholder="List current diagnoses with codes if available"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="currentMedications">Current Medications</label>
              <textarea
                id="currentMedications"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                placeholder="List all current medications with dosages"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="previousTreatments">Previous Treatments</label>
              <textarea
                id="previousTreatments"
                name="previousTreatments"
                value={formData.previousTreatments}
                onChange={handleInputChange}
                placeholder="Previous mental health treatments and their outcomes"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="requestedServices">Requested Services</label>
              <textarea
                id="requestedServices"
                name="requestedServices"
                value={formData.requestedServices}
                onChange={handleInputChange}
                placeholder="Specific services or treatment modalities requested"
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialConsiderations">Special Considerations</label>
              <textarea
                id="specialConsiderations"
                name="specialConsiderations"
                value={formData.specialConsiderations}
                onChange={handleInputChange}
                placeholder="Any special considerations or urgent concerns"
                rows={3}
              />
            </div>

            <div className={styles.signatureBlock}>
              <h3>Referring Provider Signature *</h3>
              <p className={styles.signatureDisclaimer}>
                I certify that the information provided in this referral is accurate and complete to the best 
                of my knowledge. I am referring this patient for mental health services and request that 
                appropriate care be provided.
              </p>
              <div className={styles.signatureField}>
                <label>Please sign below</label>
                <div className={styles.signatureContainer}>
                  <SignatureCanvas
                    ref={signatureRef}
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
                  onClick={clearSignature}
                  className={styles.clearButton}
                >
                  Clear Signature
                </button>
              </div>
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
                  'Submit Referral Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you certify that the information provided is accurate and that you 
                have the patient&apos;s authorization to make this referral.
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

export default ReferralForm;
