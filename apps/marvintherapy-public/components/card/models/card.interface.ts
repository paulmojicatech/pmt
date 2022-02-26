import { ServiceType } from '../../../models/services.interface';

export type ServiceCardProp = {
  type: ServiceType;
  cardTitle: string;
  cardDescription: string;
};

export type PartialServiceCardProp = ServiceCardProp & {
  cardActionRoute: string;
};

export type IndividualsCouplesTherapy = ServiceCardProp & {
  type: ServiceType;
  treatments: {
    title: string;
    typesOfTreatments: string[];
  };
  summary: string;
};

export type ClinicalTherapy = ServiceCardProp & {
  supervisionTypes: {
    title: string;
    items: string[];
  };
  summary: string;
};
