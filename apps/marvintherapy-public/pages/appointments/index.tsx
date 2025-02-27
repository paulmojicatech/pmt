import CircularProgress from '@mui/material/CircularProgress';
import { Fragment, useState } from 'react';
import PmtFooter from '../../components/footer/footer';
import PmtHeader from '../../components/header/header';
import styles from './appointments.module.scss';

import Image from 'next/image';
import PmtSnackbar from '../../components/snackbar/snackbar';
import { EmailService } from '../../utils/email.service';

export const Appointments = () => {
  const currentDate = new Date().toLocaleDateString();
  const [state, setState] = useState({
    dateVal: currentDate,
    timeVal: '9AM',
    nameVal: undefined,
    emailVal: undefined,
    isSending: false,
    isSuccess: false,
    sendMessage: undefined,
  });

  const { dateVal, timeVal, nameVal, emailVal, isSending } = state;

  const shouldDisableDate = (date: Date) => {
    return date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4;
  };

  const emailSvc = new EmailService();
  const requestAppointment = async () => {
    setState({ ...state, isSending: true });
    try {
      const resp = await emailSvc.requestAppointment(
        nameVal,
        emailVal,
        `${dateVal} ${timeVal}`
      );
      if (resp.status === 200) {
        setState({
          ...state,
          isSending: false,
          sendMessage: 'Your request has been sent.',
          isSuccess: true,
        });
      } else {
        setState({
          ...state,
          isSending: false,
          isSuccess: false,
          sendMessage: 'Your request failed to send.',
        });
      }
    } catch (err) {
      setState({
        ...state,
        isSending: false,
        isSuccess: false,
        sendMessage: 'Your request failed to send.',
      });
    }
  };

  const handleSnackbarClose = () =>
    setState({
      ...state,
      isSuccess: false,
      sendMessage: undefined,
    });
  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/appointments.jpg" />
      <main className={styles.container}>
        {!isSending && (
          <Fragment>
            <div className={styles.formContainer}>
              <div className={styles.headerText}>
                <h3>
                Please email me at: <a className={styles.emailLink} href="mailto:kirstin.abraham@marvintherapy.com">kirstin.abraham@marvintherapy.com</a> to schedule your appointment today
                </h3>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/images/image_2.jpg"
                  alt="Kirstin R. Abraham, LCSW"
                  width={285}
                  height={350}
                />
              </div>
            </div>
            <PmtSnackbar
              closeHandler={handleSnackbarClose}
              isOpen={!state.isSending && !!state.sendMessage}
              message={state.sendMessage}
              isSuccess={state.isSuccess}
            />
          </Fragment>
        )}
        {isSending && <CircularProgress />}
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Appointments;
