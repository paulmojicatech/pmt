import PmtFooter from '../../components/footer/footer';
import PmtHeader from '../../components/header/header';
import { Fragment, useState } from 'react';
import styles from './appointments.module.scss';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CirclularProgress from '@mui/material/CircularProgress';

import { Button, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
import Image from 'next/image';
import { EmailService } from '../../utils/email.service';

export const Appointments = () => {
  const currentDate = new Date().toLocaleDateString();
  const [dateVal, setDate] = useState(currentDate);
  const [timeVal, setTime] = useState('9AM');
  const [nameVal, setName] = useState(undefined);
  const [emailVal, setEmail] = useState(undefined);
  const [isSending, setIsSending] = useState(false);

  const shouldDisableDate = (date: Date) => {
    return date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4;
  };

  const emailSvc = new EmailService();
  const requestAppointment = async () => {
    setIsSending(true);
    try {
      await emailSvc.requestAppointment(
        nameVal,
        emailVal,
        `${dateVal} ${timeVal}`
      );
      setIsSending(false);
    } catch (err) {
      setIsSending(false);
      console.log('ERROR', err);
      alert('Error');
    }
  };
  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/appointments.jpg" />
      <main className={styles.container}>
        {!isSending && (
          <div className={styles.formContainer}>
            <div className={styles.headerText}>
              <h3>Please select a date and time you would like to request:</h3>
            </div>
            <div className={styles.formContainer}>
              <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className={styles.dateContainer}>
                    <DatePicker
                      shouldDisableDate={shouldDisableDate}
                      label="Date"
                      value={dateVal}
                      onChange={(newValue) => {
                        setDate(newValue.toLocaleDateString());
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Select
                      sx={{ marginLeft: '1rem', width: '7rem' }}
                      value={timeVal}
                      onChange={(ch) => {
                        setTime(ch.target.value);
                      }}
                    >
                      <MenuItem value={'9AM'}>9AM</MenuItem>
                      <MenuItem value={'10AM'}>10AM</MenuItem>
                      <MenuItem value={'11AM'}>11AM</MenuItem>
                      <MenuItem value={'4PM'}>4PM</MenuItem>
                      <MenuItem value={'5PM'}>5PM</MenuItem>
                    </Select>
                  </div>
                  <div className={styles.userInfo}>
                    <TextField
                      label="Name"
                      sx={{ marginBottom: '2rem' }}
                      id="name"
                      value={nameVal}
                      onChange={(ev) => {
                        setName(ev.target.value);
                      }}
                      variant={'outlined'}
                    />
                    <TextField
                      label="Email"
                      id="email"
                      type={'email'}
                      variant={'outlined'}
                      value={emailVal}
                      onChange={(ev) => {
                        setEmail(ev.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.sendContainer}>
                    <Button
                      variant="contained"
                      onClick={() => requestAppointment()}
                    >
                      Send Request
                    </Button>
                  </div>
                </LocalizationProvider>
              </form>
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
        )}
        {isSending && <CirclularProgress />}
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Appointments;
