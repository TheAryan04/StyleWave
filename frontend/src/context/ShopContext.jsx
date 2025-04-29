import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [token, setToken] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const navigate = useNavigate();

  // Function to add items to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size to continue");
      return;
    }

    const token = localStorage.getItem("token"); // ✅ Ensure token is retrieved

    if (!token) {
      toast.error("You need to log in first!");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/v2/cart/add",
        { itemId, size },
        {
          headers: { token }, // ✅ Send token in headers
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCartItems((prevCart) => {
          const updatedCart = { ...prevCart }; // ✅ Declare updatedCart here

          if (!updatedCart[itemId]) {
            updatedCart[itemId] = { [size]: 1 };
          } else {
            updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
          }

          return updatedCart;
        });

        console.log(
          `Product added to cart: ItemId - ${itemId}, size - ${size}`
        );
        toast.success("Product added to cart");
      } else {
        toast.error(response.data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // function to get the amount of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  // function to update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if(token){
        try {
            await axios.post(backendUrl + '/api/v2/cart/update', {itemId, size, quantity}, {headers: {token}, withCredentials: true,})
        } catch (error){
            console.log(error);
            toast.error(error.message);
        }
    }
  };

  const getUserCart = async(token) => {
    try {
        const response = await axios.post(backendUrl + '/api/v2/cart/get', {}, {headers:{token}, withCredentials: true,})
        if(response.data.success){
            setCartItems(response.data.cartData);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  // function to get the cart total
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v2/product/list");
      // console.log(response.data);  // This will log the products data returned from your backend
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!token &&storedToken) {
      setToken(storedToken);
      getUserCart(localStorage.getItem('token'));
    //   console.log("Stored Token:", storedToken); // Debugging line
    }
  }, []);

  const value = {
    products,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    delivery_fee,
    navigate,
    token,
    setToken,
    setCartItems
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
