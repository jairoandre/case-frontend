import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import FindInPage from '@material-ui/icons/FindInPage'

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));


const CaseTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Folder</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Responsible</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cases.length > 0 ? (props.cases.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.folder}</TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.responsible}</TableCell>
                            <TableCell align="right">{row.created}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="detail case"
                                >
                                    <FindInPage/>
                                </IconButton>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="edit case"
                                >
                                    <Edit/>
                                </IconButton>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="delete case"
                                >
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))) : (<TableRow>
                        <TableCell colSpan={8}>No cases</TableCell>
                    </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CaseTable;