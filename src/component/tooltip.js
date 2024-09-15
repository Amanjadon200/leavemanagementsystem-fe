import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const SimpleSnackbar = ({ message }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);

  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={()=>setOpen(false)}>
        {message}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small"  onClick={()=>setOpen(false)}/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={message.length > 0 ? true : false}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}
