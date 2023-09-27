import React from 'react';
import PropTypes from 'prop-types';

const Hit = ({ hit, aemData, handleClick }) => {
    const { productName, tile_image, displayPrice, Our_Roasters, Coffee_Flavors } = hit;
    return (
      <div className="cmp-container__plp--card-item">
        <a href={`${aemData.productPagePath}${handleClick(productName)}.html`} className="cmp-text__plp--item-gotocart"></a>
        <div className="cmp-container__plp--card-item-img-box">
          <img className="cmp-image__plp--card-item-image" src={tile_image} alt={productName} />
        </div>
        <div className="cmp-container__plp--card-item-body">
          <div className="cmp-text__plp-card--item-roaster-name">{Our_Roasters}</div>
          <h4 className="cmp-text__plp--card-item-name">{productName}</h4>
          <p className="cmp-text__plp--card-item-darkroast">{Coffee_Flavors}</p>
          <b className="cmp-text__plp--card-item-price">{displayPrice}</b>
          <div className="cmp-container__plp--card-item-btn-container">
            <a href={`${aemData.productPagePath}${handleClick(productName)}.html`}>
              <button className="cmp-button__plp--card-item-buy-now">View</button>
            </a>
          </div>
          <p className="cmp-text__plp--card-item-subscribe-save">Subscribe &amp; enjoy Free Shipping. Minimum of 2 bags per delivery applies.</p>
        </div>
      </div>
    );
  };

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  aemData: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Hit;
