import Card from '@mui/material/Card';
import { ClinicalTherapy, ServiceCardProps } from './models/card.interface';
import CardContent from '@mui/material/CardContent';
import Typeography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { ServiceType } from '../../pages/services/models/services.interface';
import styles from './card.module.scss';

export const PmtCard = (props: ServiceCardProps) => {
  if (props.isPartial) {
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
          <Button size="small">Learn More</Button>
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
          <p>
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
          </p>
        </CardContent>
      </Card>
    );
  } else if (props.type === ServiceType.INDIVIDUAL_COUPLE) {
    return <div>Indiv Profil</div>;
  } else {
    return <div>Telehealth</div>;
  }
};

export default PmtCard;
