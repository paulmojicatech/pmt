import Card from '@mui/material/Card';
import {
  ClinicalTherapy,
  IndividualsCouplesTherapy,
  PartialServiceCardProp,
  CardProps,
  HowCanItHelp,
  DoYouTakeInsurance,
  IsItConfidential,
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
            {(props.type === CardType.TELEHEALTH ||
              props.type === CardType.WHY_DO_PEOPLE_GO ||
              props.type === CardType.WHAT_IS_IT_LIKE ||
              props.type === CardType.MEDICATION_VS_PSYCHOTHERAPY) && (
              <Typeography>{props.cardDescription}</Typeography>
            )}
            {props.type === CardType.HOW_CAN_IT_HELP && (
              <Fragment>
                <Typeography>{props.cardDescription}</Typeography>
                <ul>
                  {(props as HowCanItHelp)?.ways.map((way, index) => {
                    return <li key={`w_${index}`}>{way}</li>;
                  })}
                </ul>
              </Fragment>
            )}
            {props.type === CardType.DO_YOU_TAKE_INSURANCE && (
              <Fragment>
                <Typeography>{props.cardDescription}</Typeography>
                <Typeography>
                  {(props as DoYouTakeInsurance)?.acceptedInsurances?.header}
                </Typeography>
                <ul>
                  {(props as DoYouTakeInsurance)?.acceptedInsurances?.plans.map(
                    (plan, index) => {
                      return <li key={`p_${index}`}>{plan}</li>;
                    }
                  )}
                </ul>
              </Fragment>
            )}
            {props.type === CardType.IS_IT_CONFIDENTIAL && (
              <Fragment>
                <Typeography>{props.cardDescription}</Typeography>
                <ul>
                  {(props as IsItConfidential).bulletPoints.map(
                    (point, index) => {
                      return <li key={`bp_${index}`}>{point}</li>;
                    }
                  )}
                </ul>
              </Fragment>
            )}
          </CardContent>
        </Card>
      </Fragment>
    );
  }
};

export default PmtCard;
