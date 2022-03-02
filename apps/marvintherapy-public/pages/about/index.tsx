import { Fragment } from 'react';
import styles from './about.module.scss';
import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import Image from 'next/image';
import {
  ABOUT_ME_CONTENT,
  ADDITIONAL_TRAINING,
  EDUCATION,
  LICENSE_AND_AWARDS,
} from '../../public/content/about-me-content.const';

export const About = () => {
  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/aboutMe.jpg" />
      <main>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/about_image.jpg"
              alt="Kirstin R. Abraham, LCSW"
              width={285}
              height={350}
            />
          </div>
          <div className={styles.aboutMeContent}>
            {ABOUT_ME_CONTENT.map((content, index) => {
              if (index < ABOUT_ME_CONTENT.length - 2) {
                return <p key={index}>{content}</p>;
              }
            })}
          </div>
        </div>
        <p className={styles.lastAboutMe}>{ABOUT_ME_CONTENT[2]}</p>
        <p className={styles.lastAboutMe}>{ABOUT_ME_CONTENT[3]}</p>
        <div className={styles.educationContainer}>
          <h3>Education</h3>
          {EDUCATION.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className={styles.educationItemContainer}>
                  <div className={`${styles.school}`}>{item.school}</div>
                  <div className={styles.schoolDescription}>
                    {item.description}
                  </div>
                  <ul>
                    {item.awards.map((award, awardIndex) => {
                      return <li key={awardIndex}>{award}</li>;
                    })}
                  </ul>
                </div>
              </Fragment>
            );
          })}
        </div>

        <div className={styles.awardsContainer}>
          <h3>License, certifications, and awards</h3>
          <ul>
            {LICENSE_AND_AWARDS.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className={styles.trainingContainer}>
          <h3>Additional Training and Professional Memberships</h3>
          <ul>
            {ADDITIONAL_TRAINING.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className={styles.imageContainerBotton}>
          <Image
            src="/images/image_3.jpg"
            alt="Kirstin R. Abraham, LCSW"
            width={285}
            height={350}
          />
        </div>
      </main>

      <PmtFooter />
    </Fragment>
  );
};

export default About;
