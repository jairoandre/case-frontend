import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CaseAlert = props => {
  const inputFile = React.createRef();
  const importAction = () => {
    props.importAction(inputFile.current.files[0]);
    props.closeAction();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Import cases from file</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Input format (per line): "folder";["clients"];"title";["tags"];"description";"notes";"responsible";"PUBLIC";"2020-02-10"
          </DialogContentText>
          <input type="file" ref={inputFile}></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeAction} color="primary">
            Cancel
          </Button>
          <Button onClick={importAction} variant="contained" color="primary" autoFocus>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CaseAlert;
