import PmtHeader from '../../components/header/header';
import { Fragment } from 'react';
import styles from './privacy.module.scss';
import PmtFooter from '../../components/footer/footer';
import { PRIVACY_MODEL } from '../../models/privacy.interface';

export const Privacy = () => {
  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/privacy.jpg" />
      <main className={styles.container}>
        <h3>{`Confidentiality & Privacy Policy`}</h3>
        <p>{PRIVACY_MODEL.text}</p>
        <div className={styles.exceptionContainer}>
          <div className={styles.exceptionHeader}>
            {PRIVACY_MODEL.exceptions.text}
          </div>
          <ul>
            {PRIVACY_MODEL.exceptions.bulletPoints.map((point, index) => {
              return <li key={`bp_${index}`}>{point}</li>;
            })}
          </ul>
        </div>
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Privacy;
