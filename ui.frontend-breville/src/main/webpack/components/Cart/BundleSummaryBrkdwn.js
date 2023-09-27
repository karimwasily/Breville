import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';
import ProductDetailCard from 'components/shared-ui/ProductDetailCard/ProductDetailCard';
import { FreeBundle } from 'components/free-bundle';
import Hr from 'components/shared-ui/Hr';
import SubscriptionSummary from 'components/Cart/SubscriptionSummary';
import Proptypes from 'prop-types';

const BundleSummaryBrkdwn = ( props ) => {
  const { readonly, parent = {}, child = {} } = props;
  const { standard = [], subscription = [], giftItems = [] } = parent;

  function ProductList(){
    return standard.map( ( each )=>( <React.Fragment key={ each }>
      <Hr className='my-40' />
      <ProductDetailCard { ...child[each] } readonly={ readonly } isDynamicBundle />
    </React.Fragment> ) );
  }

  function Subcription(){
    if ( !subscription.length ) return null;
    const currentSubcription = child[subscription[0]] || {};
    const { variant: { images } = {}, name, discounted, price, totalPrice, originalTotalPrice, quantity, id } = currentSubcription;

    return ( <SubscriptionSummary
      title='Beanz Trial Subscription'
      thumbnail={ images[0]?.url }
      imageAlt={ name }
      coffee={ name }
      quantity={ `12 Bags Total, ${ quantity } bags (First Shipment)` }
      badge='20% off'
      oldPrice={ price }
      newPrice={ discounted }
      oldTotalPrice={ originalTotalPrice }
      newTotalPrice={ totalPrice }
      readonly={ readonly }
      productId={ id }
    >
      <p>
        The Beanz Trial Subscription provides you with a one year subscription at 20% off, plus free shipping. By signing up, you are committed to your 20% off trial subscription for the purchase of 12 bags.
      </p>
      <p>
        Your default delivery schedule will be 2 bags every 2 weeks. You can modify your delivery schedule or bean selection anytime at Beanz.com.
      </p>
      <p>
        When your trial ends, it will convert to a regular Beanz subscription. You will be notified in advance and have the opportunity to cancel if you wish.
      </p>
    </SubscriptionSummary> );
  }

  return (
    <div className='coffee-bundle'>
      <Grid className='coffee-bundle-breakdown'>
        <ProductList />
        { Boolean( subscription.length ) &&
          <Row noGutters={ true }>
            <Col lg='10' xs='12'>
              <Hr className='my-40' /><Subcription />
            </Col>
          </Row>
        }
        { Boolean( giftItems.length ) &&
          <Row noGutters={ true }>
            <Col lg='10' xs='12'>
              <Hr className='my-40' />
              <FreeBundle
                title='Free with your complete coffee bundle'
                giftItems={ giftItems }
                productList={ child }
              />
            </Col>
          </Row>
        }
      </Grid>
    </div>
  );
};

BundleSummaryBrkdwn.propTypes = {
  readonly: Proptypes.bool
};

export default BundleSummaryBrkdwn;
