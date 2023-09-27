import React from 'react';
import ProductWarrantyCard from 'components/shared-ui/ProductWarrantyCard';
import RemoveProduct from 'containers/RemoveProduct';
import WarrantySvg from 'resources/svgs/warranty-1.svg';
import Proptypes from 'prop-types';
import { Row, Col } from 'xps-react/core';
import { getColorSwatchImage } from '../../../library/utils/getColorSwatchImage';
import { Image } from '../image';

const ProductDetailCard = ( props ) => {
  const {
    readonly,
    totalPrice,
    quantity,
    name,
    warranty,
    variant: {
      images = [],
      attributesRaw: {
        WEB_TS_COLOUR,
        WEB_TS_WARRANTY,
        productType
      } = {}
    } = {},
    isDynamicBundle, id
  } = props;

  return (
    <>
      <Row noGutters={ true } className='coffee-bundle-breakdown-product'>
        <Col md='6' xs='12'>
          <div className='coffee-bundle-breakdown-product--detail'>
            <div className='coffee-bundle-breakdown__thumbnail'>
              <img src={ images[0]?.url } alt={ name } className='selectitem__img' />
            </div>
            <div className='coffee-bundle-breakdown__description'>
              <h3 className='coffee-bundle-breakdown__description--title'>{ name }</h3>
              <div className='coffee-bundle-breakdown__description--price'>
                <h4 className='price-amount'>{ totalPrice }</h4>
              </div>
              { /* NOT MVP
            <Selector options={ options } selectedOption={ selectedOption } />
             */ }


              { WEB_TS_COLOUR && <p className='coffee-bundle-breakdown__description--color-swatch-container'>
                <Image className='color-swatch' src={ getColorSwatchImage( WEB_TS_COLOUR ) } alt={ WEB_TS_COLOUR } />
                <span className='ml-10'>{ WEB_TS_COLOUR }</span>
              </p> }

              { WEB_TS_WARRANTY && <p className='coffee-bundle-breakdown__description--warranty mt-10'>
                <WarrantySvg style={{ minWidth: 19 }} /><span className='ml-10'>{ WEB_TS_WARRANTY }</span>
              </p> }
              <div className='coffee-bundle-breakdown__description--quantity'>
                <p className='quantity-count'>Qty:{ quantity }</p>
                { /* NOTE: Not MVP { !readonly && <Button type='link' className='edit-selection'>Edit Selections</Button> } */ }
              </div>
            </div>
          </div>
        </Col>
        <Col md='2' smHide className='coffee-bundle-breakdown-product--quantity'>
          <p className='quantity-count'>{ quantity }</p>
        </Col>
        { !readonly && <RemoveProduct productId={ id } isDynamicBundle={ isDynamicBundle }>
          <p>Are you sure you want to remove a <strong>{ name }</strong>?</p>
          </RemoveProduct>
        }
        <Col md='2' smHide className='coffee-bundle-breakdown-product--price'>
          <h4 className='price-amount'>{ totalPrice }</h4>
          { /* NOTE: Not MVP { !readonly &&
          <Button type='link' className='edit-selection'>Edit Selections</Button>
        } */ }
        </Col>
      </Row>
      { productType === 'FG' && !readonly &&
        <Row noGutters= { true }>
          <Col md='10' xs='12'>
            <ProductWarrantyCard warrantyList={ warranty } productName={ name } defaultWarranty={ WEB_TS_WARRANTY } />
          </Col>
        </Row>
      }
    </>
  );
};

ProductDetailCard.propTypes = {
  readonly: Proptypes.bool
};

export default ProductDetailCard;
