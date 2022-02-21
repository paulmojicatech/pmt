import { Fragment } from 'react';
import styles from './about.module.scss';
import { PmtHeader } from '../../components/header/header';
import Image from 'next/image';
import {
  ABOUT_ME_CONTENT,
  EDUCATION,
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
              if (index < ABOUT_ME_CONTENT.length - 1) {
                return <p key={index}>{content}</p>;
              }
            })}
          </div>
        </div>
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
      </main>
    </Fragment>
  );
};

export default About;
