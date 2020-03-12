import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import LinearProgress from "@material-ui/core/LinearProgress";
import CaseAlert from "./CaseAlert";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const CaseTable = props => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [caseIdToDelete, setCaseIdToDelete] = useState(-1);
  const [alertMessage, setAlertMessage] = useState("");

  const classes = useStyles();

  const preDeleteCase = (id) => {
    setCaseIdToDelete(id);
    setAlertMessage(`If you agree with this action, the case with id [${id}] will be deleted.`);
    setAlertOpen(true);
  }

  const editCaseObj = caseObj => {
    props.editCaseObj(caseObj);
  };

  return (
    <TableContainer component={Paper}>
      <CaseAlert
        open={alertOpen}
        closeAction={() => {
          setAlertOpen(false);
        }}
        confirmAction={() => {
          props.deleteCase(caseIdToDelete);
          setAlertOpen(false);
        }}
        alertTitle="Delete the Case?"
        alertMessage={alertMessage}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Folder</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Responsible</TableCell>
            <TableCell align="left">Access</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cases.length > 0 ? (
            props.cases.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.folder}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.responsible}</TableCell>
                <TableCell align="left">{row.access}</TableCell>
                <TableCell align="left">
                  {row.created.toLocaleDateString
                    ? row.created.toLocaleDateString("pt-BR")
                    : row.created}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="edit case"
                    onClick={() => {
                      editCaseObj(row);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="delete case"
                    onClick={() => {
                      preDeleteCase(row.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                {props.loading ? <LinearProgress /> : "No data"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CaseTable;
