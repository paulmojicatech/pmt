import { Fragment } from 'react';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import styles from './rates.module.scss';
import { RATES } from '../../models/rates.interface';

export const Rates = () => {
  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/rates.jpg" />

      <main className={styles.container}>
        <section className={styles.ratesContainer}>
          <h3>{RATES.header}</h3>
          <span>{RATES.text}</span>
        </section>

        <section className={styles.insuranceContainer}>
          <h3>{RATES.insurance.header}</h3>
          <ul>
            {RATES.insurance.acceptedInsurances.plans.map(
              (insurance, index) => {
                return <li key={'i_' + index}>{insurance}</li>;
              }
            )}
          </ul>
        </section>

        <section>
          <span>{RATES.insurance.questions.text}</span>
          <ul>
            {RATES.insurance.questions.question.map((q, index) => {
              return <li key={'q_' + index}>{q}</li>;
            })}
          </ul>
        </section>

        <section>
          <h3>{RATES.reducedFee.header}</h3>
          <span>{RATES.reducedFee.text}</span>
        </section>

        <section>
          <h3>{RATES.typesOfSessions.header}</h3>
          <span>{RATES.typesOfSessions.text}</span>
        </section>

        <section>
          <h3>{RATES.contact.header}</h3>
          <a href={RATES.contact.text.link.href}>{RATES.contact.text.text}</a>
        </section>
      </main>

      <PmtFooter />
    </Fragment>
  );
};

export default Rates;
