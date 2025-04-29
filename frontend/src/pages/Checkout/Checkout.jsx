import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import stripe from '../../assets/stripe_logo.png';
import razorpay from '../../assets/razorpay_logo.png';
import CartTotal from '../../components/CartTotal/CartTotal';
import './Checkout.css';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';
import axios from 'axios';

const Checkout = () => {
  const [method, setMethod] = useState("cod");
  const { cartItems, setCartItems, getCartAmount, delivery_fee, products, token, navigate } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value}));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product.id === items)
            );

            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + '/api/v2/order/place',
            orderData,
            { headers: { "Content-Type": "application/json", "token":token, }, withCredentials: true,}
          );
          // console.log(response.data);
          if(response.data.success){
            setCartItems({});
            navigate("/orders");
          }
          else{
            toast.error(response.data.message);
          }
          
          break;
        
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <form className='form-container' onSubmit={onSubmitHandler}>
        <div className="form-left">
          <fieldset className='payment-method'>
            <legend>Payment Method</legend>
            <div className="payment-options">
              <div className={`payment-option ${method === "stripe" ? "selected" : ""}`} onClick={()=> setMethod("stripe")}>
                <img src={stripe} alt="" className='payment-logo'/>
              </div>
              <div className={`payment-option ${method === "razorpay" ? "selected" : ""}`} onClick={()=> setMethod("razorpay")}>
                <img src={razorpay} alt="" className="payment-logo" />
              </div>
              <div className={`payment-option ${method === "cod" ? "selected" : ""}`} onClick={()=> setMethod("cod")}>
                <span className="payment-text">CASH ON DELIVERY</span>
              </div>
            </div>
          </fieldset>
          <div className="form-title">
            <h2>Shipping Address</h2>
          </div>
          <div className="form-row">
            <input type="text" name='firstName' value={formData.firstName} onChange={onChangeHandler} className="form-input" placeholder='First Name'/>
            <input type="text" name='lastName' value={formData.lastName} onChange={onChangeHandler} className="form-input" placeholder='Last Name'/>
          </div>
          <input type="email" name="email" value={formData.email} onChange={onChangeHandler} className='form-input' placeholder='Email Address'/>
          <input type="number" name="phone" value={formData.phone} onChange={onChangeHandler} className='form-input' placeholder='Phone Number'/>
          <input type="text" name="street" value={formData.street} onChange={onChangeHandler} className='form-input' placeholder='Street Address'/>
          <div className="form-row">
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} className="form-input" placeholder='City'/>
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} className="form-input" placeholder='State'/>
          </div>
          <div className="form-row">
            <input type="text" name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="form-input" placeholder='Zipcode'/>
            <input type="text" name="country" value={formData.country} onChange={onChangeHandler} className="form-input" placeholder='Country'/>
          </div>
        </div>

        <div className="form-right">
          <CartTotal />
          <div className="form-submit">
            <button type="submit" className='submit-button'>PLACE ORDER</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout;