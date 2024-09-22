import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const SimpleSnackbar = ({ message ,showToast,setShowToast}) => {
  
  const handleClose = (event, reason) => {
    setShowToast(false)
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={() => setShowToast(false)}>
        {message}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" onClick={() => setShowToast(false)} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={showToast}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
      />
    </div>
  );
}
