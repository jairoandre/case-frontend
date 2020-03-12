import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";
import CaseInput from "./CaseInput";
import CaseListInput from "./CaseListInput";
import CaseDate from './CaseDate';

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
      //width: 200
    }
  }
}));

const CaseForm = props => {
  const classes = useStyles();

  const save = () => {
    props.saveForm();
  }

  const cancel = () => {
    props.cancelForm();
  }

  const changeCaseObj = newProps => {
    props.setCaseObj({ ...props.caseObj, ...newProps });
  };

  const onChangeAccess = event => {
    changeCaseObj({ access: event.target.value });
  };

  return (
    <Card>
      <CardContent>
        <form className={classes.root} noValidate autoComplete="off">
          {props.caseObj.id ? (
            <Typography className={classes.title} variant="h4" noWrap>
              Edit Case - {props.caseObj.id}
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h4" noWrap>
              New Case
            </Typography>
          )}
          <CaseInput
            id="title"
            fullWidth
            label="Title"
            caseObj={props.caseObj}
            property="title"
            setCaseObj={changeCaseObj}
          />
          <CaseInput
            id="folder"
            label="Folder"
            caseObj={props.caseObj}
            property="folder"
            setCaseObj={changeCaseObj}
          />
          <CaseInput
            id="responsible"
            label="Responsible"
            caseObj={props.caseObj}
            property="responsible"
            setCaseObj={changeCaseObj}
          />
          <CaseDate 
            id="create"
            property="created"
            label="Created"
            caseObj={props.caseObj}
            changeCaseObj={changeCaseObj}/>
          <FormControl>
            <InputLabel>Access</InputLabel>
            <Select
              id="access"
              value={props.caseObj.access}
              onChange={onChangeAccess}
            >
              <MenuItem value={"PUBLIC"}>PUBLIC</MenuItem>
              <MenuItem value={"PRIVATE"}>PRIVATE</MenuItem>
            </Select>
          </FormControl>
          <CaseInput
            id="description"
            fullWidth
            label="Description"
            caseObj={props.caseObj}
            property="description"
            setCaseObj={changeCaseObj}
          />
          <div></div>
          <CaseListInput
            items={props.caseObj.clients}
            property="clients"
            label="Clients"
            changeCaseObj={changeCaseObj}
          />
          <Divider variant="middle"/>
          <CaseListInput
            items={props.caseObj.tags}
            property="tags"
            label="Tags"
            changeCaseObj={changeCaseObj}
          />
          <FormControl></FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={save} variant="contained" color="primary">Save</Button>
        <Button size="small" onClick={cancel} variant="contained" color="secondary">Cancel</Button>
      </CardActions>
    </Card>
  );
};

export default CaseForm;
