export const RATES = {
  header: 'Rates',
  text: '$125 per 50-minute session',
  insurance: {
    header: 'Insurance',
    acceptedInsurances: {
      header: 'Accepted Insurance Plans',
      plans: [
        'APS Healthcare',
        'BlueCross and BlueShield',
        'Cigna',
        'Cigna EAP',
        'McLaughlin Young EAP',
        'Medicare',
        'Multiplan',
        'Open Path',
        'Optum Behavioral Health',
        'PHCS',
        'United Health Care',
        'Out of Network',
      ],
    },
    questions: {
      text: `If you’re looking to peruse insurance reimbursement please check your coverage
        'carefully by asking your health insurance carrier the following questions: `,
      question: [
        'Do I have mental health insurance benefits?',
        'How much does my insurance pay for an out-of-network mental health provider (LCSW)?',
        'What is my deductible and has it been met?',
        'How many sessions per year does my health insurance cover?',
        'What is the coverage amount per therapy session with an out of network provider?',
        'Is approval required from my primary care physician?',
      ],
    },
  },
  reducedFee: {
    header: 'Reduced Fee',
    text: 'Reduced fee services are available on a limited basis.',
  },
  typesOfSessions: {
    header: 'Telephone/Facetime Online Sessions',
    text: `Phone and Facetime sessions are also available for clients who are moving,
      'deploying or unable to be present during session.`,
  },
  payment: {
    header: 'Payment',
    text: 'Cash, check and all major credit cards accepted for payment.',
  },
  cancellationPolicy: {
    header: 'Cancellation Policy',
    text: `If you do not show up for your scheduled therapy appointment, and you have 
      'not notified us at least 24 hours in advance, you will be required to pay the full cost of the session.`,
  },
  scheduleOnline: {
    header: 'Schedule Online',
    text: {
      text: 'Request a therapy appointment online ',
      link: {
        href: '/appointments',
        text: 'here',
      },
    },
  },
  contact: {
    header: 'Contact',
    text: {
      text: 'Questions? Please contact me for further information.',
      link: {
        href: '/contact',
      },
    },
  },
};
