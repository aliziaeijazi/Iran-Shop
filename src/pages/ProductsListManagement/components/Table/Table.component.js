import React, {useEffect, useState} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Avatar, Button, createMuiTheme} from "@material-ui/core";
import {DeleteProduct, FeachProducts} from "../../../../api/store.api";
import {BASE_URL} from "../../../../configs/variable.config";
import InsertProduct from "../Modal/Modal.component";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {faIR} from '@material-ui/core/locale';

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
        margin: 2,
    },
    avatar: {
        width: 70,
        height: 70,
    },
    btn:{
        margin: 2,
        minWidth:90,
    }
});



export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [modalId, setId] = React.useState(0)
    const [modolstatus, setStatus] = React.useState(false)
    const [Delete, setdelete] = React.useState(false)
    const columns = [

        {
            id: 'avatar',
            label: 'تصویر',
            minWidth: 50,
            align: 'center',
        },
        {
            id: 'productName',
            label: 'نام کالا',
            minWidth: 200,
            align: 'center',
        },
        {
            id: 'groupName',
            label: 'دسته بندی',
            minWidth: 150,
            align: 'center',
        },
        {id: 'action', label: 'عملیات', align: "center", minWidth: 150},

    ];
    const handleEdit = (elm) => {
        if (elm.tagName == "SPAN")
            setId(+elm.parentNode.id)
        else
            setId(+elm.id)
        setStatus(true)
    }
    const handleDelete = async (elm) => {
        if (elm.tagName == "SPAN")
            await DeleteProduct(+elm.parentNode.id)
        else
            await DeleteProduct(+elm.id)
        setdelete(true)

    }

    const createData = (id = 0, imageSrc, productName, groupName) => {
        let action = <div>
            <Button id={id} className={classes.btn} variant="contained" color="secondary"
                    onClick={(event) => handleDelete(event.target)}>
                حذف
            </Button>
            <Button id={id} className={classes.btn} variant="contained" color="primary"
                    onClick={(event) => handleEdit(event.target)}>
                ویرایش
            </Button>
        </div>
        let avatar = <Avatar variant="rounded" className={classes.avatar} alt={productName}
                             src={`${BASE_URL}${imageSrc}`}/>
        return {avatar, productName, groupName, action};
    }
    const createRowsData = (data) => {
        const rows = data.map((target) => createData(target.id, target.image, target.name, `${target.groupname}/${target.subgroupname}`))
        setData(rows)
    }
    const gettingData = async (setData) => {
        const data = await FeachProducts()
        await createRowsData(data)

    }
    useEffect(() => {
        gettingData(setData)
    }, [])
    useEffect(() => {
        if (props.open)
            setStatus(true)
    }, [props.open])
    useEffect(() => {
        gettingData(setData)
    }, [modolstatus])
    useEffect(() => {
        gettingData(setData)
        setdelete(false)
    }, [Delete])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const falsemodal = () => {
        props.falsemodal()
        setStatus(false)
        setId(0)
    }

    const rows = data
    return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell className={classes.bold}
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
                <InsertProduct id={modalId} open={modolstatus} falsemodal={falsemodal}/>
            </Paper>
    );
}
