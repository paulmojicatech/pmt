import PmtHeader from '../../components/header/header';
import { Fragment, useState } from 'react';
import styles from './contact.module.scss';
import PmtFooter from '../../components/footer/footer';
import { Button, TextField } from '@mui/material';
import { EmailService } from '../../utils/email.service';

export const Contact = () => {
  const [state, setState] = useState({
    nameVal: undefined,
    emailVal: undefined,
    phoneVal: undefined,
    message: undefined,
  });

  const sendMessage = async () => {
    const emailSvc = new EmailService();
    try {
      await emailSvc.sendMessage(
        state.nameVal,
        state.emailVal,
        state.phoneVal,
        state.message
      );
    } catch (e) {
      console.log('ERR', e);
    }
  };

  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/contactMe.jpg" />
      <main className={styles.container}>
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
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Contact;
