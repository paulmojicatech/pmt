import PmtHeader from '../components/header/header';
import {
  HOME_COMPONENT_MAIN_CONTENT,
  BOLD_TEXT,
  INDIVIDUAL_TYPE_HEADER,
  INDIVIDUAL_TYPE_DESCRIPTION,
  CLINICAL_SUPERVISION_HEADER,
  CLINICAL_SUPERVISION_DESCRIPTION,
  TELEHEALTH_HEADER,
  TELEHEALTH_DESCRIPTION,
  EMAIL,
  BUSINESS_NAME,
  PHONE,
  FAX,
  ADDRESS,
} from '../public/content/home-content.const';
import styles from './index.module.scss';
import { Fragment } from 'react';
import PmtCard from '../components/card/card';
import Image from 'next/image';
import PmtFooter from '../components/footer/footer';

export const Index = () => {
  return (
    <Fragment>
      <div className="header-container">
        <PmtHeader backgroundUrl="../images/home.jpg" />
      </div>

      <main>
        <p className={styles.mainContent}>{HOME_COMPONENT_MAIN_CONTENT}</p>
        <p className={styles.noBottomMargin}>{BOLD_TEXT}</p>
        <p className={styles.emailContent}>
          <a
            className={styles.emailLink}
            href="mailto:kirstin.abraham@marvintherapy.com"
          >
            {EMAIL}
          </a>
        </p>

        <div className={styles.cardSection}>
          <PmtCard
            isPartial={true}
            cardTitle={INDIVIDUAL_TYPE_HEADER}
            cardDescription={INDIVIDUAL_TYPE_DESCRIPTION}
          />
          <PmtCard
            isPartial={true}
            cardTitle={CLINICAL_SUPERVISION_HEADER}
            cardDescription={CLINICAL_SUPERVISION_DESCRIPTION}
          />
          <PmtCard
            isPartial={true}
            cardTitle={TELEHEALTH_HEADER}
            cardDescription={TELEHEALTH_DESCRIPTION}
          />
        </div>

        <div className={styles.socialContainer}>
          <div className={styles.personalInfoCollection}>
            <span>
              {BUSINESS_NAME} | Phone: {PHONE} | Fax: {FAX}
            </span>
            <span>Email: {EMAIL}</span>
            <span>Address: {ADDRESS}</span>
          </div>
          <div className={styles.socialCollection}>
            <span>
              <Image
                src="/images/psych.jpg"
                alt="Psychology Today"
                width={75}
                height={75}
              />
            </span>
            <span>
              <a
                target="blank"
                href="https://www.psychologytoday.com/us/therapists/kirstin-r-abraham-marvin-nc/118077?sid=1472443324.6344_3360&city=Indian+Trail&state=NC"
              >
                <Image
                  src="/images/verified_link.jpg"
                  alt="Verified by Psychology Today"
                  width={150}
                  height={50}
                />
              </a>
            </span>
            <span className={styles.facebook}>
              <a
                href="http://www.facebook.com/indiantrailtherapy"
                target="blank"
              >
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={60}
                  height={60}
                />
              </a>
            </span>
            <span>
              <a href="https://www.pinterest.com/KAtherapist/" target="blank">
                <Image
                  src="/images/pintrest.svg"
                  alt="Pintrest"
                  width={60}
                  height={60}
                />
              </a>
            </span>
            <span className={styles.linkedIn}>
              <a
                href="https://www.linkedin.com/in/kirstin-r-abraham-lcsw-94687622/"
                target="blank"
              >
                <Image
                  src="/images/linkedIn.svg"
                  alt="LinkedIn"
                  width={60}
                  height={60}
                />
              </a>
            </span>
            <span>
              <Image
                src="/images/columbia.jpg"
                alt="Columbia University"
                width={75}
                height={75}
              />
            </span>
          </div>
        </div>
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Index;
