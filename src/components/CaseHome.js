import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Search, Help } from "@material-ui/icons";
import {
  AppBar,
  Backdrop,
  Container,
  CircularProgress,
  Button,
  ButtonGroup,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from "@material-ui/core";
import CaseTable from "./CaseTable";
import CaseForm from "./CaseForm";
import api from "../service/api";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  growTable: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  margin2TopBottom: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const CaseHome = () => {
  const createCase = () => {
    return {
      id: null,
      folder: "",
      clients: [],
      title: "",
      tags: [],
      description: "",
      access: "PUBLIC",
      created: new Date()
    };
  };

  const casesData = [];

  const [caseObj, setCaseObj] = useState(createCase());
  const [formMode, setFormMode] = useState(null)
  const [cases, setCases] = useState(casesData);
  const [loadingEl, setLoadingEl] = useState(null);
  const [filter, setFilter] = useState({
    limit: 100,
    offset: 0,
    searchBy: "folder",
    searchTerm: "",
    clientsFilter: "",
    tagsFilter: "",
    accessFilter: "",
    createdFilter: ""
  });

  const updateSearchTerm = event => {
    setFilter({ searchTerm: event.target.value, ...filter });
  };

  const isLoading = Boolean(loadingEl);

  const isFormMode = Boolean(formMode);

  useEffect(() => {
    //api.filterCases(setCases, filter, setLoadingEl);
  }, []);

  const handleSearchByChange = event => {
    setFilter({ ...filter, searchBy: event.target.value });
  };

  const classes = useStyles();

  const handleNewCase = event => {
    setFormMode(true);
  }

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Legal Cases
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={updateSearchTerm}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <RadioGroup
              aria-label="position"
              name="position"
              value={filter.searchBy}
              onChange={handleSearchByChange}
              row
            >
              <FormControlLabel
                value="folder"
                control={<Radio />}
                label="Folder"
                labelPlacement="end"
              />
              <FormControlLabel
                value="title"
                control={<Radio />}
                label="Title"
                labelPlacement="end"
              />
              <FormControlLabel
                value="description"
                control={<Radio />}
                label="Description"
                labelPlacement="end"
              />
            </RadioGroup>
            <ButtonGroup
              color="secondary"
              variant="contained"
              aria-label="button group"
            >
              <Button>SEARCH</Button>
              <Button onClick={handleNewCase} disabled={isFormMode}>NEW CASE</Button>
            </ButtonGroup>
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="help"
              aria-haspopup="true"
              color="inherit"
            >
              <Help />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Box className={classes.growTable}>
        {isFormMode ? <CaseForm caseObj={caseObj} setCaseObj={setCaseObj} /> : <CaseTable cases={cases} loading={isLoading} /> }
      </Box>
    </Container>
  );
};

export default CaseHome;
