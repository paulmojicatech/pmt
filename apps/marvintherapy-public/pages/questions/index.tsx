import PmtHeader from '../../components/header/header';
import { Fragment, useState } from 'react';
import PmtFooter from '../../components/footer/footer';
import PmtCard from '../../components/card/card';
import { COMMON_QUESTIONS_MODEL } from '../../models/questions.interface';
import styles from './questions.module.scss';
import { Button } from '@mui/material';

export const Questions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/commonQuestions.jpg" />
      <main className={styles.questionsContainer}>
        <div className={styles.accordionContainer}>
          {COMMON_QUESTIONS_MODEL.map((question, index) => {
            return (
              <Fragment key={`q_${index}`}>
                <div className={styles.accordionDetail}>
                  <Button onClick={() => setSelectedQuestion(question.type)}>
                    {question.cardTitle}
                  </Button>
                  {selectedQuestion === question.type && (
                    <PmtCard {...question} />
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Questions;
