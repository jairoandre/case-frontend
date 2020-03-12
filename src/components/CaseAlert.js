import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CaseAlert = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeAction} color="primary">
            Disagree
          </Button>
          <Button onClick={props.confirmAction} variant="contained" color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CaseAlert;
