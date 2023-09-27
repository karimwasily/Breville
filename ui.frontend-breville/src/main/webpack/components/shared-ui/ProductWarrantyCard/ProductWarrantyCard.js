import React from 'react';
import { useSelector } from 'react-redux';
import { number } from 'prop-types';
import { Row, Col, Button } from 'xps-react/core';
import Warranty from 'containers/Warranty';
import { selectWarrantyDetail } from 'library/store/cart/selector';
import MulberrySvg from 'resources/svgs/mulberry-vertical.svg';

// NOTE: This component needs to refactored to be reusable
const ProductWarrantyCard = ( props ) => {
  const { warrantyList = {} } = props;
  const warrantyDetails = useSelector( selectWarrantyDetail );
  const least = Object.values( warrantyList )[0];
  const { formattedPrice } = warrantyDetails[least] || {};

  function handleDetailClick(){
    window.mulberry.faq.open();
  }
  return (
    <Row noGutters={ true } className='product-warranty-card'>
      <Col md='7' xs='12'>
        <div className='breakdown__wrty-description'>
          <div className='mr-20'>
            <MulberrySvg width='44' height='50' viewBox='0 0 49 56' className='mt-5' />
          </div>
          <div className='breakdown__wrty-detail'>
            <h5>Add Breville®Care Extended Warranty.</h5>
            <p>Starting at { formattedPrice }
              &nbsp;
              <Button size='small' type='link' textType='normal' onClick={ handleDetailClick }>Details</Button>
            </p>
          </div>
        </div>
      </Col>
      <Col md='2' smHide>

      </Col>
      <Col md='3' xs='12'>
        <div className='breakdown__button-add-wrap'>
          <Warranty { ...props } />
        </div>
      </Col>
    </Row> );
};

ProductWarrantyCard.propTypes = {
  price: number
};

export default ProductWarrantyCard;
