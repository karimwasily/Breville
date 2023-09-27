import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePayment, selectCardInfo } from 'library/store/payment/selector';
import { selectRedirectResult } from 'library/store/ui/selectors';
import { selectLineItems } from 'library/store/cart/selector';
import CardSummary from './credit-card/card-summary';
import AffirmSvg from 'resources/svgs/affirm.svg';
import PaypalSvg from 'resources/svgs/pay-pal-large.svg';

export default ()=>{

  const activePayment = useSelector( selectActivePayment );
  const redirectResult = useSelector( selectRedirectResult );
  const lineItems = useSelector( selectLineItems );
  const cardInfo = useSelector( selectCardInfo );

  function getTitle(){
    const { parent, child, standard = [] } = lineItems;
    const productNames = standard.map( ( each )=>{
      const current = parent[each] || child[each] || {};
      return current.name;
    } );

    return productNames.join( ', ' );
  }

  function getPaymentIcon(){
    if ( redirectResult ) return <AffirmSvg />;
    if ( activePayment === 'PayPal' ) return <PaypalSvg />;
  }

  const title = redirectResult ? getTitle() : 'Payment method';

  if ( activePayment === 'Credit Card' ) return <CardSummary />;

  return (
    <div className='shipping-valid'>
      <div className='shipping-valid__card'>
        <h4 className='shipping-valid__title'>{ title }</h4>
        <p className='shipping-valid__txt'>{ getPaymentIcon() }</p>
      </div>
    </div>
  );
};