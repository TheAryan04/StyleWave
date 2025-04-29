import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { backendUrl } from '../../App';
import axios from 'axios';

const Order = () => {
    const {token, currency} = useContext(ShopContext);

    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + '/api/v2/order/userorders', {}, {headers:{ "Content-Type": "application/json", "token":token, },});
            // console.log(response.data);
            if(response.data.success){
                let allOrdersItem = []

                response.data.orders.map((order)=> {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;

                        allOrdersItem.push(item);
                    })
                })
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        loadOrderData()
    },[token]);
  return (
    <div>
        <div className="orders-container">
            <div className="order-title">
                <h1>My Orders</h1>
            </div>
            <div className="">
                {
                    orderData.map((item, index) => (
                        <div key={index} className="order-item-container">
                            <div className="order-item-details">
                                <img src={item.image[0]} alt="" className="order-item-image" />
                                <div className="">
                                    <p className="order-item-name">{item.name} </p>
                                    <div className="order-item-info">
                                        <p className="">{currency}{item.price} </p>
                                        <p className="">Quantity: {item.quantity} </p>
                                        <p className="">Size: {item.size}</p>
                                    </div>
                                    <p className=""> Date: <span>{new Date(item.date).toLocaleString()}</span></p>
                                    <p className="">Payment: <span>{item.paymentMethod} </span></p>
                                </div>
                            </div>
                            <div className="order-item-status-container">
                                <div className="order-item-status">
                                    <p className="status-indicator"></p>
                                    <p className="">{item.status} </p>
                                </div>
                                <button onClick={loadOrderData()} className="track-order-btn"> Track Order</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Order;