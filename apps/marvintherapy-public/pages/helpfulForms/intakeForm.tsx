import { Fragment, useState } from 'react';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './intakeForm.module.scss';
import { PDFDocument, rgb } from 'pdf-lib';
import { EmailService } from '../../utils/email.service';

interface IntakeFormData {
  // Page 1 - Personal Information
  lastName: string;
  firstName: string;
  middleInitial: string;
  parentGuardianLastName: string;
  parentGuardianFirstName: string;
  parentGuardianMiddleInitial: string;
  birthDate: string;
  age: string;
  gender: string;
  maritalStatus: string;
  children: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  homePhone: string;
  homePhoneMessage: string;
  cellPhone: string;
  cellPhoneMessage: string;
  textPermission: string;
  email: string;
  referredBy: string;
  previousMentalHealthServices: string;
  previousTherapist: string;

  // Page 2 - Health Information
  currentMedication: string;
  medicationList: string;
  previousPsychiatricMedication: string;
  previousMedicationList: string;
  physicalHealth: string;
  healthProblems: string;
  sleepingHabits: string;
  sleepProblems: string;
  exerciseFrequency: string;
  exerciseType: string;
  appetiteDifficulties: string;
  sadnessDepression: string;
  sadnessDuration: string;
  anxietyPanic: string;
  anxietyStart: string;

  // Page 3 - Additional Health & History
  chronicPain: string;
  chronicPainDescription: string;
  alcoholUse: string;
  drugUse: string;
  romanticRelationship: string;
  relationshipDuration: string;
  relationshipRating: string;
  significantLifeChanges: string;

  // Family Mental Health History
  alcoholSubstanceAbuse: string;
  anxiety: string;
  depression: string;
  domesticViolence: string;
  eatingDisorders: string;
  obesity: string;
  obsessiveCompulsiveBehavior: string;
  schizophrenia: string;
  suicideAttempts: string;

  // Page 4 - Additional Information
  currentlyEmployed: string;
  employmentSituation: string;
  workEnjoyment: string;
  spiritualReligious: string;
  faithBelief: string;
  strengths: string;
  weaknesses: string;
  therapyGoals: string;
}

export const IntakeForm = () => {
  const [formData, setFormData] = useState<IntakeFormData>({
    lastName: '',
    firstName: '',
    middleInitial: '',
    parentGuardianLastName: '',
    parentGuardianFirstName: '',
    parentGuardianMiddleInitial: '',
    birthDate: '',
    age: '',
    gender: '',
    maritalStatus: '',
    children: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    homePhone: '',
    homePhoneMessage: '',
    cellPhone: '',
    cellPhoneMessage: '',
    textPermission: '',
    email: '',
    referredBy: '',
    previousMentalHealthServices: '',
    previousTherapist: '',
    currentMedication: '',
    medicationList: '',
    previousPsychiatricMedication: '',
    previousMedicationList: '',
    physicalHealth: '',
    healthProblems: '',
    sleepingHabits: '',
    sleepProblems: '',
    exerciseFrequency: '',
    exerciseType: '',
    appetiteDifficulties: '',
    sadnessDepression: '',
    sadnessDuration: '',
    anxietyPanic: '',
    anxietyStart: '',
    chronicPain: '',
    chronicPainDescription: '',
    alcoholUse: '',
    drugUse: '',
    romanticRelationship: '',
    relationshipDuration: '',
    relationshipRating: '',
    significantLifeChanges: '',
    alcoholSubstanceAbuse: '',
    anxiety: '',
    depression: '',
    domesticViolence: '',
    eatingDisorders: '',
    obesity: '',
    obsessiveCompulsiveBehavior: '',
    schizophrenia: '',
    suicideAttempts: '',
    currentlyEmployed: '',
    employmentSituation: '',
    workEnjoyment: '',
    spiritualReligious: '',
    faithBelief: '',
    strengths: '',
    weaknesses: '',
    therapyGoals: '',
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

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const helvetica = await pdfDoc.embedFont('Helvetica');
      const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

      // Add pages
      const page1 = pdfDoc.addPage([612, 792]);
      const page2 = pdfDoc.addPage([612, 792]);
      const page3 = pdfDoc.addPage([612, 792]);
      const page4 = pdfDoc.addPage([612, 792]);

      const { width, height } = page1.getSize();
      let yPos = height - 50;

      // Helper function to draw wrapped text
      const drawWrappedText = (page: any, text: string, x: number, y: number, maxWidth: number, fontSize: number, font: any) => {
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

      // PAGE 1 - Personal Information
      page1.drawText('INTAKE FORM', {
        x: width / 2 - 80,
        y: yPos,
        size: 18,
        font: helveticaBold,
      });

      yPos -= 40;

      page1.drawText('Please provide the following information and answer the questions below. Please note:', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 14;
      page1.drawText('information you provide here is protected as confidential information.', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 14;
      page1.drawText('Please fill out this form and bring it to your first session.', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 30;

      // Name
      page1.drawText('Name:', { x: 60, y: yPos, size: 10, font: helvetica });
      page1.drawText(`${formData.lastName}`, { x: 100, y: yPos - 10, size: 10, font: helvetica });
      page1.drawText(`${formData.firstName}`, { x: 220, y: yPos - 10, size: 10, font: helvetica });
      page1.drawText(`${formData.middleInitial}`, { x: 340, y: yPos - 10, size: 10, font: helvetica });
      yPos -= 15;
      page1.drawText('(Last)', { x: 100, y: yPos, size: 8, font: helvetica });
      page1.drawText('(First)', { x: 220, y: yPos, size: 8, font: helvetica });
      page1.drawText('(Middle Initial)', { x: 320, y: yPos, size: 8, font: helvetica });

      yPos -= 30;

      // Parent/Guardian
      page1.drawText('Name of parent/guardian (if under 18 years):', { x: 60, y: yPos, size: 10, font: helvetica });
      yPos -= 15;
      page1.drawText(`${formData.parentGuardianLastName}`, { x: 100, y: yPos, size: 10, font: helvetica });
      page1.drawText(`${formData.parentGuardianFirstName}`, { x: 220, y: yPos, size: 10, font: helvetica });
      page1.drawText(`${formData.parentGuardianMiddleInitial}`, { x: 340, y: yPos, size: 10, font: helvetica });

      yPos -= 30;

      // Birth Date, Age, Gender
      page1.drawText(`Birth Date: ${formData.birthDate}  Age: ${formData.age}  Gender: ${formData.gender}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 25;

      // Marital Status
      page1.drawText(`Marital Status: ${formData.maritalStatus}`, { x: 60, y: yPos, size: 10, font: helvetica });

      yPos -= 25;

      // Children
      page1.drawText(`Please list any children/age: ${formData.children}`, { x: 60, y: yPos, size: 10, font: helvetica });

      yPos -= 25;

      // Address
      page1.drawText(`Address: ${formData.streetAddress}`, { x: 60, y: yPos, size: 10, font: helvetica });
      yPos -= 15;
      page1.drawText(`${formData.city}, ${formData.state} ${formData.zip}`, { x: 60, y: yPos, size: 10, font: helvetica });

      yPos -= 25;

      // Phone numbers
      page1.drawText(`Home Phone: ${formData.homePhone}  May we leave a message? ${formData.homePhoneMessage}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 20;

      page1.drawText(`Cell/Other Phone: ${formData.cellPhone}  May we leave a message? ${formData.cellPhoneMessage}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 15;

      page1.drawText(`May we text this number? ${formData.textPermission}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 25;

      // Email
      page1.drawText(`E-mail: ${formData.email}`, { x: 60, y: yPos, size: 10, font: helvetica });

      yPos -= 25;

      // Referred by
      page1.drawText(`Referred by (if any): ${formData.referredBy}`, { x: 60, y: yPos, size: 10, font: helvetica });

      yPos -= 30;

      // Previous mental health services
      page1.drawText('Have you previously received any type of mental health services (psychotherapy, psychiatric', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 14;
      page1.drawText(`services, etc.)? ${formData.previousMentalHealthServices}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      page1.drawText(`Previous therapist/practitioner: ${formData.previousTherapist}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      // PAGE 2 - Health Information
      yPos = height - 50;

      page2.drawText(`Are you currently taking any prescription medication? ${formData.currentMedication}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.medicationList) {
        yPos = drawWrappedText(page2, `Please list: ${formData.medicationList}`, 60, yPos, width - 120, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      page2.drawText(`Have you ever been prescribed psychiatric medication? ${formData.previousPsychiatricMedication}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.previousMedicationList) {
        yPos = drawWrappedText(page2, `Please list and provide dates: ${formData.previousMedicationList}`, 60, yPos, width - 120, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 30;

      page2.drawText('GENERAL HEALTH AND MENTAL HEALTH INFORMATION', {
        x: 60,
        y: yPos,
        size: 11,
        font: helveticaBold,
      });

      yPos -= 25;

      page2.drawText('1. How would you rate your current physical health? (please circle)', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 15;
      page2.drawText(`${formData.physicalHealth}`, { x: 80, y: yPos, size: 10, font: helveticaBold });
      yPos -= 20;
      if (formData.healthProblems) {
        yPos = drawWrappedText(page2, `Please list any specific health problems: ${formData.healthProblems}`, 80, yPos, width - 140, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      page2.drawText('2. How would you rate your current sleeping habits? (please circle)', {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 15;
      page2.drawText(`${formData.sleepingHabits}`, { x: 80, y: yPos, size: 10, font: helveticaBold });
      yPos -= 20;
      if (formData.sleepProblems) {
        yPos = drawWrappedText(page2, `Please list any specific sleep problems: ${formData.sleepProblems}`, 80, yPos, width - 140, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      page2.drawText(`3. How many times per week do you generally exercise? ${formData.exerciseFrequency}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      page2.drawText(`What type of exercise: ${formData.exerciseType}`, {
        x: 80,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 25;

      yPos = drawWrappedText(page2, `4. Please list any difficulties you experience with your appetite or eating patterns: ${formData.appetiteDifficulties}`, 60, yPos, width - 120, 10, helvetica);

      yPos -= 25;

      page2.drawText(`5. Are you currently experiencing overwhelming sadness, grief or depression? ${formData.sadnessDepression}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.sadnessDuration) {
        page2.drawText(`If yes, for approximately how long? ${formData.sadnessDuration}`, {
          x: 80,
          y: yPos,
          size: 10,
          font: helvetica,
        });
        yPos -= 15;
      }

      // PAGE 3 - Additional Health & History
      yPos = height - 50;

      page3.drawText(`6. Are you currently experiencing anxiety, panic attacks or have any phobias? ${formData.anxietyPanic}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.anxietyStart) {
        page3.drawText(`If yes, when did you begin experiencing this? ${formData.anxietyStart}`, {
          x: 80,
          y: yPos,
          size: 10,
          font: helvetica,
        });
        yPos -= 15;
      }

      yPos -= 25;

      page3.drawText(`7. Are you currently experiencing any chronic pain? ${formData.chronicPain}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.chronicPainDescription) {
        yPos = drawWrappedText(page3, `If yes, please describe: ${formData.chronicPainDescription}`, 80, yPos, width - 140, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      page3.drawText(`8. Do you drink alcohol more than once a week? ${formData.alcoholUse}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 25;

      page3.drawText(`9. How often do you engage recreational drug use? ${formData.drugUse}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });

      yPos -= 25;

      page3.drawText(`10. Are you currently in a romantic relationship? ${formData.romanticRelationship}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.relationshipDuration) {
        page3.drawText(`If yes, for how long? ${formData.relationshipDuration}`, {
          x: 80,
          y: yPos,
          size: 10,
          font: helvetica,
        });
        yPos -= 15;
      }
      if (formData.relationshipRating) {
        page3.drawText(`On a scale of 1-10, how would you rate your relationship? ${formData.relationshipRating}`, {
          x: 80,
          y: yPos,
          size: 10,
          font: helvetica,
        });
        yPos -= 15;
      }

      yPos -= 25;

      yPos = drawWrappedText(page3, `11. What significant life changes or stressful events have you experienced recently: ${formData.significantLifeChanges}`, 60, yPos, width - 120, 10, helvetica);

      yPos -= 30;

      page3.drawText('FAMILY MENTAL HEALTH HISTORY:', {
        x: 60,
        y: yPos,
        size: 11,
        font: helveticaBold,
      });

      yPos -= 20;

      const familyHistory = [
        `Alcohol/Substance Abuse: ${formData.alcoholSubstanceAbuse}`,
        `Anxiety: ${formData.anxiety}`,
        `Depression: ${formData.depression}`,
        `Domestic Violence: ${formData.domesticViolence}`,
        `Eating Disorders: ${formData.eatingDisorders}`,
        `Obesity: ${formData.obesity}`,
        `Obsessive Compulsive Behavior: ${formData.obsessiveCompulsiveBehavior}`,
        `Schizophrenia: ${formData.schizophrenia}`,
        `Suicide Attempts: ${formData.suicideAttempts}`,
      ];

      for (const item of familyHistory) {
        page3.drawText(item, { x: 60, y: yPos, size: 9, font: helvetica });
        yPos -= 14;
      }

      // PAGE 4 - Additional Information
      yPos = height - 50;

      page4.drawText('ADDITIONAL INFORMATION:', {
        x: 60,
        y: yPos,
        size: 11,
        font: helveticaBold,
      });

      yPos -= 25;

      page4.drawText(`1. Are you currently employed? ${formData.currentlyEmployed}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.employmentSituation) {
        yPos = drawWrappedText(page4, `If yes, what is your current employment situation: ${formData.employmentSituation}`, 80, yPos, width - 140, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      if (formData.workEnjoyment) {
        yPos = drawWrappedText(page4, `Do you enjoy your work? Is there anything stressful about your current work? ${formData.workEnjoyment}`, 60, yPos, width - 120, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      page4.drawText(`2. Do you consider yourself to be spiritual or religious? ${formData.spiritualReligious}`, {
        x: 60,
        y: yPos,
        size: 10,
        font: helvetica,
      });
      yPos -= 20;
      if (formData.faithBelief) {
        yPos = drawWrappedText(page4, `If yes, describe your faith or belief: ${formData.faithBelief}`, 80, yPos, width - 140, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      if (formData.strengths) {
        yPos = drawWrappedText(page4, `3. What do you consider to be some of your strengths? ${formData.strengths}`, 60, yPos, width - 120, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      if (formData.weaknesses) {
        yPos = drawWrappedText(page4, `4. What do you consider to be some of your weaknesses? ${formData.weaknesses}`, 60, yPos, width - 120, 10, helvetica);
        yPos -= 10;
      }

      yPos -= 25;

      if (formData.therapyGoals) {
        yPos = drawWrappedText(page4, `5. What would you like to accomplish out of your time in therapy? ${formData.therapyGoals}`, 60, yPos, width - 120, 10, helvetica);
      }

      // Save and send PDF
      const pdfBytes = await pdfDoc.save();

      const emailService = new EmailService();
      await emailService.sendSignedForm(
        `${formData.firstName} ${formData.lastName}` || 'Client',
        pdfBytes,
        'Intake Form Submission'
      );

      showToast('Intake form submitted successfully! The form has been sent via email.', 'success');

      // Reset form after a delay
      setTimeout(() => {
        window.location.reload();
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
          <h1>INTAKE FORM</h1>

          <div className={styles.notice}>
            <p>
              Please provide the following information and answer the questions below. Please note:
              information you provide here is protected as confidential information.
            </p>
            <p>Please fill out this form and bring it to your first session.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Page 1 - Personal Information */}
            <h2>Personal Information</h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="middleInitial">Middle Initial</label>
                <input
                  type="text"
                  id="middleInitial"
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleInputChange}
                  maxLength={1}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Name of parent/guardian (if under 18 years)</label>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="parentGuardianLastName"
                  placeholder="Last"
                  value={formData.parentGuardianLastName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="parentGuardianFirstName"
                  placeholder="First"
                  value={formData.parentGuardianFirstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="parentGuardianMiddleInitial"
                  placeholder="M.I."
                  value={formData.parentGuardianMiddleInitial}
                  onChange={handleInputChange}
                  maxLength={1}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="birthDate">Birth Date *</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age *</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender *</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Marital Status *</label>
              <div className={styles.radioGroup}>
                {['Never Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed'].map((status) => (
                  <label key={status} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={status}
                      checked={formData.maritalStatus === status}
                      onChange={() => handleRadioChange('maritalStatus', status)}
                      required
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="children">Please list any children/age</label>
              <input
                type="text"
                id="children"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="streetAddress">Address (Street and Number) *</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  maxLength={2}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zip">Zip *</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="homePhone">Home Phone</label>
                <input
                  type="tel"
                  id="homePhone"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>May we leave a message?</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="homePhoneMessage"
                      value="Yes"
                      checked={formData.homePhoneMessage === 'Yes'}
                      onChange={() => handleRadioChange('homePhoneMessage', 'Yes')}
                    />
                    Yes
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="homePhoneMessage"
                      value="No"
                      checked={formData.homePhoneMessage === 'No'}
                      onChange={() => handleRadioChange('homePhoneMessage', 'No')}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="cellPhone">Cell/Other Phone *</label>
                <input
                  type="tel"
                  id="cellPhone"
                  name="cellPhone"
                  value={formData.cellPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>May we leave a message?</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="cellPhoneMessage"
                      value="Yes"
                      checked={formData.cellPhoneMessage === 'Yes'}
                      onChange={() => handleRadioChange('cellPhoneMessage', 'Yes')}
                    />
                    Yes
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="cellPhoneMessage"
                      value="No"
                      checked={formData.cellPhoneMessage === 'No'}
                      onChange={() => handleRadioChange('cellPhoneMessage', 'No')}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>May we text this number?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="textPermission"
                    value="Yes"
                    checked={formData.textPermission === 'Yes'}
                    onChange={() => handleRadioChange('textPermission', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="textPermission"
                    value="No"
                    checked={formData.textPermission === 'No'}
                    onChange={() => handleRadioChange('textPermission', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="referredBy">Referred by (if any)</label>
              <input
                type="text"
                id="referredBy"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Have you previously received any type of mental health services?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousMentalHealthServices"
                    value="Yes"
                    checked={formData.previousMentalHealthServices === 'Yes'}
                    onChange={() => handleRadioChange('previousMentalHealthServices', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousMentalHealthServices"
                    value="No"
                    checked={formData.previousMentalHealthServices === 'No'}
                    onChange={() => handleRadioChange('previousMentalHealthServices', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.previousMentalHealthServices === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="previousTherapist">Previous therapist/practitioner</label>
                <input
                  type="text"
                  id="previousTherapist"
                  name="previousTherapist"
                  value={formData.previousTherapist}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <hr className={styles.pageDivider} />

            {/* Page 2 - Health Information */}
            <h2>Health Information</h2>

            <div className={styles.formGroup}>
              <label>Are you currently taking any prescription medication?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="currentMedication"
                    value="Yes"
                    checked={formData.currentMedication === 'Yes'}
                    onChange={() => handleRadioChange('currentMedication', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="currentMedication"
                    value="No"
                    checked={formData.currentMedication === 'No'}
                    onChange={() => handleRadioChange('currentMedication', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.currentMedication === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="medicationList">Please list:</label>
                <textarea
                  id="medicationList"
                  name="medicationList"
                  value={formData.medicationList}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Have you ever been prescribed psychiatric medication?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousPsychiatricMedication"
                    value="Yes"
                    checked={formData.previousPsychiatricMedication === 'Yes'}
                    onChange={() => handleRadioChange('previousPsychiatricMedication', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousPsychiatricMedication"
                    value="No"
                    checked={formData.previousPsychiatricMedication === 'No'}
                    onChange={() => handleRadioChange('previousPsychiatricMedication', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.previousPsychiatricMedication === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="previousMedicationList">Please list and provide dates:</label>
                <textarea
                  id="previousMedicationList"
                  name="previousMedicationList"
                  value={formData.previousMedicationList}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            )}

            <h3>GENERAL HEALTH AND MENTAL HEALTH INFORMATION</h3>

            <div className={styles.formGroup}>
              <label>1. How would you rate your current physical health?</label>
              <div className={styles.radioGroup}>
                {['Poor', 'Unsatisfactory', 'Satisfactory', 'Good', 'Very good'].map((rating) => (
                  <label key={rating} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="physicalHealth"
                      value={rating}
                      checked={formData.physicalHealth === rating}
                      onChange={() => handleRadioChange('physicalHealth', rating)}
                    />
                    {rating}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="healthProblems">Please list any specific health problems you are currently experiencing:</label>
              <textarea
                id="healthProblems"
                name="healthProblems"
                value={formData.healthProblems}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label>2. How would you rate your current sleeping habits?</label>
              <div className={styles.radioGroup}>
                {['Poor', 'Unsatisfactory', 'Satisfactory', 'Good', 'Very good'].map((rating) => (
                  <label key={rating} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="sleepingHabits"
                      value={rating}
                      checked={formData.sleepingHabits === rating}
                      onChange={() => handleRadioChange('sleepingHabits', rating)}
                    />
                    {rating}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sleepProblems">Please list any specific sleep problems you are currently experiencing:</label>
              <textarea
                id="sleepProblems"
                name="sleepProblems"
                value={formData.sleepProblems}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="exerciseFrequency">3. How many times per week do you generally exercise?</label>
              <input
                type="text"
                id="exerciseFrequency"
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="exerciseType">What type of exercise do you participate in?</label>
              <input
                type="text"
                id="exerciseType"
                name="exerciseType"
                value={formData.exerciseType}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="appetiteDifficulties">4. Please list any difficulties you experience with your appetite or eating patterns</label>
              <textarea
                id="appetiteDifficulties"
                name="appetiteDifficulties"
                value={formData.appetiteDifficulties}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className={styles.formGroup}>
              <label>5. Are you currently experiencing overwhelming sadness, grief or depression?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sadnessDepression"
                    value="Yes"
                    checked={formData.sadnessDepression === 'Yes'}
                    onChange={() => handleRadioChange('sadnessDepression', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sadnessDepression"
                    value="No"
                    checked={formData.sadnessDepression === 'No'}
                    onChange={() => handleRadioChange('sadnessDepression', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.sadnessDepression === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="sadnessDuration">If yes, for approximately how long?</label>
                <input
                  type="text"
                  id="sadnessDuration"
                  name="sadnessDuration"
                  value={formData.sadnessDuration}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <hr className={styles.pageDivider} />

            {/* Page 3 - Additional Health & History */}
            <h2>Additional Health Information</h2>

            <div className={styles.formGroup}>
              <label>6. Are you currently experiencing anxiety, panic attacks or have any phobias?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="anxietyPanic"
                    value="Yes"
                    checked={formData.anxietyPanic === 'Yes'}
                    onChange={() => handleRadioChange('anxietyPanic', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="anxietyPanic"
                    value="No"
                    checked={formData.anxietyPanic === 'No'}
                    onChange={() => handleRadioChange('anxietyPanic', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.anxietyPanic === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="anxietyStart">If yes, when did you begin experiencing this?</label>
                <input
                  type="text"
                  id="anxietyStart"
                  name="anxietyStart"
                  value={formData.anxietyStart}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>7. Are you currently experiencing any chronic pain?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="chronicPain"
                    value="Yes"
                    checked={formData.chronicPain === 'Yes'}
                    onChange={() => handleRadioChange('chronicPain', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="chronicPain"
                    value="No"
                    checked={formData.chronicPain === 'No'}
                    onChange={() => handleRadioChange('chronicPain', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.chronicPain === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="chronicPainDescription">If yes, please describe</label>
                <textarea
                  id="chronicPainDescription"
                  name="chronicPainDescription"
                  value={formData.chronicPainDescription}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>8. Do you drink alcohol more than once a week?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="alcoholUse"
                    value="Yes"
                    checked={formData.alcoholUse === 'Yes'}
                    onChange={() => handleRadioChange('alcoholUse', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="alcoholUse"
                    value="No"
                    checked={formData.alcoholUse === 'No'}
                    onChange={() => handleRadioChange('alcoholUse', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="drugUse">9. How often do you engage recreational drug use?</label>
              <select
                id="drugUse"
                name="drugUse"
                value={formData.drugUse}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="Never">Never</option>
                <option value="Infrequently">Infrequently</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>10. Are you currently in a romantic relationship?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="romanticRelationship"
                    value="Yes"
                    checked={formData.romanticRelationship === 'Yes'}
                    onChange={() => handleRadioChange('romanticRelationship', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="romanticRelationship"
                    value="No"
                    checked={formData.romanticRelationship === 'No'}
                    onChange={() => handleRadioChange('romanticRelationship', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.romanticRelationship === 'Yes' && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="relationshipDuration">If yes, for how long?</label>
                  <input
                    type="text"
                    id="relationshipDuration"
                    name="relationshipDuration"
                    value={formData.relationshipDuration}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="relationshipRating">On a scale of 1-10, how would you rate your relationship?</label>
                  <input
                    type="number"
                    id="relationshipRating"
                    name="relationshipRating"
                    value={formData.relationshipRating}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                  />
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="significantLifeChanges">11. What significant life changes or stressful events have you experienced recently:</label>
              <textarea
                id="significantLifeChanges"
                name="significantLifeChanges"
                value={formData.significantLifeChanges}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <h3>FAMILY MENTAL HEALTH HISTORY</h3>
            <p className={styles.familyHistoryNote}>
              In the section below identify if there is a family history of any of the following. If yes,
              please indicate the family member&rsquo;s relationship to you in the space provided (father,
              grandmother, uncle, etc.).
            </p>

            {[
              { label: 'Alcohol/Substance Abuse', name: 'alcoholSubstanceAbuse' },
              { label: 'Anxiety', name: 'anxiety' },
              { label: 'Depression', name: 'depression' },
              { label: 'Domestic Violence', name: 'domesticViolence' },
              { label: 'Eating Disorders', name: 'eatingDisorders' },
              { label: 'Obesity', name: 'obesity' },
              { label: 'Obsessive Compulsive Behavior', name: 'obsessiveCompulsiveBehavior' },
              { label: 'Schizophrenia', name: 'schizophrenia' },
              { label: 'Suicide Attempts', name: 'suicideAttempts' },
            ].map((item) => (
              <div key={item.name} className={styles.formGroup}>
                <label htmlFor={item.name}>{item.label}</label>
                <input
                  type="text"
                  id={item.name}
                  name={item.name}
                  placeholder="yes/no - List Family Member"
                  value={formData[item.name as keyof IntakeFormData] as string}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <hr className={styles.pageDivider} />

            {/* Page 4 - Additional Information */}
            <h2>Additional Information</h2>

            <div className={styles.formGroup}>
              <label>1. Are you currently employed?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="currentlyEmployed"
                    value="Yes"
                    checked={formData.currentlyEmployed === 'Yes'}
                    onChange={() => handleRadioChange('currentlyEmployed', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="currentlyEmployed"
                    value="No"
                    checked={formData.currentlyEmployed === 'No'}
                    onChange={() => handleRadioChange('currentlyEmployed', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.currentlyEmployed === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="employmentSituation">If yes, what is your current employment situation:</label>
                <textarea
                  id="employmentSituation"
                  name="employmentSituation"
                  value={formData.employmentSituation}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="workEnjoyment">Do you enjoy your work? Is there anything stressful about your current work?</label>
              <textarea
                id="workEnjoyment"
                name="workEnjoyment"
                value={formData.workEnjoyment}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>2. Do you consider yourself to be spiritual or religious?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="spiritualReligious"
                    value="Yes"
                    checked={formData.spiritualReligious === 'Yes'}
                    onChange={() => handleRadioChange('spiritualReligious', 'Yes')}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="spiritualReligious"
                    value="No"
                    checked={formData.spiritualReligious === 'No'}
                    onChange={() => handleRadioChange('spiritualReligious', 'No')}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.spiritualReligious === 'Yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="faithBelief">If yes, describe your faith or belief:</label>
                <textarea
                  id="faithBelief"
                  name="faithBelief"
                  value={formData.faithBelief}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="strengths">3. What do you consider to be some of your strengths?</label>
              <textarea
                id="strengths"
                name="strengths"
                value={formData.strengths}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="weaknesses">4. What do you consider to be some of your weaknesses?</label>
              <textarea
                id="weaknesses"
                name="weaknesses"
                value={formData.weaknesses}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="therapyGoals">5. What would you like to accomplish out of your time in therapy?</label>
              <textarea
                id="therapyGoals"
                name="therapyGoals"
                value={formData.therapyGoals}
                onChange={handleInputChange}
                rows={4}
              />
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
                  'Submit Intake Form'
                )}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                By submitting this form, you acknowledge that the information provided is accurate
                and will be used to assist in your treatment planning.
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

export default IntakeForm;
