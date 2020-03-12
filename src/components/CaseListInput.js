import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import {
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  IconButton,
  Chip,
  FormControl,
  InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chipPaper: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
      //width: 200
    }
  }
}));

const CaseListInput = props => {
  const classes = useStyles();
  const [itemValue, setItemValue] = useState("");
  const onChangeItemValue = evt => {
    setItemValue(evt.target.value);
  };
  const addAdornment = cb => {
    return (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="help"
          aria-haspopup="true"
          color="inherit"
          onClick={cb}
        >
          <Add />
        </IconButton>
      </InputAdornment>
    );
  };
  const listToChips = (list, handleDelete) => {
    return (
      <Container className={classes.chipPaper}>
        {list.map((item, idx) => (
          <Chip
            className={classes.chip}
            key={idx}
            label={item}
            onDelete={handleDelete(idx)}
          />
        ))}
      </Container>
    );
  };
  const handleItemAdd = () => {
    if (itemValue && itemValue.length > 0) {
      const items = props.items;
      items.push(itemValue);
      setItemValue("");
      let newObj = {};
      newObj[props.property] = items;
      props.changeCaseObj(newObj);
    }
  };
  // A function that returns a function to be called on the onDelete event
  const handleItemDelete = idx => () => {
    const items = props.items;
    items.splice(idx, 1);
    let newObj = {};
    newObj[props.property] = items;
    props.changeCaseObj(newObj);
  };
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5">{props.label}</Typography>
        <FormControl fullWidth>
          <TextField
            id={props.id}
            label={props.label}
            value={itemValue}
            onChange={onChangeItemValue}
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: addAdornment(handleItemAdd)
            }}
          />
        </FormControl>
        {listToChips(props.items, handleItemDelete)}
      </CardContent>
    </Card>
  );
};

export default CaseListInput;
