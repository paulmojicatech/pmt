import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  clientName: string;
  clientSignature: string;
  clientDate: string;
  witnessSignature: string;
  witnessDate: string;
  contactInfo: string;
}

export const NoHarmForm = () => {
  const clientSignatureRef = useRef<SignatureCanvas>(null);
  const witnessSignatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientSignature: '',
    clientDate: new Date().toISOString().split('T')[0],
    witnessSignature: '',
    witnessDate: new Date().toISOString().split('T')[0],
    contactInfo: '',
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

  const clearSignature = (ref: React.RefObject<SignatureCanvas>) => {
    ref.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clientSignatureRef.current?.isEmpty() || witnessSignatureRef.current?.isEmpty()) {
      showToast('Please provide all required signatures before submitting.', 'error');
      return;
    }

    if (!formData.clientName || !formData.contactInfo) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get all signatures as data URLs
      const clientSignatureDataUrl = clientSignatureRef.current?.toDataURL();
      const witnessSignatureDataUrl = witnessSignatureRef.current?.toDataURL();

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add page
      const page = pdfDoc.addPage([612, 792]); // Letter size

      const { width, height } = page.getSize();

      // Embed font
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');
      const helvetica = await pdfDoc.embedFont('Helvetica');

      let yPosition = height - 60;

      // Title
      page.drawText('No-Harm Contract', {
        x: width / 2 - 80,
        y: yPosition,
        size: 18,
        font: helveticaBold,
      });

      yPosition -= 30;

      page.drawText('by Kirstin R. Abraham, LCSW', {
        x: width / 2 - 80,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 50;

      // Client name at the top
      const beforeName = 'I, ';
      const afterName = ', hereby agree that I will not';
      
      // Draw the text before the name
      const beforeWidth = helveticaBold.widthOfTextAtSize(beforeName, 11);
      page.drawText(beforeName, {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });
      
      // Draw the name in blue
      const nameWidth = helveticaBold.widthOfTextAtSize(formData.clientName, 11);
      page.drawText(formData.clientName, {
        x: 60 + beforeWidth,
        y: yPosition,
        size: 11,
        font: helveticaBold,
        color: rgb(0, 0, 1),
      });
      
      // Draw the text after the name
      page.drawText(afterName, {
        x: 60 + beforeWidth + nameWidth,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });
      yPosition -= 16;
      page.drawText('harm myself in any way, attempt or commit suicide.', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });

      yPosition -= 30;

      page.drawText('Furthermore, I agree that I will take the following actions if I am ever', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('suicidal:', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 30;

      // Helper function to draw wrapped text
      const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, font: any) => {
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

      // Point 1
      page.drawText('1) I will remind myself that I can never, under any circumstances, harm', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('myself in any way, attempt or commit suicide.', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 30;

      // Point 2
      page.drawText('2) I will call 911 if I believe that I am in immediate danger of harming', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('myself.', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 30;

      // Point 3
      page.drawText('3) I will call any or all of the following numbers if I am not in immediate', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('danger of harming myself but have suicidal thoughts (please list names,', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('phone numbers, addresses, and any other relevant contact information', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('below):', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 25;

      page.drawText('1-800-SUICIDE -- 24-hour suicide prevention line that can be called', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });
      yPosition -= 16;
      page.drawText('from anywhere in the U.S.', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helveticaBold,
      });

      yPosition -= 30;

      // Contact information
      if (formData.contactInfo) {
        const words = formData.contactInfo.split(' ');
        let line = '';
        let currentY = yPosition;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = helvetica.widthOfTextAtSize(testLine, 11);

          if (testWidth > width - 120 && i > 0) {
            page.drawText(line, { x: 60, y: currentY, size: 11, font: helvetica, color: rgb(0, 0, 1) });
            line = words[i] + ' ';
            currentY -= 15;
          } else {
            line = testLine;
          }
        }
        page.drawText(line, { x: 60, y: currentY, size: 11, font: helvetica, color: rgb(0, 0, 1) });
        yPosition = currentY - 20;
      }

      yPosition -= 40;

      // Point 4
      page.drawText('4) I will continue talking on the phone with as many people as necessary', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });
      yPosition -= 16;
      page.drawText('for as long as necessary until the suicidal thoughts have subsided.', {
        x: 60,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 50;

      // Signature section
      page.drawText('Signature', { x: 60, y: yPosition, size: 11, font: helvetica });
      page.drawText('Date', { x: 450, y: yPosition, size: 11, font: helvetica });

      yPosition -= 5;
      page.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (clientSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(clientSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      page.drawText(formData.clientDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPosition -= 50;

      // Witness signature
      page.drawText('Witness', { x: 60, y: yPosition, size: 11, font: helvetica });
      page.drawText('Date', { x: 450, y: yPosition, size: 11, font: helvetica });

      yPosition -= 5;
      page.drawLine({ start: { x: 60, y: yPosition }, end: { x: 420, y: yPosition }, thickness: 1 });
      page.drawLine({ start: { x: 450, y: yPosition }, end: { x: 540, y: yPosition }, thickness: 1 });

      if (witnessSignatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(witnessSignatureDataUrl);
        const signatureDims = signatureImage.scale(0.15);
        page.drawImage(signatureImage, {
          x: 60,
          y: yPosition - signatureDims.height + 5,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      }

      page.drawText(formData.witnessDate, { x: 460, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();

      // Send the PDF via email
      const emailService = new EmailService();
      await emailService.sendSignedForm(
        formData.clientName,
        pdfBytes,
        'No-Harm Contract Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
          clientName: '',
          clientSignature: '',
          clientDate: new Date().toISOString().split('T')[0],
          witnessSignature: '',
          witnessDate: new Date().toISOString().split('T')[0],
          contactInfo: '',
        });
        clientSignatureRef.current?.clear();
        witnessSignatureRef.current?.clear();
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
          <h1>No-Harm Contract</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/NoHarmContract.pdf" target="_blank" rel="noopener noreferrer">
                View Full PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p className={styles.formIntro}>
                <em>by Kirstin R. Abraham, LCSW</em>
              </p>

              <div className={styles.formGroup}>
                <label htmlFor="clientName">Client Name *</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <p>
                I, <strong>{formData.clientName || '_______________'}</strong>, hereby agree that I will not
                harm myself in any way, attempt or commit suicide.
              </p>

              <p>
                <strong>Furthermore, I agree that I will take the following actions if I am ever suicidal:</strong>
              </p>

              <ol className={styles.contractList}>
                <li>
                  I will remind myself that I can never, under any circumstances, harm myself in any way, attempt or commit suicide.
                </li>
                <li>
                  I will call 911 if I believe that I am in immediate danger of harming myself.
                </li>
                <li>
                  I will call any or all of the following numbers if I am not in immediate danger of harming myself but have suicidal thoughts (please list names, phone numbers, addresses, and any other relevant contact information below):
                  <div className={styles.highlightBox}>
                    <p><strong>1-800-SUICIDE</strong> -- 24-hour suicide prevention line that can be called from anywhere in the U.S.</p>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactInfo">Additional Contact Information *</label>
                    <textarea
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="List names, phone numbers, addresses, and any other relevant contact information"
                    />
                  </div>
                </li>
                <li>
                  I will continue talking on the phone with as many people as necessary for as long as necessary until the suicidal thoughts have subsided.
                </li>
              </ol>
            </div>

            {/* Client Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <label>Signature *</label>
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
                  <label htmlFor="clientDate">Date *</label>
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

            {/* Witness Signature */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureRow}>
                <div className={styles.signatureField}>
                  <label>Witness *</label>
                  <div className={styles.signatureContainer}>
                    <SignatureCanvas
                      ref={witnessSignatureRef}
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
                    onClick={() => clearSignature(witnessSignatureRef)}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dateField}>
                  <label htmlFor="witnessDate">Date *</label>
                  <input
                    type="date"
                    id="witnessDate"
                    name="witnessDate"
                    value={formData.witnessDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
                  'Submit No-Harm Contract'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood
                the No-Harm Contract, and you agree to its terms.
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

export default NoHarmForm;
