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
import Detail from "../Modal/Modal.component";


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

const useStyles = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        minHeight: "73vh",
        maxHeight: "73vh",
    },
    bold: {
        fontWeight: "bolder",
    }
});


let bcolor
export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)
    const [id, setId] = React.useState(0)
    const handleClick = (event) => {
        if (event.target.tagName == "SPAN")
            setId(event.target.parentNode.id)
        else
            setId(event.target.id)
        setModalStatus(true)
    }

    function createData(id = 0, orderTime, sumBuying, username) {
        let action = <Button id={id} variant="contained" color={bcolor} onClick={handleClick}>
            بررسی سفارش
        </Button>

        return {username, sumBuying, orderTime, action};
    }


    function createRowsData(data) {
        const rows = data.map((target) => createData(target.id, new Date(target.createdAt).toLocaleString('fa-IR'), target.sumBuying, `${target.name} ${target.family}`))
        setData(rows)
    }

    const gettingData = async (kind) => {
        const data = await FeachOrders(kind)
        bcolor = (kind == "delivered" ? "primary" : "secondary")
        await createRowsData(data)
    }
    useEffect(() => {
        gettingData(setData, props.kind)
    }, [])
    useEffect(() => {
        gettingData(props.kind)
    }, [props.kind])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = data
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
            <Detail open={modalStatus} id={id} falsemodal={() => {
                setModalStatus(false)
                setId(0)
            }}/>
        </Paper>
    );
}
