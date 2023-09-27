import React from 'react';
import { object, string } from 'prop-types';

const ProductTile = ({ 
  product,
  productpath
}) => {
  const createURL = (v)=>{
    if (typeof(v)==='string') {
      return v.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    } return ''
  }
  return (
    <div className="cmp-container-beanz-search__coffee--item">
      <div className="cmp-container-beanz-search__coffee--media">
        <a href={productpath+createURL(product.productName)+'.html'} className="cmp-text-beanz-search__coffee--media-a">
          <img src={product.tile_image} alt="" title={product.productName} width="120" className="cmp-image-beanz-search__coffee--image"></img>
          <div className="cmp-container-beanz-search__coffee--media-body">
            <div className="cmp-text-beanz-search__coffee--product-catergory">{product.Our_Roasters}</div>
            <div className="cmp-text-beanz-search__coffee--product-title">{product.productName}</div>
          </div>
        </a>
      </div>
    </div>
  );
};

ProductTile.propTypes = {
  product: object,
  productpath: string
};

export default ProductTile;
