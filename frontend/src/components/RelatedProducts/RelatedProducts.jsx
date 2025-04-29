import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const RelatedProducts = ({category}) => {
    const {products} = useContext(ShopContext);
    const [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        if (!category || products.length === 0) return; // Prevent errors
    
        const related = products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
    
        setRelatedProduct(related.slice(0, 4)); // Get only 4 related products
      }, [category, products]); // Runs whenever `category` or `products` change
  return (
    <div>
        <div className="product-container">
            <div className="list_header">
                <h1>Related Products</h1>
                <hr className="divider" />
            </div>
            <div className="product-grid">
                {relatedProduct.length > 0 ? (
                    relatedProduct.map((product)=> (
                        <div className="product-card" key={product._id}>
                            <div className="product-image">
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.image[0]} alt="" />
                                </Link>
                            </div>
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No product is found in this category</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default RelatedProducts;