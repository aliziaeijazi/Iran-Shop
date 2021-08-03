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
import {FeachOrders, FeachOrdersById} from "../../../../api/store.api";
import Detail from "../Modal/Modal.component";


const columns = [
    {
        id: 'name',
        label: 'کالا',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'price',
        label: 'قیمت (تومان)',
        minWidth: 100,
        align: 'center',
        format: (value) => parseInt(value).toLocaleString('fa-IR'),
    },
    {
        id: 'counter',
        label: 'تعداد',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'sum',
        label: 'مجموع مبلغ(تومان)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('fa-IR'),
    },
];

const useStyles = makeStyles({
    root: {
        width: '98%',
    },
    container: {
        minHeight: "40vh",
        maxHeight: "40vh",
    },
    bold: {
        fontWeight: "bolder",
    }
});


let bcolor
export default function ProductTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    function createData(id = 0,name, price, counter) {
        const sum = price*counter
        return {name, price, counter, sum};
    }


    function createRowsData(data) {
        const rows = data.map((target) => createData(target.id, target.name, +target.price, +target.counter))
        setData(rows)
    }

    const creatingData = async () => {
        const data = props.product ?props.product :[]
        await createRowsData(data)
    }
    useEffect(() => {
        creatingData()

    }, [props.product])
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
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
                labelRowsPerPage={'تعداد سطر در هر صفحه'}
            />
        </Paper>
    );
}