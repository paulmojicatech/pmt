import Card from '@mui/material/Card';
import {
  ClinicalTherapy,
  IndividualsCouplesTherapy,
  PartialServiceCardProp,
  CardProps,
} from './models/card.interface';
import CardContent from '@mui/material/CardContent';
import Typeography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardType } from '../../models/services.interface';
import styles from './card.module.scss';
import { Fragment } from 'react';

export const PmtCard = (props: CardProps) => {
  if ((props as PartialServiceCardProp)?.cardActionRoute) {
    return (
      <Fragment>
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

            <CardActions>
              <Button
                size="small"
                href={(props as PartialServiceCardProp).cardActionRoute}
              >
                Learn More
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Card sx={{ width: '75%' }}>
          <CardContent>
            <Typeography
              gutterBottom
              sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
            >
              {props.cardTitle}
            </Typeography>
            <Typeography>{props.cardDescription}</Typeography>
            {props.type === CardType.CLINICAL_SUPERVISION && (
              <Fragment>
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
              </Fragment>
            )}
            {props.type === CardType.INDIVIDUAL_COUPLE && (
              <Fragment>
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
              </Fragment>
            )}
            {props.type === CardType.TELEHEALTH && (
              <Typeography>{props.cardDescription}</Typeography>
            )}
          </CardContent>
        </Card>
      </Fragment>
    );
  }
};

export default PmtCard;
