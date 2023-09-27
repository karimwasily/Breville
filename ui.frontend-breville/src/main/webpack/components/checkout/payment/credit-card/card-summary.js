import React from 'react';
import { useSelector } from 'react-redux';
import { selectCardInfo } from 'library/store/payment/selector';
import { Image } from 'components/shared-ui/image';

const cardName = {
  mc: 'Master Card',
  visa: 'Visa Card',
  amex: 'Amex Card'
};

const CardSummary = () => {

  const cardInfo = useSelector( selectCardInfo );

  const { brandImageUrl, brand } = cardInfo;
  const name = cardName[brand] || 'Card';

  return (
    <div className='shipping-valid'>
      <div className='shipping-valid__card'>
        <h4 className='shipping-valid__title'>Payment method</h4>
        <p className='shipping-valid__txt'>{ name }</p>
      </div>
    </div>
  );

};

export default CardSummary;