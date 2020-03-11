import React from "react";
import { TextField, FormControl } from "@material-ui/core";

const CaseInput = props => {
  const onChangeValue = event => {
    const newValue = event.target.value;
    const newObj = {};
    newObj[props.property] = newValue;
    props.setCaseObj(newObj);
  };

  return (
    <FormControl fullWidth={props.fullWidth}>
      <TextField
        id={props.id}
        label={props.label}
        value={props.caseObj[props.property]}
        onChange={onChangeValue}
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

export default CaseInput;
