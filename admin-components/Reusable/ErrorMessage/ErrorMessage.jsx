import { Grid, Typography } from '@mui/material'
import React from 'react'
import styles from './ErrorMessage.module.scss';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorMessage = ({error}) => {
  return (
    <Grid className={styles.ErrorMessageWrapper}>
        <Grid className={styles.ErrorMessageConatainerBox}>
            <ErrorIcon fontSize='large'/>
            <Typography variant='h2'>{error}</Typography>
        </Grid>
    </Grid>
  )
}

export default ErrorMessage