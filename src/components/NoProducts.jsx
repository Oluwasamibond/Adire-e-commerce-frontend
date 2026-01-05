import React from "react";
import "../componentStyles/NoProducts.css";

function NoProducts({keyword}) {
  return (
    <div className="no-product-content">
      <div className="no-products-icon"></div>
      <h3 className="no-products-title">No Products Found</h3>
      <p className="no-products-message">
        {keyword
          ? `Sorry, we couldn't find any products matching "${keyword}". Please try a different search term.`
          : "There are currently no products available. Please check back later or explore other categories."}
      </p>
    </div>
  );
}

export default NoProducts;
