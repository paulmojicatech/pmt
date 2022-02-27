import { CardType } from '../../../models/services.interface';

export type CardProps = {
  type: CardType;
  cardTitle: string;
  cardDescription: string;
};

export type PartialServiceCardProp = CardProps & {
  cardActionRoute: string;
};

export type IndividualsCouplesTherapy = CardProps & {
  type: CardType;
  treatments: {
    title: string;
    typesOfTreatments: string[];
  };
  summary: string;
};

export type ClinicalTherapy = CardProps & {
  supervisionTypes: {
    title: string;
    items: string[];
  };
  summary: string;
};

export type HowCanItHelp = CardProps & {
  ways: string[];
};

export type DoYouTakeInsurance = CardProps & {
  acceptedInsurances: {
    header: string;
    plans: string[];
  };
};

export type IsItConfidential = CardProps & {
  bulletPoints: string[];
};
