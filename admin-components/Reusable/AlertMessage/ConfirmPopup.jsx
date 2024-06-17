import React from "react";
import styles from "./AlertMessage.module.scss";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Buttons from "../Buttons/Buttons";

const ConfirmationPopup = ({
  openConfirmPopup,
  closeConfirmPopup,
  confirmationText,
  OkConfirmPopup,
  NoConfirmPopup 
}) => {
  return (
    <Dialog
      open={openConfirmPopup}
      onClose={closeConfirmPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogContent className={styles.PopupWrapper}>
        <Grid className={styles.PopupContainer}>
          <Grid className={styles.IconBox}>
            <ReportProblemIcon />
          </Grid>
          <Typography>
            {confirmationText && confirmationText}
            {/* Are you want to sure to delete? */}
          </Typography>
        </Grid>
        <Grid className={styles.BottomButtons}>
          <Buttons htmlType={"submit"} onClick={OkConfirmPopup}>Yes</Buttons>
          <Buttons htmlType={"submit"} onClick={NoConfirmPopup}>No</Buttons>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationPopup;
