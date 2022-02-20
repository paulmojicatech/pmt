import Header from '../components/header/header';
import {
  HOME_COMPONENT_MAIN_CONTENT,
  BOLD_TEXT,
} from '../public/content/home-content.const';
import styles from './index.module.scss';
import { Fragment } from 'react';

export const Index = () => {
  return (
    <Fragment>
      <div className="header-container">
        <Header backgroundUrl="../images/home.jpg" />
      </div>

      <main>
        <p className={styles.mainContent}>{HOME_COMPONENT_MAIN_CONTENT}</p>
        <p className={styles.noBottomMargin}>{BOLD_TEXT}</p>
        <p className={styles.emailContent}>
          <a
            className={styles.emailLink}
            href="mailto:kirstin.abraham@marvintherapy.com"
          >
            kirstin.abraham@marvintherapy.com
          </a>
        </p>

        <div className={styles.cardSection}></div>
      </main>
    </Fragment>
  );
};

export default Index;
