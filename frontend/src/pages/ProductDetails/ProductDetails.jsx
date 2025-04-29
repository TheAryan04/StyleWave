import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';

const ProductDetails = () => {

  const {products, currency, addToCart} = useContext(ShopContext);
  const {productId} = useParams();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      console.log('Product not found');
    }
    setLoading(false); // Set loading to false after fetching
  };
  useEffect(() => {
    fetchProductData();
  },[productId, products]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size.');
      return;
    }
    addToCart(productData._id, size);
  };
  return (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-container">
              {
                productData?.image?.map((item, index) => (
                  <img onClick={()=> setImage(item)} src={item} key={index} className="thumbnail" />
                ))
              }
            </div>
            <div className="main-image-container">
              <img src={image} alt="" className="main-image" />
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-name">{productData?.name} </h1>
            <hr className='product-divider' />
            <p className="product-price">{currency}{productData?.price} </p>
            <p className="product-description">{productData?.description}</p>
            <div className="size-selector">
              <p>Select Size</p>
              <div className="size-buttons">
                {
                  productData?.sizes?.map((item, index) => (
                    <button key={index} onClick={()=> setSize(item)} className={`size-button ${item === size ? 'active-size' : ''}`}>{item} </button>
                  ))
                }
              </div>
            </div>
            <hr className="product-divider" />
            <div className="product-policy">
              <p className="">Free Delivery</p>
              <p className="">Seamless and Secure payment</p>
              <p className="">Several payment options available</p>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">ADD TO CART</button>
          </div>
        </div>
        <div className="description-review-sect">
          <div className="tabs">
            <b className="tab active">Description</b>
            <p className="tab">Reviews</p>
          </div>
          <div className="description-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, neque accusantium! Omnis doloribus dolor adipisci!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A nemo explicabo dolorem!</p>
          </div>
        </div>
        <RelatedProducts category={productData?.category}/>
      </div>
    </div>
  )
}

export default ProductDetails;