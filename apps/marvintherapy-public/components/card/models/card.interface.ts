import { ServiceType } from '../../../models/services.interface';

export type IndividualsCouplesTherapy = {
  type: ServiceType;
  isPartial: boolean;
  cardTitle: string;
  cardDescription: string;
  treatments: {
    title: string;
    typesOfTreatments: string[];
  };
  summary: string;
};

export type ClinicalTherapy = Omit<IndividualsCouplesTherapy, 'treatments'> & {
  supervisionTypes: {
    title: string;
    items: string[];
  };
};

export type ServiceCardProps = Omit<
  IndividualsCouplesTherapy,
  'treatments' | 'summary'
>;
