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

  // 33 anxiety symptoms, each rated 0-3
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
  q22: string;
  q23: string;
  q24: string;
  q25: string;
  q26: string;
  q27: string;
  q28: string;
  q29: string;
  q30: string;
  q31: string;
  q32: string;
  q33: string;
}

export const BurnsAnxietyForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    signature: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '',
    q21: '', q22: '', q23: '', q24: '', q25: '', q26: '', q27: '', q28: '', q29: '', q30: '',
    q31: '', q32: '', q33: '',
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
    for (let i = 1; i <= 33; i++) {
      const value = formData[`q${i}` as keyof FormData];
      if (value) {
        total += parseInt(value);
      }
    }
    return total;
  };

  const getAnxietyLevel = (score: number): string => {
    if (score <= 4) return 'Minimal or No Anxiety';
    if (score <= 9) return 'Borderline Anxiety';
    if (score <= 14) return 'Mild Anxiety';
    if (score <= 19) return 'Moderate Anxiety';
    if (score <= 24) return 'Severe Anxiety';
    return 'Extreme Anxiety or Panic';
  };

  const categories = [
    {
      name: 'Anxious Feelings',
      questions: [1, 2, 3, 4]
    },
    {
      name: 'Anxious Thoughts',
      questions: [5, 6, 7, 8, 9, 10]
    },
    {
      name: 'Physical Symptoms',
      questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    }
  ];

  const questions = [
    { num: 1, text: 'Anxiety, nervousness, worry, or fear' },
    { num: 2, text: 'Feeling that things around you are strange or unreal' },
    { num: 3, text: 'Feeling detached from all or part of your body' },
    { num: 4, text: 'Sudden unexpected panic spells' },
    { num: 5, text: 'Apprehension or a sense of impending doom' },
    { num: 6, text: 'Feeling tense, stressed, "uptight," or on edge' },
    { num: 7, text: 'Difficulty concentrating' },
    { num: 8, text: 'Racing thoughts' },
    { num: 9, text: 'Frightening fantasies or daydreams' },
    { num: 10, text: 'Feeling that you\'re on the verge of losing control' },
    { num: 11, text: 'Fears of cracking up or going crazy' },
    { num: 12, text: 'Fears of fainting or passing out' },
    { num: 13, text: 'Fears of physical illnesses or heart attacks or dying' },
    { num: 14, text: 'Concerns about looking foolish or inadequate' },
    { num: 15, text: 'Fears of being alone, isolated, or abandoned' },
    { num: 16, text: 'Fears of criticism or disapproval' },
    { num: 17, text: 'Fears that something terrible is about to happen' },
    { num: 18, text: 'Skipping, racing, or pounding of the heart (palpitations)' },
    { num: 19, text: 'Pain, pressure, or tightness in the chest' },
    { num: 20, text: 'Tingling or numbness in the toes or fingers' },
    { num: 21, text: 'Butterflies or discomfort in the stomach' },
    { num: 22, text: 'Constipation or diarrhea' },
    { num: 23, text: 'Restlessness or jumpiness' },
    { num: 24, text: 'Tight, tense muscles' },
    { num: 25, text: 'Sweating not brought on by heat' },
    { num: 26, text: 'A lump in the throat' },
    { num: 27, text: 'Trembling or shaking' },
    { num: 28, text: 'Rubbery or "jelly" legs' },
    { num: 29, text: 'Feeling dizzy, lightheaded, or off balance' },
    { num: 30, text: 'Choking or smothering sensations or difficulty breathing' },
    { num: 31, text: 'Headaches or pains in the neck or shoulders' },
    { num: 32, text: 'Feeling tired, weak, or easily exhausted' },
    { num: 33, text: 'Difficulty falling or staying asleep' }
  ];

  const ratingScale = [
    { value: '0', label: '0 - Not at all' },
    { value: '1', label: '1 - Somewhat' },
    { value: '2', label: '2 - Moderately' },
    { value: '3', label: '3 - A lot' }
  ];

  const getCategoryScore = (categoryQuestions: number[]): number => {
    return categoryQuestions.reduce((sum, qNum) => {
      const value = formData[`q${qNum}` as keyof FormData];
      return sum + (value ? parseInt(value) : 0);
    }, 0);
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

    // Check if all questions are answered
    for (let i = 1; i <= 33; i++) {
      if (!formData[`q${i}` as keyof FormData]) {
        showToast(`Please answer question ${i} before submitting.`, 'error');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const signatureDataUrl = signatureRef.current?.toDataURL();
      const totalScore = calculateTotal();
      const anxietyLevel = getAnxietyLevel(totalScore);

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const helvetica = await pdfDoc.embedFont('Helvetica');
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

      let currentPage = pdfDoc.addPage([612, 792]);
      const { width, height } = currentPage.getSize();
      let yPos = height - 50;

      // Title
      currentPage.drawText('Burns Anxiety Inventory', {
        x: width / 2 - 100,
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
      const instructions = 'Instructions: Place a check in the space to the right that best describes how much each symptom or problem has bothered you during the past week.';
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

      // Responses by category
      for (const category of categories) {
        if (yPos < 100) {
          currentPage = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        // Category header
        currentPage.drawText(category.name, { x: 60, y: yPos, size: 11, font: helveticaBold });
        yPos -= 18;

        for (const qNum of category.questions) {
          const question = questions[qNum - 1];
          const answer = formData[`q${qNum}` as keyof FormData];

          if (yPos < 80) {
            currentPage = pdfDoc.addPage([612, 792]);
            yPos = height - 50;
          }

          // Question text
          currentPage.drawText(`${qNum}. ${question.text}`, { x: 70, y: yPos, size: 8, font: helvetica });
          yPos -= 10;

          // Answer
          const selectedOption = ratingScale.find(opt => opt.value === answer);
          if (selectedOption) {
            currentPage.drawText(selectedOption.label, { x: 90, y: yPos, size: 8, font: helvetica, color: rgb(0, 0, 1) });
          }
          yPos -= 15;
        }

        // Category subtotal
        const categoryScore = getCategoryScore(category.questions);
        currentPage.drawText(`${category.name} Subtotal: `, { x: 60, y: yPos, size: 9, font: helveticaBold });
        currentPage.drawText(`${categoryScore}`, { x: 200, y: yPos, size: 9, font: helveticaBold, color: rgb(0, 0, 1) });
        yPos -= 25;
      }

      // Total Score and interpretation
      if (yPos < 150) {
        currentPage = pdfDoc.addPage([612, 792]);
        yPos = height - 50;
      }

      yPos -= 10;
      currentPage.drawText('Total Score: ', { x: 60, y: yPos, size: 11, font: helveticaBold });
      currentPage.drawText(`${totalScore}`, { x: 140, y: yPos, size: 11, font: helveticaBold, color: rgb(0, 0, 1) });
      yPos -= 20;

      currentPage.drawText('Interpretation: ', { x: 60, y: yPos, size: 11, font: helveticaBold });
      currentPage.drawText(anxietyLevel, { x: 155, y: yPos, size: 11, font: helvetica, color: rgb(0, 0, 1) });
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
        'Burns Anxiety Inventory Submission'
      );

      showToast('Form submitted successfully! The completed inventory has been sent via email.', 'success');

      // Reset form
      setTimeout(() => {
        setFormData({
          patientName: '',
          date: new Date().toISOString().split('T')[0],
          signature: '',
          q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
          q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '',
          q21: '', q22: '', q23: '', q24: '', q25: '', q26: '', q27: '', q28: '', q29: '', q30: '',
          q31: '', q32: '', q33: '',
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
  const anxietyLevel = getAnxietyLevel(totalScore);

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/helpfulForms.jpg" />

      <main className={styles.container}>
        <section className={styles.formSection}>
          <h1>Burns Anxiety Inventory</h1>

          <div className={styles.pdfPreview}>
            <p>
              <a href="/forms/burns_anxiety_inventory.pdf" target="_blank" rel="noopener noreferrer">
                View Sample PDF Document
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.consentText}>
              <p>
                <strong>Instructions:</strong> Place a check in the space to the right that best describes how much
                each symptom or problem has bothered you during the <strong>past week</strong>.
              </p>
              <p>
                Rating Scale: 0 = Not at all, 1 = Somewhat, 2 = Moderately, 3 = A lot
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

            {categories.map((category) => (
              <div key={category.name} className={styles.categoryBlock}>
                <h2>{category.name}</h2>
                {category.questions.map((qNum) => {
                  const question = questions[qNum - 1];
                  return (
                    <div key={qNum} className={styles.questionBlock}>
                      <h3>{qNum}. {question.text}</h3>
                      <div className={styles.ratingOptions}>
                        {ratingScale.map((option) => (
                          <div key={option.value} className={styles.radioOption}>
                            <input
                              type="radio"
                              id={`q${qNum}_${option.value}`}
                              name={`q${qNum}`}
                              value={option.value}
                              checked={formData[`q${qNum}` as keyof FormData] === option.value}
                              onChange={() => handleRadioChange(`q${qNum}`, option.value)}
                              required
                            />
                            <label htmlFor={`q${qNum}_${option.value}`}>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {totalScore > 0 && (
                  <div className={styles.subtotalDisplay}>
                    <strong>{category.name} Subtotal:</strong> {getCategoryScore(category.questions)}
                  </div>
                )}
              </div>
            ))}

            {totalScore > 0 && (
              <div className={styles.scoreDisplay}>
                <h3>Total Score: {totalScore}</h3>
                <p><strong>Interpretation:</strong> {anxietyLevel}</p>
                <div className={styles.scoreGuide}>
                  <p><strong>Score Guide:</strong></p>
                  <ul>
                    <li>0-4: Minimal or No Anxiety</li>
                    <li>5-9: Borderline Anxiety</li>
                    <li>10-14: Mild Anxiety</li>
                    <li>15-19: Moderate Anxiety</li>
                    <li>20-24: Severe Anxiety</li>
                    <li>25-99: Extreme Anxiety or Panic</li>
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
                  'Submit Burns Anxiety Inventory'
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

export default BurnsAnxietyForm;
