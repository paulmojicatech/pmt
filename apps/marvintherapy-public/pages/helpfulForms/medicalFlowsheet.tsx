import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface MedicationEntry {
  medication: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  reason: string;
  sideEffects: string;
}

interface FormData {
  patientName: string;
  dateOfBirth: string;
  recordDate: string;
  medications: MedicationEntry[];
  signature: string;
}

export const MedicalFlowsheetForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    dateOfBirth: '',
    recordDate: new Date().toISOString().split('T')[0],
    medications: [
      {
        medication: '',
        dosage: '',
        frequency: '',
        prescribedBy: '',
        startDate: '',
        endDate: '',
        reason: '',
        sideEffects: '',
      },
    ],
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

  const handleMedicationChange = (index: number, field: keyof MedicationEntry, value: string) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index][field] = value;
    setFormData((prev) => ({ ...prev, medications: updatedMedications }));
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          medication: '',
          dosage: '',
          frequency: '',
          prescribedBy: '',
          startDate: '',
          endDate: '',
          reason: '',
          sideEffects: '',
        },
      ],
    }));
  };

  const removeMedication = (index: number) => {
    if (formData.medications.length > 1) {
      const updatedMedications = formData.medications.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, medications: updatedMedications }));
    }
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

    if (!formData.patientName || !formData.dateOfBirth) {
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
      currentPage.drawText('Medication Flowsheet', {
        x: width / 2 - 90,
        y: yPos,
        size: 16,
        font: helveticaBold,
      });
      yPos -= 40;

      // Patient Information
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
      yPos -= 40;

      // Medications
      currentPage.drawText('Medication History', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 25;

      // Helper function for wrapped text
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

      for (let i = 0; i < formData.medications.length; i++) {
        const med = formData.medications[i];

        if (yPos < 250) {
          currentPage = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        currentPage.drawText(`Medication ${i + 1}`, {
          x: 60,
          y: yPos,
          size: 11,
          font: helveticaBold,
        });
        yPos -= 18;

        if (med.medication) {
          currentPage.drawText('Medication Name: ', { x: 70, y: yPos, size: 9, font: helvetica });
          yPos = drawWrappedText(med.medication, 170, yPos, width - 190, 9, helvetica, rgb(0, 0, 1));
          yPos -= 12;
        }

        if (med.dosage) {
          currentPage.drawText('Dosage: ', { x: 70, y: yPos, size: 9, font: helvetica });
          currentPage.drawText(med.dosage, { x: 120, y: yPos, size: 9, font: helvetica, color: rgb(0, 0, 1) });
          yPos -= 12;
        }

        if (med.frequency) {
          currentPage.drawText('Frequency: ', { x: 70, y: yPos, size: 9, font: helvetica });
          currentPage.drawText(med.frequency, { x: 140, y: yPos, size: 9, font: helvetica, color: rgb(0, 0, 1) });
          yPos -= 12;
        }

        if (med.prescribedBy) {
          currentPage.drawText('Prescribed By: ', { x: 70, y: yPos, size: 9, font: helvetica });
          currentPage.drawText(med.prescribedBy, { x: 160, y: yPos, size: 9, font: helvetica, color: rgb(0, 0, 1) });
          yPos -= 12;
        }

        if (med.startDate) {
          currentPage.drawText('Start Date: ', { x: 70, y: yPos, size: 9, font: helvetica });
          currentPage.drawText(med.startDate, { x: 140, y: yPos, size: 9, font: helvetica, color: rgb(0, 0, 1) });
          
          if (med.endDate) {
            currentPage.drawText('End Date: ', { x: 250, y: yPos, size: 9, font: helvetica });
            currentPage.drawText(med.endDate, { x: 310, y: yPos, size: 9, font: helvetica, color: rgb(0, 0, 1) });
          }
          yPos -= 12;
        }

        if (med.reason) {
          currentPage.drawText('Reason: ', { x: 70, y: yPos, size: 9, font: helvetica });
          yPos = drawWrappedText(med.reason, 120, yPos, width - 140, 9, helvetica, rgb(0, 0, 1));
          yPos -= 12;
        }

        if (med.sideEffects) {
          currentPage.drawText('Side Effects: ', { x: 70, y: yPos, size: 9, font: helvetica });
          yPos = drawWrappedText(med.sideEffects, 145, yPos, width - 165, 9, helvetica, rgb(0, 0, 1));
          yPos -= 12;
        }

        yPos -= 15;
      }

      // Signature section
      if (yPos < 150) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 20;
      currentPage.drawText('Patient/Guardian Signature', {
        x: 60,
        y: yPos,
        size: 11,
        font: helveticaBold,
      });
      yPos -= 20;

      const disclaimer = 'I certify that the above medication information is accurate and complete to the best of my knowledge. I understand that it is important to keep this information current and to notify my healthcare provider of any changes.';
      const words = disclaimer.split(' ');
      let line = '';
      let currentY = yPos;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = helvetica.widthOfTextAtSize(testLine, 9);

        if (testWidth > width - 120 && i > 0) {
          currentPage.drawText(line, { x: 60, y: currentY, size: 9, font: helvetica });
          line = words[i] + ' ';
          currentY -= 13;
        } else {
          line = testLine;
        }
      }
      currentPage.drawText(line, { x: 60, y: currentY, size: 9, font: helvetica });
      yPos = currentY - 30;

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
        formData.patientName,
        pdfBytes,
        'Medication Flowsheet Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          patientName: '',
          dateOfBirth: '',
          recordDate: new Date().toISOString().split('T')[0],
          medications: [
            {
              medication: '',
              dosage: '',
              frequency: '',
              prescribedBy: '',
              startDate: '',
              endDate: '',
              reason: '',
              sideEffects: '',
            },
          ],
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
          <h1>Medication Flowsheet</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/MedicationFlowsheet_Word.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p>
                This medication flowsheet is used to track all medications you are currently taking or have taken 
                recently. Please provide complete and accurate information about each medication, including 
                prescription medications, over-the-counter drugs, vitamins, and supplements.
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

            <h2>Medication History</h2>

            {formData.medications.map((med, index) => (
              <div key={index} className={styles.medicationEntry}>
                <div className={styles.medicationHeader}>
                  <h3>Medication {index + 1}</h3>
                  {formData.medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`medication-${index}`}>Medication Name</label>
                  <input
                    type="text"
                    id={`medication-${index}`}
                    value={med.medication}
                    onChange={(e) => handleMedicationChange(index, 'medication', e.target.value)}
                    placeholder="Enter medication name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`dosage-${index}`}>Dosage</label>
                  <input
                    type="text"
                    id={`dosage-${index}`}
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    placeholder="e.g., 10mg, 1 tablet"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`frequency-${index}`}>Frequency</label>
                  <input
                    type="text"
                    id={`frequency-${index}`}
                    value={med.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    placeholder="e.g., once daily, twice daily"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`prescribedBy-${index}`}>Prescribed By</label>
                  <input
                    type="text"
                    id={`prescribedBy-${index}`}
                    value={med.prescribedBy}
                    onChange={(e) => handleMedicationChange(index, 'prescribedBy', e.target.value)}
                    placeholder="Doctor's name"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor={`startDate-${index}`}>Start Date</label>
                    <input
                      type="date"
                      id={`startDate-${index}`}
                      value={med.startDate}
                      onChange={(e) => handleMedicationChange(index, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`endDate-${index}`}>End Date (if applicable)</label>
                    <input
                      type="date"
                      id={`endDate-${index}`}
                      value={med.endDate}
                      onChange={(e) => handleMedicationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`reason-${index}`}>Reason for Taking</label>
                  <textarea
                    id={`reason-${index}`}
                    value={med.reason}
                    onChange={(e) => handleMedicationChange(index, 'reason', e.target.value)}
                    placeholder="What condition is this medication treating?"
                    rows={2}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`sideEffects-${index}`}>Side Effects Experienced</label>
                  <textarea
                    id={`sideEffects-${index}`}
                    value={med.sideEffects}
                    onChange={(e) => handleMedicationChange(index, 'sideEffects', e.target.value)}
                    placeholder="Any side effects you've noticed"
                    rows={2}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMedication}
              className={styles.addButton}
            >
              + Add Another Medication
            </button>

            <div className={styles.signatureBlock}>
              <h3>Patient/Guardian Signature *</h3>
              <p className={styles.signatureDisclaimer}>
                I certify that the above medication information is accurate and complete to the best of my 
                knowledge. I understand that it is important to keep this information current and to notify 
                my healthcare provider of any changes.
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
                  'Submit Medication Flowsheet'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you certify that the medication information provided is accurate and 
                complete to the best of your knowledge.
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

export default MedicalFlowsheetForm;
