import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Search, Backup } from "@material-ui/icons";
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
import { withSnackbar } from 'notistack';
import CaseTable from "./CaseTable";
import CaseForm from "./CaseForm";
import CaseImport from './CaseImport';
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

const CaseHome = props => {
  const createCase = () => {
    return {
      id: null,
      folder: "",
      clients: [],
      title: "",
      tags: [],
      description: "",
      access: "PUBLIC",
      responsible: "",
      created: new Date()
    };
  };

  const createFilter = () => {
    return {
      limit: 100,
      offset: 0,
      searchBy: "folder",
      searchTerm: "",
      clientsFilter: "",
      tagsFilter: "",
      accessFilter: "",
      createdFilter: ""
    }
  }
  
  const fileInput = React.createRef();

  const classes = useStyles();
  useEffect(() => {
    api.filterCases(setCases, {}, setLoadingEl);
  }, []);

  const [caseObj, setCaseObj] = useState(createCase());
  const [formMode, setFormMode] = useState(null);
  const [cases, setCases] = useState([]);
  const [loadingEl, setLoadingEl] = useState(null);
  const [filter, setFilter] = useState(createFilter());
  const [importOpen, setImportOpen] = useState(false);

  const handleSearchTermChange = event => {
    setFilter({ ...filter, searchTerm: event.target.value });
  };

  const handleSearchByChange = event => {
    setFilter({ ...filter, searchBy: event.target.value });
  };

  const isLoading = Boolean(loadingEl);

  const isFormMode = Boolean(formMode);

  const doSearch = () => {
    api.filterCases(setCases, filter, setLoadingEl, addMessage);
  };

  const handleNewCase = event => {
    setFormMode(true);
  };

  const saveForm = () => {
    api.save(caseObj, updateCaseList, setLoadingEl, addMessage);
  };

  const deleteCase = (id) => {
    api.delete(id, setLoadingEl, doSearch, addMessage);
  }

  const cancelForm = () => {
    setCaseObj(createCase());
    setFormMode(false);
  };

  const editCaseObj = (caseObj) => {
    setCaseObj(caseObj);
    setFormMode(true);
  }

  const importFile = (file) => {
    if (file)
      api.batch(file, setLoadingEl, doSearch, addMessage);
    else
      addMessage("No file informed!", { variant: "warning" });
  }

  const updateCaseList = (attObj, isNewObj) => {
    if (isNewObj) {
      cases.push(attObj);
      setCases(cases);
    } else {
      doSearch();
    }
    setFormMode(false);
  };

  const addMessage = (msg, options) => {
    props.enqueueSnackbar(msg, options);
  };

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
                onChange={handleSearchTermChange}
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
              <Button onClick={doSearch} disabled={isFormMode}>SEARCH</Button>
              <Button onClick={handleNewCase} disabled={isFormMode}>
                NEW CASE
              </Button>
            </ButtonGroup>
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="help"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setImportOpen(true) }}
            >
              <Backup />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Box className={classes.growTable}>
        {isFormMode ? (
          <CaseForm
            caseObj={caseObj}
            setCaseObj={setCaseObj}
            saveForm={saveForm}
            cancelForm={cancelForm}
          />
        ) : (
          <CaseTable cases={cases} loading={isLoading} editCaseObj={editCaseObj} deleteCase={deleteCase}/>
        )}
      </Box>
      <CaseImport open={importOpen} importAction={importFile} closeAction={() => { setImportOpen(false) }}/>
    </Container>
  );
};

export default withSnackbar(CaseHome);
