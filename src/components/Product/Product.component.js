import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {BASE_URL} from "../../configs/variable.config";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 250,
        borderRadius:0,
        boxShadow:"none",
        border:"1px double #e0e0e0"
    },
    cardbody: {
        height: 350,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent:"space-between",

    },
    title: {
        alignItems: "center",
        textAlign: "right"
    },
    media: {
        height: 200,
        width: 200,
    },
    price: {
        marginTop:20,
        fontSize: 15,
        fontWeight:"bold"
    },
    describtion: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
    }
});

export default function Product(props) {
    const classes = useStyles();
    const history = useHistory()
    const data = props.data

    console.log()
    return (
        <Card className={classes.root}
              onClick={() => history.push(`/product/${data.id}`)}>
            <CardActionArea className={classes.cardbody}>
                <CardMedia
                    className={classes.media}
                    image={`${BASE_URL}${data.image}`}
                    title={data.name}
                />
                <CardContent className={classes.describtion}>
                    <Typography className={classes.title} gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography className={classes.price} gutterBottom variant="h5" component="h2">
                        {`${(+data.price).toLocaleString("fa-IR")} تومان`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}