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

export const TelehealthConsentForm = () => {
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
      currentPage.drawText('Telehealth Informed Consent', {
        x: width / 2 - 120,
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

            if (currentY < 100) {
              currentPage = pdfDoc.addPage([612, 792]);
              currentY = height - 50;
            }
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
          title: 'What is Telehealth?',
          content: 'Telehealth is the delivery of health care services using electronic communications, information technology, or other means between a health care provider and a patient who are not in the same physical location. Telehealth may include audio, video, and data communications including, but not limited to, videoconferencing, streaming audio, or other telecommunications technology.'
        },
        {
          title: 'Benefits of Telehealth',
          content: 'Telehealth may improve access to care by enabling a patient to remain at home or another convenient location while receiving mental health services. Telehealth may provide more efficient medical evaluation and management, reduce travel time and expense, and eliminate the need for time away from work or school. It may also reduce exposure to other illnesses.'
        },
        {
          title: 'Potential Risks',
          content: 'As with any internet-based communication, there is a risk of technical difficulties and interruption of services. There is also a risk that security protocols could fail, causing a breach of privacy of personal medical information. While telehealth allows for greater flexibility in scheduling and eliminates travel time, the lack of physical presence may result in delays in medical evaluation and treatment in emergency situations.'
        },
        {
          title: 'Technology Requirements',
          content: 'Telehealth requires access to appropriate technology including a computer, tablet, or smartphone with a camera, microphone, and reliable internet connection. You are responsible for ensuring that you have appropriate technology and internet connectivity for telehealth sessions. Technical problems on your end may result in inability to complete sessions and may be counted as a missed appointment if not communicated in advance.'
        },
        {
          title: 'Privacy and Confidentiality',
          content: 'While I will take reasonable steps to ensure the security of our communications, including using HIPAA-compliant video conferencing platforms, I cannot guarantee complete security. You should ensure that you participate in telehealth sessions from a private location where you cannot be overheard. I will also take steps to ensure my location is private and free from interruptions during our sessions.'
        },
        {
          title: 'Emergency Procedures',
          content: 'Telehealth is not appropriate for emergency situations. If you are experiencing a mental health emergency, you should call 911, go to your nearest emergency room, or call the National Suicide Prevention Lifeline at 1-800-273-8255. Before our first telehealth session, I will ask you to provide me with emergency contact information and the address where you will be located during our sessions in case of an emergency.'
        },
        {
          title: 'Professional Standards',
          content: 'The same professional standards and ethical guidelines that apply to in-person therapy also apply to telehealth services. The same fee structure, cancellation policy, and confidentiality guidelines apply to telehealth sessions as in-person sessions. I reserve the right to terminate telehealth services if I determine that telehealth is not appropriate or effective for your particular needs.'
        },
        {
          title: 'Insurance Coverage',
          content: 'Not all insurance plans cover telehealth services. It is your responsibility to verify whether your insurance plan covers telehealth services and to understand any limitations or requirements. You are responsible for any co-payments, deductibles, or other fees associated with telehealth services.'
        },
        {
          title: 'Informed Consent',
          content: 'By signing this form, I acknowledge that I have read and understood this Telehealth Informed Consent form. I understand the potential benefits and risks of telehealth services. I understand that I have the right to refuse telehealth services at any time and request in-person services if available. I consent to receive mental health services via telehealth from Marvin Therapy.'
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
      currentPage.drawText('Patient Acknowledgment and Consent', {
        x: 60,
        y: yPos,
        size: 12,
        font: helveticaBold,
      });
      yPos -= 20;

      const acknowledgment = 'I have read, understood, and agree to the information provided in this Telehealth Informed Consent form. I understand the risks and benefits of telehealth services and consent to receive mental health services via telehealth. I understand that I may revoke this consent at any time.';
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
        'Telehealth Informed Consent Form Submission'
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
          <h1>Telehealth Informed Consent</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/TelehealthInformedConsent.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <h2>What is Telehealth?</h2>
              <p>
                Telehealth is the delivery of health care services using electronic communications, information 
                technology, or other means between a health care provider and a patient who are not in the same 
                physical location. Telehealth may include audio, video, and data communications including, but not 
                limited to, videoconferencing, streaming audio, or other telecommunications technology.
              </p>

              <h2>Benefits of Telehealth</h2>
              <p>
                Telehealth may improve access to care by enabling a patient to remain at home or another convenient 
                location while receiving mental health services. Telehealth may provide more efficient medical 
                evaluation and management, reduce travel time and expense, and eliminate the need for time away from 
                work or school. It may also reduce exposure to other illnesses.
              </p>

              <h2>Potential Risks</h2>
              <p>
                As with any internet-based communication, there is a risk of technical difficulties and interruption 
                of services. There is also a risk that security protocols could fail, causing a breach of privacy of 
                personal medical information. While telehealth allows for greater flexibility in scheduling and 
                eliminates travel time, the lack of physical presence may result in delays in medical evaluation and 
                treatment in emergency situations.
              </p>

              <h2>Technology Requirements</h2>
              <p>
                Telehealth requires access to appropriate technology including a computer, tablet, or smartphone with 
                a camera, microphone, and reliable internet connection. You are responsible for ensuring that you have 
                appropriate technology and internet connectivity for telehealth sessions. Technical problems on your 
                end may result in inability to complete sessions and may be counted as a missed appointment if not 
                communicated in advance.
              </p>

              <h2>Privacy and Confidentiality</h2>
              <p>
                While I will take reasonable steps to ensure the security of our communications, including using 
                HIPAA-compliant video conferencing platforms, I cannot guarantee complete security. You should ensure 
                that you participate in telehealth sessions from a private location where you cannot be overheard. 
                I will also take steps to ensure my location is private and free from interruptions during our sessions.
              </p>

              <h2>Emergency Procedures</h2>
              <p>
                Telehealth is not appropriate for emergency situations. If you are experiencing a mental health 
                emergency, you should call 911, go to your nearest emergency room, or call the National Suicide 
                Prevention Lifeline at 1-800-273-8255. Before our first telehealth session, I will ask you to provide 
                me with emergency contact information and the address where you will be located during our sessions in 
                case of an emergency.
              </p>

              <h2>Professional Standards</h2>
              <p>
                The same professional standards and ethical guidelines that apply to in-person therapy also apply to 
                telehealth services. The same fee structure, cancellation policy, and confidentiality guidelines apply 
                to telehealth sessions as in-person sessions. I reserve the right to terminate telehealth services if 
                I determine that telehealth is not appropriate or effective for your particular needs.
              </p>

              <h2>Insurance Coverage</h2>
              <p>
                Not all insurance plans cover telehealth services. It is your responsibility to verify whether your 
                insurance plan covers telehealth services and to understand any limitations or requirements. You are 
                responsible for any co-payments, deductibles, or other fees associated with telehealth services.
              </p>

              <h2>Informed Consent</h2>
              <p>
                By signing this form, I acknowledge that I have read and understood this Telehealth Informed Consent 
                form. I understand the potential benefits and risks of telehealth services. I understand that I have 
                the right to refuse telehealth services at any time and request in-person services if available. I 
                consent to receive mental health services via telehealth from Marvin Therapy.
              </p>

              <h2>Patient Acknowledgment and Consent</h2>
              <p>
                I have read, understood, and agree to the information provided in this Telehealth Informed Consent form. 
                I understand the risks and benefits of telehealth services and consent to receive mental health services 
                via telehealth. I understand that I may revoke this consent at any time.
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
                  'Submit Telehealth Consent Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that you have read and understood the Telehealth 
                Informed Consent form and agree to receive mental health services via telehealth.
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

export default TelehealthConsentForm;
