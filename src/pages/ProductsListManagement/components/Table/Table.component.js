import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Avatar, Button} from "@material-ui/core";

const columns = [
    {id: 'action', label: 'عملیات', align: "center", minWidth: 200},
    {
        id: 'groupName',
        label: 'دسته بندی',
        minWidth: 500,
        align: 'center',
    },
    {
        id: 'productName',
        label: 'نام کالا',
        minWidth: 500,
        align: 'center',
    },
    {
        id: 'avatar',
        label: 'تصویر',
        minWidth: 40,
        align: 'center',
    },
];

function createData(id =0, imageSrc, productName, groupName) {
    let action = <div>
        <Button id={id} style={{margin: "3px"}} variant="contained" color="secondary"
                onClick={(event) => console.log(event.target)}>
            حذف
        </Button>
        <Button id={id} variant="contained" color="primary"
                onClick={(event) => console.log(event.target)}>
            ویرایش
        </Button>
    </div>
    let avatar = <Avatar alt={productName} src={imageSrc} />
    return {avatar, productName, groupName, action};
}

const rows = [
    createData(1, 'India', 'IN', 1324171354, 3287263),
    createData(2, 'China', 'CN', 1403500365, 9596961),
    createData(3, 'Italy', 'IT', 60483973, 301340),
    createData(4, 'United States', 'US', 327167434, 9833520),
    createData(5, 'Canada', 'CA', 37602103, 9984670),
    createData(6, 'Australia', 'AU', 25475400, 7692024),
    createData(7, 'Germany', 'DE', 83019200, 357578),
    createData(8, 'Ireland', 'IE', 4857000, 70273),
    createData(9, 'Mexico', 'MX', 126577691, 1972550),
    createData(10, 'Japan', 'JP', 126317000, 377973),
    createData(11, 'France', 'FR', 67022000, 640679),
    createData(12, 'United Kingdom', 'GB', 67545757, 242495),
    createData(13, 'Russia', 'RU', 146793744, 17098246),
    createData(14, 'Nigeria', 'NG', 200962417, 923768),
    createData(15, 'Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '80%',
    },
    container: {
        minHeight: 700,
        maxHeight: 700,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
