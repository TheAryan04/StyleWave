import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { MdDelete } from "react-icons/md";
import CartTotal from "../../components/CartTotal/CartTotal"; // Check this import!
import './Cart.css';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0 || !cartItems || typeof cartItems !== "object") {
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
      Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          id: itemId,
          size,
          quantity,
        }))
    );
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div>
      <div className="cart-content-container">
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.id);

            return (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  {productData?.image?.[0] ? (
                    <img
                      src={productData.image[0]}
                      alt={productData.name || "Product Image"}
                      className="product-cart-image"
                    />
                  ) : null}

                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData?.name}</p>
                    <div className="product-price-size">
                      <p className="cart-product-price">
                        {currency}
                        {productData?.price}
                      </p>
                      <p className="size">{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  className="quantity-input"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) {
                      updateQuantity(item.id, item.size, value);
                    }
                  }}
                />

                <MdDelete className="delete-icon" onClick={() => updateQuantity(item.id, item.size, 0)} />
              </div>
            );
          })
        ) : (
          <p>No items in cart</p>
        )}
      </div>

      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button className="checkout-button" onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
