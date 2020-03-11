import React from "react";
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";

const CaseDate = props => {
  const handleOnChange = date => {
    const newObj = {};
    newObj[props.property] = date;
    props.changeCaseObj(newObj);
  };
  return (
    <FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id={props.id}
          label={props.label}
          disableToolbar
          variant="filled"
          format="dd/MM/yyyy"
          margin="normal"
          value={props.caseObj[props.property]}
          onChange={handleOnChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
};

export default CaseDate;