import {
  CardProps,
  HowCanItHelp,
} from '../components/card/models/card.interface';
import CardType from './services.interface';

export const COMMON_QUESTIONS_MODEL: CardProps[] = [
  {
    type: CardType.HOW_CAN_IT_HELP,
    cardTitle: 'How can therapy help me?',
    cardDescription:
      'A number of benefits are available from participating in therapy. Therapists can provide support, ' +
      'problem-solving skills, and enhanced coping strategies for issues such as depression, anxiety, ' +
      'relationship troubles, unresolved childhood issues, grief, stress management, body image issues ' +
      'and creative blocks. Many people also find that counselors can be a tremendous asset to managing ' +
      'personal growth, interpersonal relationships, family concerns, marriage issues, and the hassles of ' +
      'daily life. Therapists can provide a fresh perspective on a difficult problem or point you in the ' +
      'direction of a solution. The benefits you obtain from therapy depend on how well you use the process ' +
      'and put into practice what you learn. Some of the benefits available from therapy include: ',
    ways: [
      'Attaining a better understanding of yourself, your goals and values',
      'Developing skills for improving your relationships',
      'Finding resolution to the issues or concerns that led you to seek therapy',
      'Learning new ways to cope with stress and anxiety',
      'Managing anger, grief, depression, and other emotional pressures',
      'Improving communications and listening skills',
      'Changing old behavior patterns and developing new ones',
      'Discovering new ways to solve problems in your family or marriage',
      'Improving your self-esteem and boosting self-confidence',
    ],
  } as HowCanItHelp,
  {
    type: CardType.DO_I_NEED_IT,
    cardTitle: 'Do I really need therapy?  I can usually handle my problems.',
    cardDescription:
      'Everyone goes through challenging situations in life, and while you may have successfully navigated ' +
      "through other difficulties you've faced, there's nothing wrong with seeking out extra support when " +
      'you need it. In fact, therapy is for people who have enough self-awareness to realize they need a helping ' +
      "hand, and that is something to be admired. You are taking responsibility by accepting where you're at in " +
      'life and making a commitment to change the situation by seeking therapy. Therapy provides long-lasting ' +
      'benefits and support, giving you the tools you need to avoid triggers, re-direct damaging patterns, and ' +
      'overcome whatever challenges you face.',
  },
  //   {

  //     title:
  //       'Why do people go to therapy and how do I know if it is right for me?',
  //     text:
  //       'People have many different motivations for coming to psychotherapy.\n' +
  //       'Some may be going through a major life transition (unemployment, divorce, new job, etc.), or are not ' +
  //       'handling stressful circumstances well.  Some people need assistance managing a range of other issues such ' +
  //       'as low self-esteem, depression, anxiety, addictions, relationship problems, spiritual conflicts and creative blocks.' +
  //       'Therapy can help provide some much needed encouragement and help with skills to get them through these periods.  ' +
  //       'Others may be at a point where they are ready to learn more about themselves or want to be more effective with their ' +
  //       'goals in life.   In short, people seeking psychotherapy are ready to meet the challenges in their lives and ready to ' +
  //       'make changes in their lives.',
  //     isActive: false,
  //   },
  //   {
  //     id: 'whatIsTherapyLike',
  //     title: 'What is therapy like?',
  //     text:
  //       'Because each person has different issues and goals for therapy, therapy will be different depending on the individual.  ' +
  //       'In general, you can expect to discuss the current events happening in your life, your personal history relevant to your ' +
  //       'issue, and report progress (or any new insights gained) from the previous therapy session.  Depending on your specific ' +
  //       'needs, therapy can be short-term, for a specific issue, or longer-term, to deal with more difficult patterns or your ' +
  //       'desire for more personal development.  Either way, it is most common to schedule regular sessions with your therapist ' +
  //       '(usually weekly).\n' +
  //       'It is important to understand that you will get more results from therapy if you actively participate in the process.  ' +
  //       'The ultimate purpose of therapy is to help you bring what you learn in session back into your life.  Therefore, beyond ' +
  //       'the work you do in therapy sessions, your therapist may suggest some things you can do outside of therapy to support ' +
  //       'your process - such as reading a pertinent book, journaling on specific topics, noting particular behaviors or taking ' +
  //       'action on your goals. People seeking psychotherapy are ready to make positive changes in their lives, are open to ' +
  //       'new perspectives and take responsibility for their lives.',
  //     isActive: false,
  //   },
  //   {
  //     id: 'medicationVsPsychotherapy',
  //     title: 'What about medication vs. psychotherapy?',
  //     text:
  //       'It is well established that the long-term solution to mental and emotional problems and the pain they cause cannot ' +
  //       'be solved solely by medication. Instead of just treating the symptom, therapy addresses the cause of our distress and ' +
  //       'the behavior patterns that curb our progress. You can best achieve sustainable growth and a greater sense of well-being ' +
  //       "with an integrative approach to wellness.  Working with your medical doctor you can determine what's best for you, " +
  //       'and in some cases a combination of medication and therapy is the right course of action.',
  //     isActive: false,
  //   },
  //   {
  //     id: 'doITakeInsurance',
  //     title: 'Do you take insurance, and how does that work?',
  //     text:
  //       'If you do not see your insurance carrier listed here, many insurance ' +
  //       'companies will reimburse full or partial payments for therapy with an LCSW ' +
  //       'through their “out of network” benefits plan. To determine if you have out of ' +
  //       'network mental health coverage through your insurance carrier, the first thing ' +
  //       'you should do is call them. Check your coverage carefully and make sure you ' +
  //       'understand their answers. Some helpful questions you can ask them: ',
  //     acceptedInsurances: {
  //       header: 'Accepted Insurance Plans: ',
  //       plans: [
  //         'APS Healthcare',
  //         'BlueCross and BlueShield',
  //         'Cigna',
  //         'Cigna EAP',
  //         'McLaughlin Young EAP',
  //         'Medicare',
  //         'Multiplan',
  //         'Open Path',
  //         'Optum Behavioral Health',
  //         'PHCS',
  //         'United Health Care',
  //         'Out of Network',
  //       ],
  //     },
  //     questions: [
  //       'What are my mental health benefits?',
  //       'How many therapy sessions does my plan cover?',
  //       'How much does my insurance pay for an out-of-network provider?',
  //       'What does that mean per therapy session/what is the coverage amount per session of an out of network provider?',
  //       'Is approval required from my primary care physician?',
  //     ],
  //     isActive: false,
  //   },
  //   {
  //     id: 'isItConfidential',
  //     title: 'Does what we talk about in therapy remain confidential?',
  //     text:
  //       'Confidentiality is one of the most important components between a client and psychotherapist. ' +
  //       'Successful therapy requires a high degree of trust with highly sensitive subject matter that is ' +
  //       "usually not discussed anywhere but the therapist's office.   Every therapist should provide a " +
  //       'written copy of their confidential disclosure agreement, and you can expect that what you discuss ' +
  //       'in session will not be shared with anyone.  This is called “Informed Consent”.  Sometimes, however, ' +
  //       'you may want your therapist to share information or give an update to someone on your healthcare ' +
  //       'team (your Physician, Naturopath, Attorney), but by law your therapist cannot release this information ' +
  //       'without obtaining your written permission.\n' +
  //       'However, state law and professional ethics require therapists to maintain confidentiality except for ' +
  //       'the following situations: ',
  //     bulletPoints: [
  //       'Suspected past or present abuse or neglect of children, adults, and elders to the authorities, including Child Protection and law enforcement, based on information provided by the client or collateral sources.',
  //       'If the therapist has reason to suspect the client is seriously in danger of harming him/herself or has threated to harm another person.',
  //     ],
  //     isActive: false,
  //   },
];

export const QUESTIONS = [
  'How can therapy help me?',
  'Do I really need therapy? I can usually handle my problems.',
  'What is therapy like?',
  'What about medication vs. psychotherapy?',
  'Do you take insurance, and how does that work?',
  'Does what we talk about in therapy remain confidential?',
];
