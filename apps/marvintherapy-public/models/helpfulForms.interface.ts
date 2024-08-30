export const HELPFUL_FORMS = {
  text:
    "If you're a new client, please complete the following forms and bring them to your " +
    'first therapy session.',
  forms: [
    {
      text: 'Intake / Consent',
      formDetails: [
        {
          text: 'HIPAA Consent',
          href: '/forms/consentToTxAndHippa.pdf',
        },
        {
          text: 'Client Psychotherapy Intake Form',
          href: '/forms/ClientIntake.pdf',
        },
        {
          text: 'Limits of Confidentiality/Therapy Cancellation Policy',
          href: '/forms/ConfidentialityAndCancellationPolicy.pdf',
        },
        {
          text: 'Authorization Form',
          href: '/forms/Authorization.pdf',
        },
        {
          text: 'Beck Depression Inventory',
          href: '/forms/Beck_Depression_Inventory.pdf',
        },
        {
          text: 'Burns Anxiety Inventory',
          href: '/forms/burns_anxiety_inventory.pdf',
        },
        {
          text: 'No Harm Contract',
          href: '/forms/NoHarmContract.pdf',
        },
        {
          text: 'Non Subpoena',
          href: '/forms/SampleNonSubpoenaKirstin.pdf',
        },
        {
          text: 'Insurance Responsibility',
          href: '/forms/Responsibility to know your Insurance__regulations_guidelines.pdf',
        },
        {
          text: 'Telehealth Informed Consent',
          href: '/forms/TelehealthInformedConsent.pdf',
        }
      ],
    },
    {
      text: 'PQRS',
      formDetails: [    
        {
          text: 'Medication Flowsheet',
          href: '/forms/MedicationFlowsheet_Word.pdf',
        },
        {
          text: 'Medical Record Summary',
          href: '/forms/MedicalRecordSummary.pdf',
        },
      ],
    },
    {
      text: 'For Providers',
      formDetails: [
        {
          text: 'Referral Form',
          href: '/forms/ReferralForm.pdf',
        },
      ],
    },
  ],
  coordinateCare: {
    text:
      'If you would like me to coordinate care with another provider (for example, your psychiatrist, ' +
      'primary care physician, etc.), complete this form to authorize release of psychotherapy information:',
    form: {
      text: 'Authorization to Disclose Information Form (PDF hyperlink)',
      href: '/forms/consentToTxAndHippa.pdf',
    },
  },
  pdfLink: {
    text: 'Note: To download Adobe Acrobat Reader for free, ',
    link: {
      text: 'click here.',
      href: 'http://get.adobe.com/reader/',
    },
  },
};
