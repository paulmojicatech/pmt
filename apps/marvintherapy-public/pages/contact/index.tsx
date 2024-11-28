import PmtHeader from '../../components/header/header';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import styles from './contact.module.scss';
import PmtFooter from '../../components/footer/footer';
import { Button, TextField } from '@mui/material';
import { EmailService } from '../../utils/email.service';
import CircularProgress from '@mui/material/CircularProgress';
import PmtSnackbar from '../../components/snackbar/snackbar';

export const Contact = () => {
  const [state, setState] = useState({
    nameVal: undefined,
    emailVal: undefined,
    phoneVal: undefined,
    message: undefined,
    isSending: false,
    isSuccess: false,
    responseMsg: undefined,
  });

  const sendMessage = async () => {
    setState({ ...state, isSending: true });
    const emailSvc = new EmailService();
    try {
      await emailSvc.sendMessage(
        state.nameVal,
        state.emailVal,
        state.phoneVal,
        state.message
      );
      setState({
        ...state,
        isSending: false,
        responseMsg: 'Messagen sent',
        isSuccess: true,
      });
    } catch (e) {
      setState({
        ...state,
        isSending: false,
        isSuccess: false,
        responseMsg: 'Message failed to send.',
      });
    }
  };

  const handleSnackbarClose = () =>
    setState({
      ...state,
      isSuccess: false,
      responseMsg: undefined,
    });

  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/contactMe.jpg" />
      <main className={styles.container}>
        {!state.isSending && (
          <Fragment>
            <div className={styles.imageContainer}>
              <Image
                src="/images/image_1.jpg"
                alt="Kirstin R. Abraham, LCSW"
                width={285}
                height={350}
              />
            </div>
            <div className={styles.container}>
              <span className={styles.bold}>Email</span>
              <a className={styles.link} href="mailto:kirstin.abraham@marvintherapy.com">kirstin.abraham@marvintherapy.com</a>
              <span className={styles.bold}>Phone:</span>
              <a className={styles.link} href="tel">(704) 233-7594</a>
              <span className={styles.bold}>Fax:</span>
              <span>(704) 565-4130</span>
            </div>
            <div className={styles.formContainer}>
              <h3>Enter your contact info and message below</h3>
              <TextField
                label="Name"
                sx={{ marginBottom: '2rem', width: '100%' }}
                id="name"
                value={state.nameVal}
                onChange={(ev) => {
                  setState({ ...state, nameVal: ev.target.value });
                }}
                variant={'outlined'}
              />
              <TextField
                label="Email"
                id="email"
                type={'email'}
                variant={'outlined'}
                value={state.emailVal}
                sx={{ marginBottom: '2rem', width: '100%' }}
                onChange={(ev) => {
                  setState({ ...state, emailVal: ev.target.value });
                }}
              />
              <TextField
                label="Phone"
                id="phone"
                type={'tel'}
                variant={'outlined'}
                value={state.phoneVal}
                sx={{ marginBottom: '2rem', width: '100%' }}
                onChange={(ev) => {
                  setState({ ...state, phoneVal: ev.target.value });
                }}
              />
              <TextField
                label="Message"
                id="message"
                variant={'outlined'}
                value={state.message}
                rows={7}
                multiline
                sx={{ width: '100%', marginBottom: '2rem' }}
                onChange={(ev) => {
                  setState({ ...state, message: ev.target.value });
                }}
              />
              <div className={styles.sendContainer}>
                <Button variant="contained" onClick={() => sendMessage()}>
                  Send Message
                </Button>
              </div>
            </div>
            <PmtSnackbar
              closeHandler={handleSnackbarClose}
              isOpen={!state.isSending && !!state.responseMsg}
              message={state.responseMsg}
              isSuccess={state.isSuccess}
            />
          </Fragment>
        )}

        {state.isSending && <CircularProgress />}
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Contact;
