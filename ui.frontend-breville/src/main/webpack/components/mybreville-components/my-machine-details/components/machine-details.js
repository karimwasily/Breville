import React from 'react';
import { object, array, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDateLongMonth } from 'components/mybreville-components/my-orders/helpers';
import { productNameConversion } from 'components/mybreville-components/mybreville/helper';

import ProductTile from './product-tile';
import SubscriptionProduct from 'components/mybreville-components/mybreville/components/subscription-product';

const MachineDetails = ( {
  productDetails,
  subscriptionDataWithOrderDetails,
  isSubscriptions
} ) => {

  const { t } = useTranslation();
  const AMOUNT_OF_SUBSCRIPTION = 2;

  return (
    <div className='my-machine-details'>
      <div className='registered-product-tile'>
        <ProductTile
          productDetails={{
            ...productDetails,
            ProductNumber: productDetails?.Product_AX_Item_Number__c,
            productName: productNameConversion( productDetails?.Item_Description__c ),
            convertedNameForMachineProduct: productNameConversion( productDetails?.Item_Description__c, true ),
            formattedExtendedWarrantyDate: formatDateLongMonth( productDetails.EW_End__c )
          }}
        />
        { subscriptionDataWithOrderDetails?.length > 0 &&
          <>
            <SubscriptionProduct data={ subscriptionDataWithOrderDetails } tileCount={ AMOUNT_OF_SUBSCRIPTION } />
            { isSubscriptions &&
            <Link to='/my-subscriptions' className='subscription__header'>
              { t( 'eh-label-subscription-product-view-all-subscriptions' ) }
            </Link>
                }
          </>
        }
      </div>
    </div>
  );
};

MachineDetails.propTypes = {
  productDetails: object,
  subscriptionDataWithOrderDetails: array,
  isSubscriptions: bool
};

export default MachineDetails;
