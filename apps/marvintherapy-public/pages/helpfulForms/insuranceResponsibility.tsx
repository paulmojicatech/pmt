import { Fragment, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './consentForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface FormData {
  patientName: string;
  date: string;
  signature: string;
}

export const InsuranceResponsibilityForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    signature: '',
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

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signatureRef.current?.isEmpty()) {
      showToast('Please provide your signature before submitting.', 'error');
      return;
    }

    if (!formData.patientName) {
      showToast('Please provide your name.', 'error');
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
      currentPage.drawText('Responsibility to Know Your Insurance', {
        x: width / 2 - 150,
        y: yPos,
        size: 16,
        font: helveticaBold,
      });
      yPos -= 20;
      currentPage.drawText('Regulations and Guidelines', {
        x: width / 2 - 110,
        y: yPos,
        size: 16,
        font: helveticaBold,
      });
      yPos -= 40;

      // Helper function to draw wrapped text
      const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, font: any) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && i > 0) {
            currentPage.drawText(line, { x, y: currentY, size: fontSize, font });
            line = words[i] + ' ';
            currentY -= fontSize + 4;
          } else {
            line = testLine;
          }
        }
        currentPage.drawText(line, { x, y: currentY, size: fontSize, font });
        return currentY - fontSize - 4;
      };

      // Content sections
      const sections = [
        {
          title: 'Understanding Your Insurance Benefits',
          content: 'It is your responsibility to know and understand your insurance benefits, including co-payments, deductibles, co-insurance amounts, and coverage limitations. Insurance policies vary widely, and it is important that you are familiar with your specific plan details before your first appointment.'
        },
        {
          title: 'Pre-Authorization Requirements',
          content: 'Some insurance plans require pre-authorization or referrals for mental health services. It is your responsibility to obtain any necessary pre-authorization or referral from your insurance company or primary care physician before your appointment. Failure to obtain required authorization may result in denial of coverage and full financial responsibility for services rendered.'
        },
        {
          title: 'Verification of Benefits',
          content: 'While our office may contact your insurance company to verify your benefits, this verification is only an estimate of your coverage and is not a guarantee of payment. Your insurance company makes the final determination of your eligibility and benefits at the time they process the claim.'
        },
        {
          title: 'Payment Responsibility',
          content: 'You are responsible for any co-payments, deductibles, or co-insurance amounts at the time of service. You are also responsible for any charges not covered by your insurance plan. If your insurance company does not pay for services within a reasonable time frame, you will be responsible for the full payment.'
        },
        {
          title: 'Out-of-Network Benefits',
          content: 'If your therapist is not in your insurance network, you may have out-of-network benefits. It is your responsibility to understand these benefits and any additional costs associated with seeing an out-of-network provider. You may be required to pay in full at the time of service and then submit claims to your insurance company for reimbursement.'
        },
        {
          title: 'Changes in Coverage',
          content: 'You are responsible for notifying our office of any changes in your insurance coverage, including changes in policy, carrier, or eligibility. Failure to provide updated insurance information may result in claims being denied and you being held financially responsible for all charges.'
        },
        {
          title: 'Claims Submission',
          content: 'Our office will submit claims to your insurance company on your behalf as a courtesy. However, the relationship for payment is between you and your insurance company. Any disputes regarding coverage or payment are your responsibility to resolve with your insurance carrier.'
        }
      ];

      for (const section of sections) {
        if (yPos < 150) {
          currentPage = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        currentPage.drawText(section.title, {
          x: 60,
          y: yPos,
          size: 11,
          font: helveticaBold,
        });
        yPos -= 18;

        yPos = drawWrappedText(section.content, 60, yPos, width - 120, 10, helvetica);
        yPos -= 20;
      }

      // Acknowledgment
      if (yPos < 200) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 10;
      currentPage.drawText('Acknowledgment', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      const acknowledgment = 'By signing below, I acknowledge that I have read and understand this Insurance Responsibility Agreement. I understand that it is my responsibility to know my insurance benefits and to comply with all requirements of my insurance plan. I agree to be financially responsible for any charges not covered by my insurance.';
      yPos = drawWrappedText(acknowledgment, 60, yPos, width - 120, 10, helvetica);
      yPos -= 40;

      // Patient Name
      currentPage.drawText('Patient Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.patientName, { x: 150, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 30;

      // Date
      currentPage.drawText('Date: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.date, { x: 100, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });
      yPos -= 40;

      // Signature
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
        'Insurance Responsibility Form Submission'
      );

      showToast('Form submitted successfully! The signed form has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          patientName: '',
          date: new Date().toISOString().split('T')[0],
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
          <h1>Responsibility to Know Your Insurance Regulations and Guidelines</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/Responsibility to know your Insurance__regulations_guidelines.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <h2>Understanding Your Insurance Benefits</h2>
              <p>
                It is your responsibility to know and understand your insurance benefits, including co-payments, 
                deductibles, co-insurance amounts, and coverage limitations. Insurance policies vary widely, and 
                it is important that you are familiar with your specific plan details before your first appointment.
              </p>

              <h2>Pre-Authorization Requirements</h2>
              <p>
                Some insurance plans require pre-authorization or referrals for mental health services. It is your 
                responsibility to obtain any necessary pre-authorization or referral from your insurance company or 
                primary care physician before your appointment. Failure to obtain required authorization may result 
                in denial of coverage and full financial responsibility for services rendered.
              </p>

              <h2>Verification of Benefits</h2>
              <p>
                While our office may contact your insurance company to verify your benefits, this verification is 
                only an estimate of your coverage and is not a guarantee of payment. Your insurance company makes 
                the final determination of your eligibility and benefits at the time they process the claim.
              </p>

              <h2>Payment Responsibility</h2>
              <p>
                You are responsible for any co-payments, deductibles, or co-insurance amounts at the time of service. 
                You are also responsible for any charges not covered by your insurance plan. If your insurance company 
                does not pay for services within a reasonable time frame, you will be responsible for the full payment.
              </p>

              <h2>Out-of-Network Benefits</h2>
              <p>
                If your therapist is not in your insurance network, you may have out-of-network benefits. It is your 
                responsibility to understand these benefits and any additional costs associated with seeing an 
                out-of-network provider. You may be required to pay in full at the time of service and then submit 
                claims to your insurance company for reimbursement.
              </p>

              <h2>Changes in Coverage</h2>
              <p>
                You are responsible for notifying our office of any changes in your insurance coverage, including 
                changes in policy, carrier, or eligibility. Failure to provide updated insurance information may 
                result in claims being denied and you being held financially responsible for all charges.
              </p>

              <h2>Claims Submission</h2>
              <p>
                Our office will submit claims to your insurance company on your behalf as a courtesy. However, the 
                relationship for payment is between you and your insurance company. Any disputes regarding coverage 
                or payment are your responsibility to resolve with your insurance carrier.
              </p>

              <h2>Acknowledgment</h2>
              <p>
                By signing below, I acknowledge that I have read and understand this Insurance Responsibility Agreement. 
                I understand that it is my responsibility to know my insurance benefits and to comply with all 
                requirements of my insurance plan. I agree to be financially responsible for any charges not covered 
                by my insurance.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientName">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.signatureBlock}>
              <h3>Signature *</h3>
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
                  'Submit Insurance Responsibility Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood the Insurance 
                Responsibility Agreement and agree to its terms.
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

export default InsuranceResponsibilityForm;
