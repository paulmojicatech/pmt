import { Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export const PmtSnackbar = ({ message, isSuccess, isOpen, closeHandler }) => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        message={message}
        key={'top' + 'center'}
        autoHideDuration={1500}
        onClose={closeHandler}
      >
        <Alert severity={isSuccess ? 'success' : 'error'}>{message}</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default PmtSnackbar;
