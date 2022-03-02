import PmtFooter from '../../components/footer/footer';
import PmtHeader from '../../components/header/header';
import { Fragment, useState } from 'react';
import styles from './appointments.module.scss';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';

export const Appointments = () => {
  const [value, setValue] = useState(undefined);

  const shouldDisableDate = (date: Date) => {
    return date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4;
  };

  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/appointments.jpg" />
      <main className={styles.container}>
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
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Select sx={{ marginLeft: '1rem', width: '7rem' }}>
                  <MenuItem value={'9AM'}>9AM</MenuItem>
                  <MenuItem value={'10AM'}>10AM</MenuItem>
                  <MenuItem value={'11AM'}>11AM</MenuItem>
                  <MenuItem value={'4PM'}>4PM</MenuItem>
                  <MenuItem value={'5PM'}>5PM</MenuItem>
                </Select>
              </div>
            </LocalizationProvider>
          </form>
        </div>
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Appointments;
