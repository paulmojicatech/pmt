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

  // 21 questions, each with a score 0-3
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
  q18: string;
  q19: string;
  q20: string;
  q21: string;
}

export const BeckDepressionForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    signature: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    q19: '',
    q20: '',
    q21: '',
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

  const handleRadioChange = (questionNum: string, value: string) => {
    setFormData((prev) => ({ ...prev, [questionNum]: value }));
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const calculateTotal = (): number => {
    let total = 0;
    for (let i = 1; i <= 21; i++) {
      const value = formData[`q${i}` as keyof FormData];
      if (value) {
        total += parseInt(value);
      }
    }
    return total;
  };

  const getDepressionLevel = (score: number): string => {
    if (score <= 10) return 'Minimal Depression';
    if (score <= 16) return 'Mild Depression';
    if (score <= 20) return 'Borderline Clinical Depression';
    if (score <= 30) return 'Moderate Depression';
    if (score <= 40) return 'Severe Depression';
    return 'Extreme Depression';
  };

  const questions = [
    {
      num: 1,
      text: 'Sadness',
      options: [
        '0 - I do not feel sad',
        '1 - I feel sad much of the time',
        '2 - I am sad all the time',
        '3 - I am so sad or unhappy that I can\'t stand it'
      ]
    },
    {
      num: 2,
      text: 'Pessimism',
      options: [
        '0 - I am not discouraged about my future',
        '1 - I feel more discouraged about my future than I used to be',
        '2 - I do not expect things to work out for me',
        '3 - I feel my future is hopeless and will only get worse'
      ]
    },
    {
      num: 3,
      text: 'Past Failure',
      options: [
        '0 - I do not feel like a failure',
        '1 - I have failed more than I should have',
        '2 - As I look back, I see a lot of failures',
        '3 - I feel I am a total failure as a person'
      ]
    },
    {
      num: 4,
      text: 'Loss of Pleasure',
      options: [
        '0 - I get as much pleasure as I ever did from the things I enjoy',
        '1 - I don\'t enjoy things as much as I used to',
        '2 - I get very little pleasure from the things I used to enjoy',
        '3 - I can\'t get any pleasure from the things I used to enjoy'
      ]
    },
    {
      num: 5,
      text: 'Guilty Feelings',
      options: [
        '0 - I don\'t feel particularly guilty',
        '1 - I feel guilty over many things I have done or should have done',
        '2 - I feel quite guilty most of the time',
        '3 - I feel guilty all of the time'
      ]
    },
    {
      num: 6,
      text: 'Punishment Feelings',
      options: [
        '0 - I don\'t feel I am being punished',
        '1 - I feel I may be punished',
        '2 - I expect to be punished',
        '3 - I feel I am being punished'
      ]
    },
    {
      num: 7,
      text: 'Self-Dislike',
      options: [
        '0 - I feel the same about myself as ever',
        '1 - I have lost confidence in myself',
        '2 - I am disappointed in myself',
        '3 - I dislike myself'
      ]
    },
    {
      num: 8,
      text: 'Self-Criticalness',
      options: [
        '0 - I don\'t criticize or blame myself more than usual',
        '1 - I am more critical of myself than I used to be',
        '2 - I criticize myself for all of my faults',
        '3 - I blame myself for everything bad that happens'
      ]
    },
    {
      num: 9,
      text: 'Suicidal Thoughts or Wishes',
      options: [
        '0 - I don\'t have any thoughts of killing myself',
        '1 - I have thoughts of killing myself, but I would not carry them out',
        '2 - I would like to kill myself',
        '3 - I would kill myself if I had the chance'
      ]
    },
    {
      num: 10,
      text: 'Crying',
      options: [
        '0 - I don\'t cry anymore than I used to',
        '1 - I cry more than I used to',
        '2 - I cry over every little thing',
        '3 - I feel like crying, but I can\'t'
      ]
    },
    {
      num: 11,
      text: 'Agitation',
      options: [
        '0 - I am no more restless or wound up than usual',
        '1 - I feel more restless or wound up than usual',
        '2 - I am so restless or agitated that it\'s hard to stay still',
        '3 - I am so restless or agitated that I have to keep moving or doing something'
      ]
    },
    {
      num: 12,
      text: 'Loss of Interest',
      options: [
        '0 - I have not lost interest in other people or activities',
        '1 - I am less interested in other people or things than before',
        '2 - I have lost most of my interest in other people or things',
        '3 - It\'s hard to get interested in anything'
      ]
    },
    {
      num: 13,
      text: 'Indecisiveness',
      options: [
        '0 - I make decisions about as well as ever',
        '1 - I find it more difficult to make decisions than usual',
        '2 - I have much greater difficulty in making decisions than I used to',
        '3 - I have trouble making any decisions'
      ]
    },
    {
      num: 14,
      text: 'Worthlessness',
      options: [
        '0 - I do not feel I am worthless',
        '1 - I don\'t consider myself as worthwhile and useful as I used to',
        '2 - I feel more worthless as compared to other people',
        '3 - I feel utterly worthless'
      ]
    },
    {
      num: 15,
      text: 'Loss of Energy',
      options: [
        '0 - I have as much energy as ever',
        '1 - I have less energy than I used to have',
        '2 - I don\'t have enough energy to do very much',
        '3 - I don\'t have enough energy to do anything'
      ]
    },
    {
      num: 16,
      text: 'Changes in Sleeping Pattern',
      options: [
        '0 - I have not experienced any change in my sleeping pattern',
        '1a - I sleep somewhat more/less than usual',
        '2a - I sleep a lot more/less than usual',
        '3a - I sleep most of the day / I wake up 1-2 hours early and can\'t get back to sleep'
      ]
    },
    {
      num: 17,
      text: 'Irritability',
      options: [
        '0 - I am no more irritable than usual',
        '1 - I am more irritable than usual',
        '2 - I am much more irritable than usual',
        '3 - I am irritable all the time'
      ]
    },
    {
      num: 18,
      text: 'Changes in Appetite',
      options: [
        '0 - I have not experienced any change in my appetite',
        '1a - My appetite is somewhat less/greater than usual',
        '2a - My appetite is much less/greater than usual',
        '3a - I have no appetite at all / I crave food all the time'
      ]
    },
    {
      num: 19,
      text: 'Concentration Difficulty',
      options: [
        '0 - I can concentrate as well as ever',
        '1 - I can\'t concentrate as well as usual',
        '2 - It\'s hard to keep my mind on anything for very long',
        '3 - I find I can\'t concentrate on anything'
      ]
    },
    {
      num: 20,
      text: 'Tiredness or Fatigue',
      options: [
        '0 - I am no more tired or fatigued than usual',
        '1 - I get more tired or fatigued more easily than usual',
        '2 - I am too tired or fatigued to do a lot of the things I used to do',
        '3 - I am too tired or fatigued to do most of the things I used to do'
      ]
    },
    {
      num: 21,
      text: 'Loss of Interest in Sex',
      options: [
        '0 - I have not noticed any recent change in my interest in sex',
        '1 - I am less interested in sex than I used to be',
        '2 - I am much less interested in sex now',
        '3 - I have lost interest in sex completely'
      ]
    }
  ];

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

    // Check if all questions are answered
    for (let i = 1; i <= 21; i++) {
      if (!formData[`q${i}` as keyof FormData]) {
        showToast(`Please answer question ${i} before submitting.`, 'error');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const signatureDataUrl = signatureRef.current?.toDataURL();
      const totalScore = calculateTotal();
      const depressionLevel = getDepressionLevel(totalScore);

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const helvetica = await pdfDoc.embedFont('Helvetica');
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

      let currentPage = pdfDoc.addPage([612, 792]);
      const { width, height } = currentPage.getSize();
      let yPos = height - 50;

      // Title
      currentPage.drawText('Beck Depression Inventory (BDI)', {
        x: width / 2 - 120,
        y: yPos,
        size: 16,
        font: helveticaBold,
      });
      yPos -= 30;

      // Patient info
      currentPage.drawText('Name: ', { x: 60, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.patientName, { x: 100, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      const dateLabel = 'Date: ';
      const dateLabelWidth = helvetica.widthOfTextAtSize(dateLabel, 10);
      currentPage.drawText(dateLabel, { x: 400, y: yPos, size: 10, font: helvetica });
      currentPage.drawText(formData.date, { x: 400 + dateLabelWidth, y: yPos, size: 10, font: helvetica, color: rgb(0, 0, 1) });

      yPos -= 30;

      // Instructions
      const instructions = 'This questionnaire consists of 21 groups of statements. Please read each group of statements carefully, then pick out the one statement in each group that best describes the way you have been feeling during the past two weeks, including today.';
      const words = instructions.split(' ');
      let line = '';
      let currentY = yPos;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = helvetica.widthOfTextAtSize(testLine, 9);

        if (testWidth > width - 120 && i > 0) {
          currentPage.drawText(line, { x: 60, y: currentY, size: 9, font: helvetica });
          line = words[i] + ' ';
          currentY -= 11;
        } else {
          line = testLine;
        }
      }
      currentPage.drawText(line, { x: 60, y: currentY, size: 9, font: helvetica });
      yPos = currentY - 25;

      // Responses
      for (let i = 1; i <= 21; i++) {
        const question = questions[i - 1];
        const answer = formData[`q${i}` as keyof FormData];

        if (yPos < 100) {
          currentPage = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        currentPage.drawText(`${i}. ${question.text}`, { x: 60, y: yPos, size: 9, font: helveticaBold });
        yPos -= 12;

        const selectedOption = question.options.find(opt => opt.startsWith(answer));
        if (selectedOption) {
          currentPage.drawText(selectedOption, { x: 80, y: yPos, size: 8, font: helvetica, color: rgb(0, 0, 1) });
        }
        yPos -= 18;
      }

      // Score and interpretation
      if (yPos < 150) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 10;
      currentPage.drawText('Total Score: ', { x: 60, y: yPos, size: 11, font: helveticaBold });
      currentPage.drawText(`${totalScore}`, { x: 140, y: yPos, size: 11, font: helveticaBold, color: rgb(0, 0, 1) });
      yPos -= 20;

      currentPage.drawText('Interpretation: ', { x: 60, y: yPos, size: 11, font: helveticaBold });
      currentPage.drawText(depressionLevel, { x: 155, y: yPos, size: 11, font: helvetica, color: rgb(0, 0, 1) });
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
        'Beck Depression Inventory Submission'
      );

      showToast('Form submitted successfully! The completed inventory has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          patientName: '',
          date: new Date().toISOString().split('T')[0],
          signature: '',
          q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
          q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '', q21: '',
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

  const totalScore = calculateTotal();
  const depressionLevel = getDepressionLevel(totalScore);

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/helpfulForms.jpg" />

      <main className={styles.container}>
        <section className={styles.formSection}>
          <h1>Beck Depression Inventory (BDI)</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/Beck_Depression_Inventory.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p>
                This questionnaire consists of 21 groups of statements. Please read each group of statements
                carefully, then pick out the one statement in each group that best describes the way you have
                been feeling during the <strong>past two weeks, including today</strong>.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientName">Full Name *</label>
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

            {questions.map((question) => (
              <div key={question.num} className={styles.questionBlock}>
                <h3>{question.num}. {question.text}</h3>
                {question.options.map((option, idx) => {
                  const value = option.split(' - ')[0];
                  return (
                    <div key={idx} className={styles.radioOption}>
                      <input
                        type="radio"
                        id={`q${question.num}_${value}`}
                        name={`q${question.num}`}
                        value={value}
                        checked={formData[`q${question.num}` as keyof FormData] === value}
                        onChange={() => handleRadioChange(`q${question.num}`, value)}
                        required
                      />
                      <label htmlFor={`q${question.num}_${value}`}>{option}</label>
                    </div>
                  );
                })}
              </div>
            ))}

            {totalScore > 0 && (
              <div className={styles.scoreDisplay}>
                <h3>Current Score: {totalScore}</h3>
                <p><strong>Interpretation:</strong> {depressionLevel}</p>
                <div className={styles.scoreGuide}>
                  <p><strong>Score Guide:</strong></p>
                  <ul>
                    <li>1-10: Minimal Depression</li>
                    <li>11-16: Mild Depression</li>
                    <li>17-20: Borderline Clinical Depression</li>
                    <li>21-30: Moderate Depression</li>
                    <li>31-40: Severe Depression</li>
                    <li>Over 40: Extreme Depression</li>
                  </ul>
                </div>
              </div>
            )}

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
                  'Submit Beck Depression Inventory'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that the information provided is accurate
                to the best of your knowledge. This inventory is a screening tool and does not
                constitute a clinical diagnosis.
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

export default BeckDepressionForm;
