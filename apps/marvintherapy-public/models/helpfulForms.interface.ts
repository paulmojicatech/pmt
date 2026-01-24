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
          href: '/helpfulForms/consentForm',
        },
        {
          text: 'Client Psychotherapy Intake Form',
          href: '/helpfulForms/intakeForm',
        },
        {
          text: 'Limits of Confidentiality/Therapy Cancellation Policy',
          href: '/helpfulForms/limitsOfConfidentiality',
        },
        {
          text: 'Authorization Form',
          href: '/helpfulForms/authorizationForm',
        },
        {
          text: 'Beck Depression Inventory',
          href: '/helpfulForms/beckDepression',
        },
        {
          text: 'Burns Anxiety Inventory',
          href: '/helpfulForms/burnsAnxiety',
        },
        {
          text: 'No Harm Contract',
          href: '/helpfulForms/noHarmForm',
        },
        {
          text: 'Non Subpoena',
          href: '/helpfulForms/nonSubpoenaForm',
        },
        {
          text: 'Insurance Responsibility',
          href: '/helpfulForms/insuranceResponsibility',
        },
        {
          text: 'Telehealth Informed Consent',
          href: '/helpfulForms/telehealthConsent',
        }
      ],
    },
    {
      text: 'PQRS',
      formDetails: [
        {
          text: 'Medication Flowsheet',
          href: '/helpfulForms/medicalFlowsheet',
        },
        {
          text: 'Medical Record Summary',
          href: '/helpfulForms/medicalRecord',
        },
      ],
    },
    {
      text: 'For Providers',
      formDetails: [
        {
          text: 'Referral Form',
          href: '/helpfulForms/referralForm',
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
