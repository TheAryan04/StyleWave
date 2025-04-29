import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../../App.jsx";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import './List.css';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const removeProduct = async(_id) => {
    try {
      const response = await axios.post(backendUrl + '/api/v2/product/remove', {_id}, { headers: {token}});
      if(response.data.success){
        toast.success(response.data.message)
        console.log(response.data.message)

        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v2/product/list", {
        headers: { token },
      });
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);
  return (
    <div>
      <p className="product-title">Product List</p>
      <div className="product-list-container">
        <div className="product-table-title">
          <b className="">Image</b>
          <b className="">Name</b>
          <b className="">Category</b>
          <b className="">Price</b>
          <b className="action-title">Action</b>
        </div>
        {/* Product list */}
        {/* Product list */}
        {list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div key={index} className="product-row">
                <img
                  src={item.image && item.image.length > 0 ? item.image[0] : "fallback_image_url"} // Add fallback image if no image is available
                  alt={item.name}
                  className="product-image"
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency}{item.price}
                </p>
                <MdDeleteForever
                  className="product-action"
                  onClick={() => removeProduct(item._id)} // Call removeProduct on click
                />
              </div>
            );
          })
        ) : (
          <p>No products available</p> // Display a message when list is empty
        )}
      </div>
    </div>
  );
};

export default List;
