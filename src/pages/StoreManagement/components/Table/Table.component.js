import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {InputBase} from "@material-ui/core";
import {FeachProducts} from "../../../../api/store.api";

const columns = [{
    id: 'productName',
    label: 'نام کالا',
    minWidth: 200,
    align: 'center',
},
    {
        id: 'cost',
        label: 'قیمت(تومان)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('fa-IR'),

    },
    {
        id: 'count', label: 'موجودی', align: "center", minWidth: 10, format: (value) => value.toLocaleString('fa-IR'),
    },


];

function createData(id = 0, counter, _cost, productName) {
    let count = <InputBase id={id} defaultValue={counter} type="number"
                           inputProps={{readOnly: true, style: {textAlign: "center"}}}
                           onClick={(event) => {
                               event.target.readOnly = false;
                               event.target.style.borderBottom = "2px solid red"
                           }}/>
    let cost = <InputBase id={id} defaultValue={_cost} type="number"
                          inputProps={{readOnly: true, style: {textAlign: "center"}}}
                          onClick={(event) => {
                              event.target.readOnly = false;
                              event.target.style.borderBottom = "2px solid red"
                          }}/>

    return {productName, cost, count};
}

let rows = []

function createRowsData(data) {
    rows = data.map((target) => createData(target.id, +(target.count), +(target.price), target.name))
}

const useStyles = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        minHeight: "73vh",
        maxHeight: "73vh",
    },
    bold: {
        fontWeight: "bold"
    }
});

const gettingData = async (setData) => {
    const data = await FeachProducts()
    await createRowsData(data)
    setData(data)
}
export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    useEffect(() => {
        gettingData(setData)
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    className={classes.bold}
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                labelDisplayedRows={({
                                         from,
                                         to,
                                         count
                                     }) => ` ${from}-${to} ` + " از " + `  ${count !== -1 ? count : 'more than' + to}` + " "}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                labelRowsPerPage={'تعداد سطر در هر صفحه'}
            />
        </Paper>
    );
}
