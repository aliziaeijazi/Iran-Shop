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
import {Avatar, Button, TextField} from "@material-ui/core";
import {FeachProducts} from "../../../../api/store.api";
import {BASE_URL} from "../../../../configs/variable.config";

const columns = [
    {id: 'count', label: 'موجودی', align: "center", minWidth: 200},
    {
        id: 'cost',
        label: 'قیمت',
        minWidth: 500,
        align: 'center',
    },
    {
        id: 'productName',
        label: 'نام کالا',
        minWidth: 500,
        align: 'center',
    }
];

function createData(id = 0, counter, _cost, productName) {
    let count = <TextField id={id} defaultValue={counter} type="number" inputProps={{readOnly: true}} InputLabelProps={{shrink: true,}} onClick={(event) => {event.target.readOnly = false}}/>
        let cost  = <TextField id={id} defaultValue={_cost} type="number"  inputProps={{readOnly: true}} InputLabelProps={{shrink: true ,}} onClick={(event)=>{event.target.readOnly=false}}/>

        return {productName, cost, count};
    }
        let rows =[]
        function createRowsData(data){
        rows =  data.map((target)=>createData(target.id, target.count, target.price, target.name))
    }
        const useStyles = makeStyles({
        root: {
        width: '80%',
    },
        container: {
        minHeight: 700,
        maxHeight: 700,
    },
    });

        const gettingData = async (setData) =>{
        const data = await FeachProducts()
        await createRowsData(data)
        setData(data)
    }
        export default function  StickyHeadTable() {
        const classes = useStyles();
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [data, setData] = React.useState([])
        useEffect(()=>{gettingData(setData)
    },[])
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
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handleChangePage}
        />
        </Paper>
        );
    }
