import PmtHeader from '../../components/header/header';
import PmtCard from '../../components/card/card';
import PmtFooter from '../../components/footer/footer';
import { Fragment, useState } from 'react';
import { ServiceType } from './models/services.interface';
import {
  CLINICAL_SUPERVISION_DESCRIPTION,
  CLINICAL_SUPERVISION_HEADER,
  CLINICAL_SUPERVISION_SUMMARY,
  CLINICAL_SUPERVISION_TYPES,
  INDIVIDUAL_THERAPY_ITEMS,
  INDIVIDUAL_TYPE_DESCRIPTION,
  INDIVIDUAL_TYPE_HEADER,
  TELEHEALTH_DESCRIPTION,
  TELEHEALTH_HEADER,
} from '../../public/content/home-content.const';
import styles from './services.module.scss';
import Button from '@mui/material/Button';
import {
  ClinicalTherapy,
  IndividualsCouplesTherapy,
  ServiceCardProps,
} from '../../components/card/models/card.interface';
import Image from 'next/image';

export const Services = () => {
  const initialState: ServiceCardProps = {
    isPartial: false,
    type: ServiceType.CLINICAL_SUPERVISION,
    cardTitle: CLINICAL_SUPERVISION_HEADER,
    cardDescription: CLINICAL_SUPERVISION_DESCRIPTION,
  };

  const clinicalCard: ClinicalTherapy = {
    ...initialState,
    summary: CLINICAL_SUPERVISION_SUMMARY,
    supervisionTypes: CLINICAL_SUPERVISION_TYPES,
  };

  const individualCard: IndividualsCouplesTherapy = {
    type: ServiceType.INDIVIDUAL_COUPLE,
    isPartial: false,
    cardTitle: INDIVIDUAL_TYPE_HEADER,
    cardDescription: INDIVIDUAL_TYPE_DESCRIPTION,
    treatments: INDIVIDUAL_THERAPY_ITEMS,
    summary: `Kirstin works with a wide range of emotional and behavioral issues that occur throughout the life span. In a comfortable and supportive atmosphere, she offers a highly personalized approach, tailored to each of her clients' individual needs. Phone and video therapy sessions are also available through a HIPAA secured private network for clients who cannot make an in-person appointment.`,
  };

  const telehealthCard: ServiceCardProps = {
    type: ServiceType.TELEHEALTH,
    isPartial: false,
    cardTitle: TELEHEALTH_HEADER,
    cardDescription: TELEHEALTH_DESCRIPTION,
  };

  const [selectedService, setService] = useState(
    clinicalCard as ServiceCardProps
  );

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/services.jpg" />
      <div className={styles.selectServiceContainer}>
        <Button
          onClick={() => setService(clinicalCard)}
          size="large"
          variant="text"
        >
          Clinical Supervision
        </Button>
        <Button
          onClick={() => setService(individualCard)}
          size="large"
          variant="text"
        >
          Individual, Marriage / Couple and Family Therapy
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={() => setService(telehealthCard)}
        >
          Telehealth
        </Button>
      </div>

      <div className={styles.cardContainer}>
        <PmtCard {...selectedService} />
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/images/image_4.jpg"
          alt="Kirstin R. Abraham, LCSW"
          height={350}
          width={285}
        />
      </div>

      <PmtFooter />
    </Fragment>
  );
};
export default Services;
