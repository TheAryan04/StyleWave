import React, { useState } from "react";
import placeholder from "../../assets/Placeholder.png";
import "./Add.css";
import axios from "axios";
import { backendUrl } from "../../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);


  // Submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1 ? image1 : null);
      image2 && formData.append("image2", image2 ? image2 : null);
      image3 && formData.append("image3", image3 ? image3 : null);
      image4 && formData.append("image4", image4 ? image4 : null);

      const response = await axios.post(
        backendUrl + "/api/v2/product/add",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if(response.data.success){
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="form-container">
      <div>
        <p className="form-label">Upload Images</p>
        <div className="image-upload-container">
          <label htmlFor="image1">
            <img
              src={!image1 ? placeholder : URL.createObjectURL(image1)}
              alt="Preview 1"
              className="upload-preview"
            />
            <input
              type="file"
              id="image1"
              hidden
              accept="image/*"
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          <label htmlFor="image2">
            <img
              src={!image2 ? placeholder : URL.createObjectURL(image2)}
              alt="Preview 2"
              className="upload-preview"
            />
            <input
              type="file"
              id="image2"
              hidden
              accept="image/*"
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? placeholder : URL.createObjectURL(image3)}
              alt="Preview 3"
              className="upload-preview"
            />
            <input
              type="file"
              id="image3"
              hidden
              accept="image/*"
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? placeholder : URL.createObjectURL(image4)}
              alt="Preview 4"
              className="upload-preview"
            />
            <input
              type="file"
              id="image4"
              hidden
              accept="image/*"
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="form-group">
        <p className="form-label">Product name</p>
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-input"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <p className="form-label">Product description</p>
        <textarea
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="form-input"
          placeholder="Enter product description"
          required
        />
      </div>

      <div className="form-group-horizontal">
        <div>
          <p className="form-label">Product category</p>
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="form-select"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="form-label">Product price</p>
          <input
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="form-input price-input"
            placeholder="00"
            required
          />
        </div>
      </div>

      <div>
        <p className="form-label">Product Sizes</p>
        <div className="size-options">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`size-option ${sizes.includes(size) ? "selected" : ""}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="checkbox-group">
        <input
          id="bestsellerCheckbox"
          name="bestseller"
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          className="check"
        />
        <label htmlFor="bestsellerCheckbox">Add to bestseller</label>
      </div>

      <button type="submit" className="submit-button">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
