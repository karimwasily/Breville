import React from 'react';
import { useDispatch } from 'react-redux';
import { string, number, bool } from 'prop-types';
import { Grid, Row, Col } from 'xps-react/core';
import { QuantityInput } from 'xps-react/core/quantity-input';
import RemoveProduct from 'containers/RemoveProduct';
import ProductWarrantyCard from 'components/shared-ui/ProductWarrantyCard';
import { updateQuantity } from 'library/store/cart/actions';
import WarrantySvg from 'resources/svgs/warranty-1.svg';

const CardSummaryBundle = ( props ) => {

  const { name, price, quantity, readonly, totalPrice, variant = {}, isBundle, isDynamicBundle, id, warranty } = props;
  const shouldHide = isBundle || readonly;
  const { images = [], attributesRaw: { WEB_TS_WARRANTY, productType } = {} } = variant;
  const dispatch = useDispatch();

  function onPlus( quantity ){
    dispatch( updateQuantity( { productId: id, quantity } ) );
  }

  function onMinus( quantity ){
    dispatch( updateQuantity( { productId: id, quantity } ) );
  }

  function getWarrantyTag( breakpoint ){

    if ( !WEB_TS_WARRANTY || typeof WEB_TS_WARRANTY !== 'string' ) return null;
    return ( <div className={ breakpoint }><div className='display-flex' >
      <WarrantySvg style={{ minWidth: 19 }} />
      <p className='cart-bundle-summary__warranty ml-10'>{ WEB_TS_WARRANTY }</p>
    </div></div> );
  }

  return (
    <Grid className='cart-bundle-summary'>
      <Row noGutters={ true }>
        <Col md='6' xs='4' >
          <div className='cart-bundle-summary__thumnail_title'>
            <div className='cart-bundle-summary__thumbnail'>
              <img src={ images[0]?.url } alt={ name } />
            </div>
            <div className='display-flex flex-direction-column sm-up'>
              <h2 className='cart-bundle-summary__title--desktop'>{ name }</h2>
              { getWarrantyTag( 'lg-up' ) }
            </div>
          </div>
        </Col>
        <Col md='2' xs='2' smHide>
          { !shouldHide && <div className='cart-bundle-summary__price'>{ price }</div> }
        </Col>
        <Col md='2' xs='8' >
          <h2 className='cart-bundle-summary__title--mobile'>{ name }</h2>
          { !shouldHide && <div className='cart-bundle-summary__price--mobile'>{ price }</div> }
          { getWarrantyTag( 'sm-down' ) }
          <span className='cart-bundle-summary__quantity--mobile'>Qty: { quantity }</span>
          { !shouldHide && <QuantityInput value={ quantity } onPlus={ onPlus } onMinus={ onMinus } /> }
          { ( readonly || isBundle ) && <strong className='cart-bundle-summary__quantity'> { quantity }</strong> || '' }
          { /* this is non mvp
          { !readonly &&
            <a className='cart-bundle-summary__save-later' onClick={ onSaveLater } href='javascript:;'>Save For Later</a>
          } */ }
          { !shouldHide && <div className='cart-bundle-summary__total--mobile'>
            Total: <span>{ totalPrice || '--' }</span>
          </div> }
        </Col>
        { !readonly && <RemoveProduct productId={ id } isDynamicBundle={ isDynamicBundle }>
          <p>Are you sure you want to remove a <strong>{ name }</strong>?</p>
          </RemoveProduct>
        }
        <Col md='2' xs='3' smHide>
          { !shouldHide && <div className='cart-bundle-summary__total'>{ totalPrice || '--' }</div> }
        </Col>
      </Row>

      { productType === 'FG' && !readonly &&
        <Row noGutters={ true }>
          <Col md={ 10 } xs='12' className='mt-20'>
            <ProductWarrantyCard
              warrantyList={ warranty }
              productName={ name }
              defaultWarranty={ WEB_TS_WARRANTY }
            />
          </Col>
        </Row>
      }

    </Grid> );

};

CardSummaryBundle.propTypes = {
  name: string,
  price: number,
  imageThb: string,
  quantity: string,
  readonly: bool,
  imageAlt: string,
  isBundle: bool
};

export default CardSummaryBundle;
