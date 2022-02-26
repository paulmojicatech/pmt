import Card from '@mui/material/Card';
import {
  ClinicalTherapy,
  IndividualsCouplesTherapy,
  PartialServiceCardProp,
  ServiceCardProp,
} from './models/card.interface';
import CardContent from '@mui/material/CardContent';
import Typeography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { ServiceType } from '../../models/services.interface';
import styles from './card.module.scss';

export const PmtCard = (props: ServiceCardProp) => {
  if ((props as PartialServiceCardProp)?.cardActionRoute) {
    return (
      <Card sx={{ width: '30%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {props.cardTitle}
          </Typeography>
          <Typeography>
            {props.cardDescription.substring(0, 250)}...
          </Typeography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={(props as PartialServiceCardProp).cardActionRoute}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  } else if (props.type === ServiceType.CLINICAL_SUPERVISION) {
    return (
      <Card sx={{ width: '75%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {props.cardTitle}
          </Typeography>
          <Typeography className={styles.descriptionContainer}>
            {props.cardDescription}
          </Typeography>
          <Typeography>
            {(props as ClinicalTherapy).supervisionTypes.title}
          </Typeography>
          <ul className={styles.listContainer}>
            {(props as ClinicalTherapy).supervisionTypes.items.map(
              (item, index) => {
                return <li key={index}>{item}</li>;
              }
            )}
          </ul>
        </CardContent>
      </Card>
    );
  } else if (props.type === ServiceType.INDIVIDUAL_COUPLE) {
    return (
      <Card sx={{ width: '75%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {props.cardTitle}
          </Typeography>
          <Typeography className={styles.descriptionContainer}>
            {props.cardDescription}
          </Typeography>
          <Typeography>
            {(props as IndividualsCouplesTherapy)?.treatments?.title}
          </Typeography>
          <ul className={styles.listContainer}>
            {(
              props as IndividualsCouplesTherapy
            ).treatments.typesOfTreatments.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <Typeography>
            {(props as IndividualsCouplesTherapy).summary}
          </Typeography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card sx={{ width: '75%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {props.cardTitle}
          </Typeography>
          <Typeography>{props.cardDescription}</Typeography>
        </CardContent>
      </Card>
    );
  }
};

export default PmtCard;
