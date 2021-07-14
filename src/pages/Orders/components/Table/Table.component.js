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
import {Button} from "@material-ui/core";
import {FeachOrders} from "../../../../api/store.api";

let bcolor

const columns = [
    {
        id: 'username',
        label: 'نام کاربر',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'sumBuying',
        label: 'مجموع مبلغ(تومان)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'orderTime',
        label: 'زمان ثبت سفارش',
        minWidth: 100,
        align: 'center',
    },
    {id: 'action', label: 'عملیات', align: "center", minWidth: 130}
];

function createData(id = 0, orderTime, sumBuying, username) {
    let action = <Button id={id} variant="contained" color={bcolor} onClick={(event) => console.log(event.target)}>
        بررسی سفارش
    </Button>

    return {username, sumBuying, orderTime, action};
}

let rows = []

function createRowsData(data) {
    rows = data.map((target) => createData(target.id, target.orderTime, target.sumBuying, target.name))
}

const useStyles = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        minHeight: "73vh",
        maxHeight: "73vh",
    },
    bold:{
        fontWeight:"bolder",
    }
});

const gettingData = async (setData, kind) => {
    const data = await FeachOrders(kind)
    bcolor = (kind == "delivered" ? "primary" : "secondary")
    await createRowsData(data)
    setData(data)
}
export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    useEffect(() => {
        gettingData(setData, props.kind)
    }, [])
    useEffect(() => {
        gettingData(setData, props.kind)
    }, [props.kind])
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
                labelDisplayedRows={({from, to, count}) => ` ${from}-${to} ` + " از " + `  ${count !== -1 ? count : 'more than' + to}` + " "}
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
