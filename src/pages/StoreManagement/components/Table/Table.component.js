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
import {EditPrice_Count, FeachProducts} from "../../../../api/store.api";
import {toast} from "react-toastify";

let Requests = []
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
    },
});
const columns = [{
    id: 'productName',
    label: 'نام کالا',
    minWidth: 200,
    align: 'center',
},
    {
        id: 'price',
        label: 'قیمت(تومان)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('fa-IR'),

    },
    {
        id: 'count',
        label: 'موجودی',
        align: "center",
        minWidth: 10,
        format: (value) => value.toLocaleString('fa-IR'),
    },
];
function find(data, id, key) {
    let arrayindex = 0
    data.forEach((target, index) => {
            if (target.id == id && target.type == key)
                arrayindex = index
        }
    )
    return arrayindex
}
const Inputs=(props)=> {
    useEffect(() => {
    }, [props ])

    const handleChangeInput = (event, key) => {
        if (!Requests.length)
            props.setrequest(true)
        const elm = event.target
        if (elm.readOnly) {
            elm.readOnly = false;
            elm.style.borderBottom = "2px solid red"
            const id = elm.id
            const firstvalue = elm.defaultValue
            Requests.push({id: id, type: key, firstvalue: firstvalue, event: event})
        }
    }
    const handlekeyPress = (event, key) => {
        if (event.key == "Escape") {
            const elm = event.target
            elm.readOnly = true;
            elm.style.borderBottom = "none"
            const removed = Requests.splice(find(Requests, elm.id, key), 1)
            elm.value = removed[0].firstvalue
        }
        if (!Requests.length) {
            props.setrequest(false)
        }
    }
    return <InputBase id={props.id} defaultValue={props.value} type="number" key={props.id}
                      inputProps={{readOnly: true, style: {textAlign: "center"}}}
                      onClick={(event) => handleChangeInput(event, props.type)}
                      onKeyDown={(event) => handlekeyPress(event, props.type)}/>
}
export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [requestbtn, setrequest] = React.useState(false)

    function handlesavebtn() {
        while (Requests.length) {
            const Data = Requests.pop()
            const value = Data.event.target.value
            EditPrice_Count({id: Data.id, [Data.type]: value}, Data.type)
            const elm = Data.event.target
            elm.readOnly = true;
            elm.style.borderBottom = "none"
        }
        setrequest(false)
    }

    const createData = (id = 0, count, price, productName) => {
        return {id, productName, price, count};
    }
    const createRowsData = (data) => {
        const rows = data.map((target) => createData(target.id, +(target.count), +(target.price), target.name))
        setData(rows)
    }


    const gettingData = async () => {
        const data = await FeachProducts()
        await createRowsData(data)
    }

    useEffect(() => {
        if (!requestbtn) {
            props.saveRef.current.disabled = true
            props.saveRef.current.classList.add("Mui-disabled")
            props.saveRef.current.removeEventListener("click", handlesavebtn, false)
        } else {
            props.saveRef.current.disabled = false
            props.saveRef.current.classList.remove("Mui-disabled")
            props.saveRef.current.addEventListener("click", handlesavebtn, false)
        }
        gettingData(    )
    }, [requestbtn])

    useEffect(() => {
        gettingData()
    }, [])
    const handleChangePage = (event, newPage) => {
        if (requestbtn)
            toast.error("لطفا ابتدا تغیرات این صفحه را ذخیره کنید!")
        else
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
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        const elmid = row.id
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {((column.id != "count") && (column.id != "price")) ? value :
                                                    <Inputs id={elmid} value={value} type={column.id} setrequest={setrequest}/>}
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                labelRowsPerPage={'تعداد سطر در هر صفحه'}
            />
        </Paper>
    );
}