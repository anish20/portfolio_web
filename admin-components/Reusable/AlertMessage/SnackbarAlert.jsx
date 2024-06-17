import React, { useContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ApplicationContext } from '@/Context/ApplicationContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = () => {
    const {alertMenu:{
        openAlert,
        setOpenAlert,
        alertMessage,
        setAlertMessage,
        alertMessageType,
        setAlertMessageType,
        handleCloseAlert}}=useContext(ApplicationContext)
     
  return (
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
    <Alert onClose={handleCloseAlert} severity={alertMessageType && alertMessageType} sx={{ width: '100%' }}>
     {alertMessage && alertMessage}
    </Alert>
  </Snackbar>
  )
}

export default SnackbarAlert