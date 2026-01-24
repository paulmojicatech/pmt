import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface SignatureData {
  signature: string;
  date: string;
  name: string;
}

interface FormData {
  signatures: SignatureData[];
}

export const NonSubpoenaForm = () => {
  const signatureRefs = [
    useRef<SignatureCanvas>(null),
    useRef<SignatureCanvas>(null),
    useRef<SignatureCanvas>(null),
    useRef<SignatureCanvas>(null),
  ];

  const [formData, setFormData] = useState<FormData>({
    signatures: [
      { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
      { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
      { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
      { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (index: number, field: 'date' | 'name', value: string) => {
    setFormData((prev) => {
      const newSignatures = [...prev.signatures];
      newSignatures[index] = { ...newSignatures[index], [field]: value };
      return { ...prev, signatures: newSignatures };
    });
  };

  const clearSignature = (ref: React.RefObject<SignatureCanvas>) => {
    ref.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one signature is provided
    const hasAtLeastOneSignature = signatureRefs.some(ref => !ref.current?.isEmpty());

    if (!hasAtLeastOneSignature) {
      showToast('Please provide at least one signature before submitting.', 'error');
      return;
    }

    // Check that each non-empty signature has a corresponding name
    const hasInvalidSignature = signatureRefs.some((ref, index) => {
      const isEmpty = ref.current?.isEmpty();
      const hasName = formData.signatures[index].name.trim() !== '';
      return !isEmpty && !hasName;
    });

    if (hasInvalidSignature) {
      showToast('Please provide a name for each signature.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get all signatures as data URLs
      const signatureDataUrls = signatureRefs.map((ref, index) => {
        if (!ref.current?.isEmpty()) {
          return {
            dataUrl: ref.current?.toDataURL(),
            date: formData.signatures[index].date,
            name: formData.signatures[index].name,
          };
        }
        return null;
      }).filter(sig => sig !== null);

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add page
      const page = pdfDoc.addPage([612, 792]); // Letter size

      const { width, height } = page.getSize();

      // Embed fonts
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');
      const helvetica = await pdfDoc.embedFont('Helvetica');

      let yPosition = height - 60;

      // Title
      const titleLines = [
        'Non-Subpoena Contract for Clients in',
        'Couple, Family, or Child/Parent',
        'Therapy'
      ];

      for (const line of titleLines) {
        const textWidth = helveticaBold.widthOfTextAtSize(line, 16);
        page.drawText(line, {
          x: (width - textWidth) / 2,
          y: yPosition,
          size: 16,
          font: helveticaBold,
        });
        yPosition -= 24;
      }

      yPosition -= 30;

      // Author
      page.drawText('Kirstin R. Abraham, LCSW', {
        x: 100,
        y: yPosition,
        size: 11,
        font: helvetica,
      });

      yPosition -= 40;

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

      // Main paragraphs
      const paragraphs = [
        'This contract is an agreement between the interested parties that no party shall attempt to subpoena my testimony or my records for a deposition or court hearing of any kind or for any reason.',
        'All parties acknowledge that the goal of psychotherapy is the amelioration of psychological distress and interpersonal conflict, and that the process of psychotherapy depends on trust and openness during the therapy sessions.',
        'Therefore it is understood by all parties that if they request my services as a psychotherapist, they are not to use information given to me during the therapy process for their own legal purposes or against any of the other parties in a court or judicial setting of any kind.'
      ];

      for (const para of paragraphs) {
        yPosition = drawWrappedText(para, 100, yPosition, width - 200, 11, helvetica);
        yPosition -= 25;
      }

      yPosition -= 30;

      // Signatures section
      for (let i = 0; i < signatureDataUrls.length; i++) {
        const sigData = signatureDataUrls[i];
        if (!sigData) continue;

        // Name label
        if (sigData.name) {
          page.drawText(sigData.name, {
            x: 100,
            y: yPosition,
            size: 10,
            font: helvetica,
            color: rgb(0, 0, 1),
          });
          yPosition -= 20;
        }

        page.drawText('Signed &', { x: 100, y: yPosition, size: 10, font: helvetica });
        yPosition -= 12;
        page.drawText('Dated', { x: 100, y: yPosition, size: 10, font: helvetica });

        yPosition -= 5;
        page.drawLine({ start: { x: 150, y: yPosition }, end: { x: 500, y: yPosition }, thickness: 1 });

        if (sigData.dataUrl) {
          const signatureImage = await pdfDoc.embedPng(sigData.dataUrl);
          const signatureDims = signatureImage.scale(0.15);
          page.drawImage(signatureImage, {
            x: 150,
            y: yPosition - signatureDims.height + 20,
            width: signatureDims.width,
            height: signatureDims.height,
          });
        }

        page.drawText(sigData.date, { x: 420, y: yPosition - 15, size: 10, font: helvetica, color: rgb(0, 0, 1) });

        yPosition -= 50;

        // Add new page if running out of space
        if (yPosition < 100 && i < signatureDataUrls.length - 1) {
          yPosition = height - 60;
        }
      }

      // Save the PDF
      const pdfBytes = await pdfDoc.save();

      // Get all names for email
      const allNames = signatureDataUrls
        .map(sig => sig?.name)
        .filter(name => name)
        .join(', ');

      // Send the PDF via email
      const emailService = new EmailService();
      await emailService.sendSignedForm(
        allNames || 'Clients',
        pdfBytes,
        'Non-Subpoena Contract Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
          signatures: [
            { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
            { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
            { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
            { signature: '', date: new Date().toISOString().split('T')[0], name: '' },
          ],
        });
        signatureRefs.forEach(ref => ref.current?.clear());
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
          <h1>Non-Subpoena Contract for Clients in Couple, Family, or Child/Parent Therapy</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/SampleNonSubpoenaKirstin.pdf" target="_blank" rel="noopener noreferrer">
                View Full PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p className={styles.formIntro}>
                <em>Kirstin R. Abraham, LCSW</em>
              </p>

              <p>
                This contract is an agreement between the interested parties that no party shall attempt to
                subpoena my testimony or my records for a deposition or court hearing of any kind or for any reason.
              </p>

              <p>
                All parties acknowledge that the goal of psychotherapy is the amelioration of psychological
                distress and interpersonal conflict, and that the process of psychotherapy depends on trust
                and openness during the therapy sessions.
              </p>

              <p>
                Therefore it is understood by all parties that if they request my services as a psychotherapist,
                they are not to use information given to me during the therapy process for their own legal purposes
                or against any of the other parties in a court or judicial setting of any kind.
              </p>
            </div>

            <div className={styles.signaturesInfo}>
              <p>
                <strong>All parties involved in therapy must sign below:</strong>
              </p>
            </div>

            {/* Multiple Signature Blocks */}
            {signatureRefs.map((ref, index) => (
              <div key={index} className={styles.signatureBlock}>
                <h3>Party {index + 1} {index === 0 ? '(Required)' : '(Optional)'}</h3>

                <div className={styles.formGroup}>
                  <label htmlFor={`name-${index}`}>Full Name {index === 0 ? '*' : ''}</label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    name={`name-${index}`}
                    value={formData.signatures[index].name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    required={index === 0}
                    placeholder="Enter full name"
                  />
                </div>

                <div className={styles.signatureRow}>
                  <div className={styles.signatureField}>
                    <label>Signed {index === 0 ? '*' : ''}</label>
                    <div className={styles.signatureContainer}>
                      <SignatureCanvas
                        ref={ref}
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
                      onClick={() => clearSignature(ref)}
                      className={styles.clearButton}
                    >
                      Clear
                    </button>
                  </div>
                  <div className={styles.dateField}>
                    <label htmlFor={`date-${index}`}>Dated {index === 0 ? '*' : ''}</label>
                    <input
                      type="date"
                      id={`date-${index}`}
                      name={`date-${index}`}
                      value={formData.signatures[index].date}
                      onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                      required={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}

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
                  'Submit Non-Subpoena Contract'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood
                the Non-Subpoena Contract, and you agree to its terms.
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

export default NonSubpoenaForm;
