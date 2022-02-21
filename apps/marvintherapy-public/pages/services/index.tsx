import PmtHeader from '../../components/header/header';
import PmtCard from '../../components/card/card';
import { Fragment, useState } from 'react';
import { ServiceType } from './models/services.interface';
import {
  CLINICAL_SUPERVISION_DESCRIPTION,
  CLINICAL_SUPERVISION_HEADER,
  INDIVIDUAL_TYPE_DESCRIPTION,
  INDIVIDUAL_TYPE_HEADER,
  TELEHEALTH_DESCRIPTION,
  TELEHEALTH_HEADER,
} from '../../public/content/home-content.const';
import styles from './services.module.scss';
import Button from '@mui/material/Button';

export const Services = () => {
  const [selectedService, setService] = useState({
    cardTitle: CLINICAL_SUPERVISION_HEADER,
    cardDescription: CLINICAL_SUPERVISION_DESCRIPTION,
  });

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/services.jpg" />
      <div className={styles.selectServiceContainer}>
        <Button
          onClick={() =>
            setService({
              cardTitle: CLINICAL_SUPERVISION_HEADER,
              cardDescription: CLINICAL_SUPERVISION_DESCRIPTION,
            })
          }
          size="large"
          variant="text"
        >
          Clinical Supervision
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={() =>
            setService({
              cardTitle: INDIVIDUAL_TYPE_HEADER,
              cardDescription: INDIVIDUAL_TYPE_DESCRIPTION,
            })
          }
        >
          Individual, Marriage / Couple and Family Therapy
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={() =>
            setService({
              cardTitle: TELEHEALTH_HEADER,
              cardDescription: TELEHEALTH_DESCRIPTION,
            })
          }
        >
          Telehealth
        </Button>
      </div>

      <div className={styles.cardContainer}>
        <PmtCard
          isPartial={false}
          cardTitle={selectedService.cardTitle}
          cardDescription={selectedService.cardDescription}
        />
      </div>
    </Fragment>
  );
};
export default Services;
