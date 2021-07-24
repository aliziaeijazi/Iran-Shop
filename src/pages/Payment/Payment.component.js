import error from "../../asset/images/error.png"
import success from "../../asset/images/success.png"
import {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {AddOrder, EditCount, EditPrice_Count, FeachProduct} from "../../api/store.api";

function Payment() {
    const data = {
        successfull: {
            imageSrc: success,
            text: "با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد."
        },
        failed: {imageSrc: error, text: 'پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.'}
    }
    const [status, setStatus] = useState("failed")
    // const [requset , setrequest] = useState([])
    const calculateSum_UpdateCount = async (data) => {
        let Sum = 0
        for(let i = 0 ; i<data.length ; i++)
        {
            const target = data[i]
            const productDetail = await FeachProduct(target.id)
            EditPrice_Count({id:target.id , count:productDetail.count - target.counter}, "count")
            Sum += target.counter * target.price
        }
        return Sum

    }
    useEffect(async () => {
        const statusFromServer = document.location.href.split("status=")[1]
        setStatus(statusFromServer=="true" ? "successfull" : "failed")
        if (status == "successfull") {
            const Basket = await JSON.parse(localStorage.getItem("BasketList"))
            const Order = await JSON.parse(localStorage.getItem("Order"))
            if (Order && Basket) {
                const Sum = await calculateSum_UpdateCount(Basket)
                const Data = {
                    name: Order.name,
                    family: Order.family,
                    phone: Order.phoneNumber,
                    deliveryTime: Order.deliveryDate,
                    sumBuying: Sum,
                    endDeliveriTime: "",
                    status: "false",
                    product: Basket,
                    address:Order.address
                }
                try{
                    await AddOrder(Data)
                    localStorage.removeItem("BasketList")
                    localStorage.removeItem("Order")
                }catch (e){
                    console.log("errrod" , e)
                }

            }
        }
    })
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "70vh"
        }}>
            <img style={{width: 300}} src={data[status].imageSrc}/>
            <Typography style={{width: 300, margin: 50}}>{data[status].text}</Typography>
        </div>)
}

export {Payment}