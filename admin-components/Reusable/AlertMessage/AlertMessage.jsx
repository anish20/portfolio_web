import React from 'react'
import styles from './AlertMessage.module.scss';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const AlertMessage = ({openAlertPopup,closeAlertPopup,alertTextMessage,}) => {
  return (
    <Dialog
        open={openAlertPopup}
        onClose={closeAlertPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        // sx={{
        //   "& .MuiDialog-container": {
        //     "& .MuiPaper-root": {
        //       width: "100%",
        //       // maxWidth: "1400px",
        //       maxWidth: "16vw",
        //     },
        //   },
        // }}
      >
       
        <DialogContent className={styles.PopupWrapper}>
          <Grid className={styles.PopupContainer}>
                <Grid className={styles.IconBox}>
                      <ReportProblemIcon />
                </Grid>
                <Typography>{alertTextMessage && alertTextMessage}</Typography>
          </Grid>
         
        </DialogContent>
      </Dialog>

  )
}

export default AlertMessage