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

export type HowCanIHelp = CardProps & {
  ways: string[];
};
