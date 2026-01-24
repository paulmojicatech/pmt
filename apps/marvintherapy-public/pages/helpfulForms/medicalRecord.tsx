import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  patientName: string;
  dateOfBirth: string;
  recordDate: string;
  primaryDiagnosis: string;
  secondaryDiagnoses: string;
  currentMedications: string;
  allergies: string;
  treatmentPlan: string;
  progressNotes: string;
  functionalStatus: string;
  mentalStatusExam: string;
  riskAssessment: string;
  followUpPlan: string;
  providerName: string;
  signature: string;
}

export const MedicalRecordSummaryForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    dateOfBirth: '',
    recordDate: new Date().toISOString().split('T')[0],
    primaryDiagnosis: '',
    secondaryDiagnoses: '',
    currentMedications: '',
    allergies: '',
    treatmentPlan: '',
    progressNotes: '',
    functionalStatus: '',
    mentalStatusExam: '',
    riskAssessment: '',
    followUpPlan: '',
    providerName: '',
    signature: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!formData.patientName || !formData.dateOfBirth || !formData.providerName) {
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
      currentPage.drawText('Medical Record Summary', {
        x: width / 2 - 100,
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

      // Patient Information Section
      currentPage.drawText('Patient Information', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      currentPage.drawText('Patient Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.patientName, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 20;

      currentPage.drawText('Date of Birth: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.dateOfBirth, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 20;

      currentPage.drawText('Record Date: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.recordDate, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 35;

      // Clinical Information Sections
      const sections = [
        { label: 'Primary Diagnosis', value: formData.primaryDiagnosis },
        { label: 'Secondary Diagnoses', value: formData.secondaryDiagnoses },
        { label: 'Current Medications', value: formData.currentMedications },
        { label: 'Allergies', value: formData.allergies },
        { label: 'Treatment Plan', value: formData.treatmentPlan },
        { label: 'Progress Notes', value: formData.progressNotes },
        { label: 'Functional Status', value: formData.functionalStatus },
        { label: 'Mental Status Exam', value: formData.mentalStatusExam },
        { label: 'Risk Assessment', value: formData.riskAssessment },
        { label: 'Follow-Up Plan', value: formData.followUpPlan },
      ];

      for (const section of sections) {
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

      // Provider Information
      if (yPos < 180) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 10;
      currentPage.drawText('Provider Information', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      currentPage.drawText('Provider Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.providerName, { x: 160, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 35;

      // Signature
      currentPage.drawText('Provider Signature', { x: 60, y: yPos, size: 10, font: helvetica });
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
        formData.patientName,
        pdfBytes,
        'Medical Record Summary Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          patientName: '',
          dateOfBirth: '',
          recordDate: new Date().toISOString().split('T')[0],
          primaryDiagnosis: '',
          secondaryDiagnoses: '',
          currentMedications: '',
          allergies: '',
          treatmentPlan: '',
          progressNotes: '',
          functionalStatus: '',
          mentalStatusExam: '',
          riskAssessment: '',
          followUpPlan: '',
          providerName: '',
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
          <h1>Medical Record Summary</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/MedicalRecordSummary.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p>
                This medical record summary provides a comprehensive overview of the patient&#39;s mental health 
                treatment, including diagnoses, medications, treatment plan, and progress. This document is 
                intended for professional use in coordinating care and maintaining accurate medical records.
              </p>
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
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="recordDate">Record Date *</label>
              <input
                type="date"
                id="recordDate"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <h2>Clinical Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="primaryDiagnosis">Primary Diagnosis</label>
              <textarea
                id="primaryDiagnosis"
                name="primaryDiagnosis"
                value={formData.primaryDiagnosis}
                onChange={handleInputChange}
                placeholder="Enter primary diagnosis with DSM-5 code if applicable"
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="secondaryDiagnoses">Secondary Diagnoses</label>
              <textarea
                id="secondaryDiagnoses"
                name="secondaryDiagnoses"
                value={formData.secondaryDiagnoses}
                onChange={handleInputChange}
                placeholder="Enter any secondary diagnoses"
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
              <label htmlFor="allergies">Allergies</label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="List any known allergies"
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="treatmentPlan">Treatment Plan</label>
              <textarea
                id="treatmentPlan"
                name="treatmentPlan"
                value={formData.treatmentPlan}
                onChange={handleInputChange}
                placeholder="Describe the current treatment plan and goals"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="progressNotes">Progress Notes</label>
              <textarea
                id="progressNotes"
                name="progressNotes"
                value={formData.progressNotes}
                onChange={handleInputChange}
                placeholder="Document patient progress and treatment response"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="functionalStatus">Functional Status</label>
              <textarea
                id="functionalStatus"
                name="functionalStatus"
                value={formData.functionalStatus}
                onChange={handleInputChange}
                placeholder="Describe patient's current functional level and daily activities"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mentalStatusExam">Mental Status Exam</label>
              <textarea
                id="mentalStatusExam"
                name="mentalStatusExam"
                value={formData.mentalStatusExam}
                onChange={handleInputChange}
                placeholder="Document mental status examination findings"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="riskAssessment">Risk Assessment</label>
              <textarea
                id="riskAssessment"
                name="riskAssessment"
                value={formData.riskAssessment}
                onChange={handleInputChange}
                placeholder="Assess risk factors including suicidal ideation, self-harm, violence"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="followUpPlan">Follow-Up Plan</label>
              <textarea
                id="followUpPlan"
                name="followUpPlan"
                value={formData.followUpPlan}
                onChange={handleInputChange}
                placeholder="Outline follow-up appointments and recommendations"
                rows={3}
              />
            </div>

            <h2>Provider Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="providerName">Provider Name *</label>
              <input
                type="text"
                id="providerName"
                name="providerName"
                value={formData.providerName}
                onChange={handleInputChange}
                required
                placeholder="Enter provider's full name"
              />
            </div>

            <div className={styles.signatureBlock}>
              <h3>Provider Signature *</h3>
              <div className={styles.signatureField}>
                <label>Please sign below</label>
                <div className={styles.signatureContainer}>
                  <SignatureCanvas
                    ref={signatureRef}
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
                  'Submit Medical Record Summary'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, the provider certifies that this medical record summary is accurate 
                and complete based on the information available at the time of documentation.
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

export default MedicalRecordSummaryForm;
