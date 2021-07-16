import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {BASE_URL} from "../../configs/variable.config";


const useStyles = makeStyles({
    root: {
        width: 250,
        height:300,
    },
    cardbody:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center"
    },
    title:{
        alignItems:"center",
        textAlign:"center"
    },
    media: {
        height: 180,
        width:200,
    },
    price:{
        margin:7,
        fontSize:15,
        fontWeight:"bolder"
    },
    describtion:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-end"

    }
});

export default function Product(props) {
    console.log(props)
    const classes = useStyles();
    const data = props.data

    console.log( )
    return (
        <Card className={classes.root} onClick={()=>document.location.href=`/product?group=${data.groupname}&name=${data.name}&id=${data.id}`}>
            <CardActionArea className={classes.cardbody}>
                <CardMedia
                    className={classes.media}
                    image={`${BASE_URL}${data.image}`}
                    title={data.name}
                />
                <CardContent className={classes.describtion}>
                    <Typography className={classes.title} gutterBottom variant="h7" component="h2">
                        {data.name}
                    </Typography>
                    <Typography className={classes.price}  gutterBottom variant="h5" component="h2">
                        {`${new Number(data.price).toLocaleString("fa-IR")} تومان`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}