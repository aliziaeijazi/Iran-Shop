import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Avatar, Button, InputBase, Typography} from "@material-ui/core";
import {DeleteProduct, FeachProduct, FeachProducts} from "../../../../api/store.api";
import {BASE_URL} from "../../../../configs/variable.config";
import FinalSeeling from "../Modal/Modal.component";
import {addToBasket, deleteFromBasket, editCountInBasket} from "../../../../redux/action/Basket.action";
import {connect} from "react-redux";
import {toast} from "react-toastify";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
    },
    container: {
        minHeight: "65vh",
        maxHeight: "65vh",
    },
    bold: {
        fontWeight: "bolder",
        margin: 2,
    },
    avatar: {
        width: 70,
        height: 70,
        [theme.breakpoints.down("sm")]: {
            width: 20,
            height: 20,
        }
    },
    btn: {
        margin: 2,
        minWidth: 40,
    },
    buying: {
        margin: 10,
        minWidth: 90,
    },
    footer: {
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center"
    }
}));
const columns = [
    {
        id: 'avatar',
        label: 'تصویر',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'productName',
        label: 'نام کالا',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'price',
        label: 'قیمت',
        minWidth: 20,
        align: 'center',
        format: (value) => value.toLocaleString("fa-IR"),
    },
    {
        id: 'count',
        label: 'تعداد',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'sum',
        label: 'جمع',
        minWidth: 30,
        align: 'center',
        format: (value) => value.toLocaleString("fa-IR")
    },
    {id: 'action', label: 'عملیات', align: "center", minWidth: 20},
];

function BasketTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [modolstatus, setStatus] = React.useState(false)
    const [Sum, SetSumOfProduct] = React.useState(0)
    const DeleteFromBasket = (id) => {
        const Basket = props.basketList
        const index = Basket.findIndex((target) => (target.id == id))
        props.deleteFromBasket(index)
    }
    const handleDelete = (elm) => {
        const id = elm.tagName == "SPAN" ? +elm.parentNode.id : +elm.id
        DeleteFromBasket(id)
    }
    const handleChangeInput = async (event, id) => {
        const data = await FeachProduct(id)
        if (event.target.value > +data.count)
            toast.error(<h4>کالای مورد نظر شما به تعداد درخواستی در انبار موجود نیست.</h4>)
        else {
            const Basket = props.basketList
            const index = Basket.findIndex((target) => (target.id == id))
            props.editCountInBasket(index, event.target.value)
        }
    }
    const createData = (id = 0, imageSrc, productName, price, _count, maxCount) => {
        let action = <div><Button id={id} className={classes.btn} variant="contained" color="secondary"
                                  onClick={(event) => handleDelete(event.target)}>حذف</Button></div>
        let count = <InputBase id={id} defaultValue={_count} type="number" key={id}
                               inputProps={{style: {textAlign: "center"}, max: maxCount, min: 1}}
                               onClick={(event) => handleChangeInput(event, id)}/>
        const sum = _count * price
        let avatar = <Avatar variant="rounded" className={classes.avatar} alt={productName}
                             src={`${BASE_URL}${imageSrc}`}/>
        return {avatar, productName, price, count, sum, action};
    }
    const createRowsData = (data) => {
        const rows = data.map((target) => createData(target.id, target.image, target.name, +target.price, target.count, target.maxCount))
        let sum = 0
        rows.map((target) => {
            sum += target.sum
        })
        SetSumOfProduct(sum)
        setData(rows)

    }
    const gettingBasket = async () => {
        const Basket = props.basketList
        let Data = []
        if (Basket)
            Basket.map(async (target) => {
                const productData = await FeachProduct(target.id)
                const data = {
                    id: target.id,
                    image: productData.image,
                    count: target.counter,
                    price: target.price,
                    name: productData.name,
                    maxCount: productData.count,
                }
                Data.push(data)
                await createRowsData(Data)
            })
    }
    useEffect(async () => {
        gettingBasket()
    }, [props.basketList])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const falsemodal = () => {
        setStatus(false)
    }
    const rows = data
    return (
        <div className={classes.root}>
            <Paper>
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
                {/*<InsertProduct id={modalId} open={modolstatus} falsemodal={falsemodal}/>*/}
            </Paper>
            <div className={classes.footer}><Typography className={classes.bold}
                                                        variant="h6">{`مبلغ کل: ${Sum.toLocaleString('fa-IR')} تومان`}</Typography>
                <Button className={classes.buying} variant="contained" color="primary" onClick={() => setStatus(true)}>
                    نهایی کردن خرید
                </Button></div>
            <FinalSeeling open={modolstatus} falsemodal={falsemodal}/>
        </div>

    );
}

function mapStateToProps(state) {
    return {
        basketList: state.Basket.basketList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToBasket: (value) => dispatch(addToBasket(value)),
        editCountInBasket: (index, counter) => dispatch(editCountInBasket(index, counter)),
        deleteFromBasket: (index) => dispatch(deleteFromBasket(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketTable)