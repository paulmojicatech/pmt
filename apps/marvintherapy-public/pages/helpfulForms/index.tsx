import PmtHeader from '../../components/header/header';
import { Fragment } from 'react';
import styles from './helpfulForms.module.scss';
import { HELPFUL_FORMS } from '../../models/helpfulForms.interface';
import PmtFooter from '../../components/footer/footer';
export const HelpfulForms = () => {
  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/helpfulForms.jpg" />

      <main className={styles.container}>
        <section className={styles.description}>
          <p>{HELPFUL_FORMS.text}</p>
        </section>

        <section className={styles.formsContainer}>
          <ul>
            {HELPFUL_FORMS.forms.map((form, index) => {
              return (
                <li key={'f_' + index}>
                  {form.text}
                  <ul>
                    {form.formDetails.map((detail, detailIndex) => {
                      return (
                        <li key={'d_' + detailIndex}>
                          <a target={'blank'} href={detail.href}>
                            {detail.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className={`${styles.container} ${styles.helpfulFormsContainer}`}
        >
          <p>{HELPFUL_FORMS.coordinateCare.text}</p>
          <p>
            <a target={'blank'} href={HELPFUL_FORMS.coordinateCare.form.href}>
              {HELPFUL_FORMS.coordinateCare.form.text}
            </a>
          </p>
        </section>

        <section className={`${styles.container}`}>
          <p>
            {HELPFUL_FORMS.pdfLink.text}
            <a target={'blank'} href={HELPFUL_FORMS.pdfLink.link.href}>
              {HELPFUL_FORMS.pdfLink.link.text}
            </a>
          </p>
        </section>
      </main>

      <PmtFooter />
    </Fragment>
  );
};

export default HelpfulForms;
