import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  IconButton,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  Paper,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CaseListInput from "./CaseListInput";

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

  const changeCaseObj = newProps => {
    props.setCaseObj({ ...props.caseObj, ...newProps });
  };

  const onChangeFolder = event => {
    changeCaseObj({ folder: event.target.value });
  };

  const onChangeTitle = event => {
    changeCaseObj({ title: event.target.value });
  };

  const onChangeAccess = event => {
    changeCaseObj({ access: event.target.value });
  };

  return (
    <Card>
      <CardContent>
        <form className={classes.root} noValidate autoComplete="off">
          {props.caseObj.id ? (
            <TextField
              id="id"
              label="Id"
              value={props.caseObj.id}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          ) : (
            <Typography className={classes.title} variant="h4" noWrap>
              New Case
            </Typography>
          )}
          <FormControl fullWidth>
            <TextField
              id="folder"
              label="Folder"
              size="medium"
              value={props.caseObj.folder}
              variant="outlined"
              onChange={onChangeFolder}
            />
          </FormControl>
          <FormControl size="medium">
            <TextField
              id="title"
              label="Title"
              value={props.caseObj.title}
              onChange={onChangeTitle}
              variant="outlined"
            />
          </FormControl>
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
          <div></div>
          <CaseListInput items={props.caseObj.clients} property="clients" label="Clients" changeCaseObj={changeCaseObj} />
          <CaseListInput items={props.caseObj.tags} property="tags" label="Tags" changeCaseObj={changeCaseObj} />
        </form>
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
        <Button size="small">Cancel</Button>
      </CardActions>
    </Card>
  );
};

export default CaseForm;
