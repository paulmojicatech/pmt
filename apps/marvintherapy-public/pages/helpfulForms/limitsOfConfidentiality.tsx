import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  signature: string;
  date: string;
  printName: string;
}

export const LimitsOfConfidentiality = () => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const cancellationSignatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    signature: '',
    date: new Date().toISOString().split('T')[0],
    printName: '',
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

    if (signatureRef.current?.isEmpty() || cancellationSignatureRef.current?.isEmpty()) {
      showToast('Please provide all required signatures before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get signature data URLs
      const signatureDataUrl = signatureRef.current?.toDataURL('image/png');
      const cancellationSignatureDataUrl = cancellationSignatureRef.current?.toDataURL('image/png');

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Embed fonts
      const helvetica = await pdfDoc.embedFont('Helvetica');
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

      // Helper function to wrap text
      const drawWrappedText = (
        page: any,
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize: number,
        font: any
      ) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (const word of words) {
          const testLine = line + word + ' ';
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && line !== '') {
            page.drawText(line.trim(), { x, y: currentY, size: fontSize, font });
            line = word + ' ';
            currentY -= fontSize + 4;
          } else {
            line = testLine;
          }
        }

        if (line.trim() !== '') {
          page.drawText(line.trim(), { x, y: currentY, size: fontSize, font });
          currentY -= fontSize + 4;
        }

        return currentY;
      };

      // Page 1: Limits of Confidentiality
      const page1 = pdfDoc.addPage([612, 792]);
      const { width, height } = page1.getSize();
      let yPosition = height - 80;

      // Title
      page1.drawText('LIMITS OF CONFIDENTIALITY', {
        x: 190,
        y: yPosition,
        size: 14,
        font: helveticaBold,
      });

      yPosition -= 40;

      // Introduction paragraph
      const introText = "Contents of all therapy sessions are considered to be confidential. Both verbal information and written records about a client cannot be shared with another party without the written consent of the client or the client's legal guardian. Noted exceptions are as follows:";
      yPosition = drawWrappedText(page1, introText, 60, yPosition, width - 120, 10, helvetica);

      yPosition -= 20;

      // Sections
      const sections = [
        {
          title: 'Duty to Warn and Protect',
          text: 'When a client discloses intentions or a plan to harm another person, the mental health professional is required to warn the intended victim and report this information to legal authorities. In cases in which the client discloses or implies a plan for suicide, the health care professional is required to notify legal authorities and make reasonable attempts to notify the family of the client.',
        },
        {
          title: 'Abuse of Children and Vulnerable Adults',
          text: 'If a client states or suggests that he or she is abusing a child (or vulnerable adult) or has recently abused a child (or vulnerable adult), or a child (or vulnerable adult) is in danger of abuse, the mental health professional is required to report this information to the appropriate social service and/or legal authorities.',
        },
        {
          title: 'Prenatal Exposure to Controlled Substances',
          text: 'Mental Health care professionals are required to report admitted prenatal exposure to controlled substances that are potentially harmful.',
        },
        {
          title: 'Minors/Guardianship',
          text: "Parents or legal guardians of non-emancipated minor clients have the right to access the clients' records.",
        },
        {
          title: 'Insurance Providers (when applicable)',
          text: 'Insurance companies and other third-party payers are given information that they request regarding services to clients.',
        },
      ];

      for (const section of sections) {
        page1.drawText(section.title, {
          x: 60,
          y: yPosition,
          size: 10,
          font: helveticaBold,
        });
        yPosition -= 14;
        yPosition = drawWrappedText(page1, section.text, 60, yPosition, width - 120, 10, helvetica);
        yPosition -= 16;
      }

      // Insurance information paragraph
      const insuranceText = "Information that may be requested includes, but is not limited to: types of service, dates/times of service, diagnosis, treatment plan, description of impairment, progress of therapy, case notes, and summaries.";
      yPosition = drawWrappedText(page1, insuranceText, 60, yPosition, width - 120, 10, helvetica);

      yPosition -= 20;

      // Agreement statement
      const agreementText = "I agree to the above limits of confidentiality and understand their meanings and ramifications.";
      yPosition = drawWrappedText(page1, agreementText, 60, yPosition, width - 120, 10, helvetica);

      yPosition -= 30;

      // Signature section
      page1.drawText('Client Signature (Client\'s Parent/Guardian if under 18)', {
        x: 60,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 5;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (signatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page1.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      yPosition -= 30;

      // Date section
      page1.drawText("Today's Date", {
        x: 60,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 5;
      page1.drawLine({ start: { x: 60, y: yPosition }, end: { x: 280, y: yPosition }, thickness: 1 });
      page1.drawText(formData.date, { x: 60, y: yPosition - 15, size: 10, font: helvetica });

      // Page 2: Cancellation Policy
      const page2 = pdfDoc.addPage([612, 792]);
      yPosition = height - 80;

      // Title
      page2.drawText('CANCELLATION POLICY', {
        x: 210,
        y: yPosition,
        size: 14,
        font: helveticaBold,
      });

      yPosition -= 40;

      // Policy text
      const policyTexts = [
        "If you fail to cancel a scheduled appointment, we cannot use this time for another client and you will be billed for the missed appointment.",
        "A full session fee is charged for missed appointments or cancellations with less than a 24-hour notice unless it is due to illness or an emergency. A bill will be mailed directly to all clients who do not show up for, or cancel an appointment.",
        "Thank you for your consideration regarding this important matter.",
      ];

      for (const text of policyTexts) {
        yPosition = drawWrappedText(page2, text, 60, yPosition, width - 120, 10, helvetica);
        yPosition -= 20;
      }

      yPosition -= 20;

      // Signature section
      page2.drawText('Client Signature (Client\'s Parent/Guardian if under 18)', {
        x: 60,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 5;
      page2.drawLine({ start: { x: 60, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (cancellationSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(cancellationSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page2.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      yPosition -= 30;

      // Date section
      page2.drawText("Today's Date", {
        x: 60,
        y: yPosition,
        size: 9,
        font: helvetica,
      });

      yPosition -= 5;
      page2.drawLine({ start: { x: 60, y: yPosition }, end: { x: 280, y: yPosition }, thickness: 1 });
      page2.drawText(formData.date, { x: 60, y: yPosition - 15, size: 10, font: helvetica });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();

      // Send the PDF via email
      const emailService = new EmailService();
      await emailService.sendSignedForm(
        formData.printName || 'Client',
        pdfBytes,
        'Limits of Confidentiality & Cancellation Policy'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
          signature: '',
          date: new Date().toISOString().split('T')[0],
          printName: '',
        });
        signatureRef.current?.clear();
        cancellationSignatureRef.current?.clear();
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
          <h1>LIMITS OF CONFIDENTIALITY & CANCELLATION POLICY</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/ConfidentialityAndCancellationPolicy.pdf" target="_blank" rel="noopener noreferrer">
                View Full PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="printName">Print Name *</label>
              <input
                type="text"
                id="printName"
                name="printName"
                value={formData.printName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Page 1: Limits of Confidentiality */}
            <h2>LIMITS OF CONFIDENTIALITY</h2>

            <div className={styles.formGroup}>
              <p>
                Contents of all therapy sessions are considered to be confidential. Both verbal information and written records about a client cannot be shared with another party without the written consent of the client or the client&#39;s legal guardian. Noted exceptions are as follows:
              </p>
            </div>

            <div className={styles.formGroup}>
              <h3>Duty to Warn and Protect</h3>
              <p>
                When a client discloses intentions or a plan to harm another person, the mental health professional is required to warn the intended victim and report this information to legal authorities. In cases in which the client discloses or implies a plan for suicide, the health care professional is required to notify legal authorities and make reasonable attempts to notify the family of the client.
              </p>
            </div>

            <div className={styles.formGroup}>
              <h3>Abuse of Children and Vulnerable Adults</h3>
              <p>
                If a client states or suggests that he or she is abusing a child (or vulnerable adult) or has recently abused a child (or vulnerable adult), or a child (or vulnerable adult) is in danger of abuse, the mental health professional is required to report this information to the appropriate social service and/or legal authorities.
              </p>
            </div>

            <div className={styles.formGroup}>
              <h3>Prenatal Exposure to Controlled Substances</h3>
              <p>
                Mental Health care professionals are required to report admitted prenatal exposure to controlled substances that are potentially harmful.
              </p>
            </div>

            <div className={styles.formGroup}>
              <h3>Minors/Guardianship</h3>
              <p>
                Parents or legal guardians of non-emancipated minor clients have the right to access the clients&#39; records.
              </p>
            </div>

            <div className={styles.formGroup}>
              <h3>Insurance Providers (when applicable)</h3>
              <p>
                Insurance companies and other third-party payers are given information that they request regarding services to clients.
              </p>
              <p>
                Information that may be requested includes, but is not limited to: types of service, dates/times of service, diagnosis, treatment plan, description of impairment, progress of therapy, case notes, and summaries.
              </p>
            </div>

            <div className={styles.formGroup}>
              <p>
                <em>I agree to the above limits of confidentiality and understand their meanings and ramifications.</em>
              </p>
            </div>

            <div className={styles.signatureGroup}>
              <label>Client Signature (Client&#39;s Parent/Guardian if under 18) *</label>
              <div className={styles.signatureCanvas}>
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: styles.sigCanvas,
                  }}
                  penColor="black"
                  minWidth={4}
                  maxWidth={5}
                />
              </div>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => clearSignature(signatureRef)}
              >
                Clear Signature
              </button>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Today&#39;s Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Page 2: Cancellation Policy */}
            <h2>CANCELLATION POLICY</h2>

            <div className={styles.formGroup}>
              <p>
                If you fail to cancel a scheduled appointment, we cannot use this time for another client and you will be billed for the missed appointment.
              </p>
              <p>
                A full session fee is charged for missed appointments or cancellations with less than a 24-hour notice unless it is due to illness or an emergency. A bill will be mailed directly to all clients who do not show up for, or cancel an appointment.
              </p>
              <p>
                Thank you for your consideration regarding this important matter.
              </p>
            </div>

            <div className={styles.signatureGroup}>
              <label>Client Signature (Client&#39;s Parent/Guardian if under 18) *</label>
              <div className={styles.signatureCanvas}>
                <SignatureCanvas
                  ref={cancellationSignatureRef}
                  canvasProps={{
                    className: styles.sigCanvas,
                  }}
                  penColor="black"
                  minWidth={4}
                  maxWidth={5}
                />
              </div>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => clearSignature(cancellationSignatureRef)}
              >
                Clear Signature
              </button>
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
                  'Submit Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood
                the Limits of Confidentiality and Cancellation Policy, and you agree to its terms.
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

export default LimitsOfConfidentiality;
