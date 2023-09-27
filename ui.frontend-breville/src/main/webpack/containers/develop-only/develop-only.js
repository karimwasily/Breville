import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createNewCart, setWait } from 'library/store/cart/actions';

import { selectWait } from 'library/store/cart/selector';

const DevelopOnly = () => {

  const [next, setNext] = useState( false );

  const dispatch = useDispatch();

  const wait = useSelector( selectWait );

  const history = useHistory();


  useEffect( () => {
    if ( next && !wait ) {
      setNext( false );
      history.push( '/cart' );
      history.go( 0 );
    }
  }, [next, wait] );

  function handleAddBundle() {


    localStorage.removeItem( 'cartID' );
    localStorage.removeItem( 'refresh_token' );
    localStorage.removeItem( 'access_token' );

    setNext( true );

    dispatch( setWait( true ) );

    const options = {
      variables:
        { draft: { currency: 'USD', country: 'US',
          taxMode: 'Platform',
          lineItems: [
            {
              sku: 'dyn_bnd_BES880BSS1BUS1',
              quantity: 1,
              distributionChannel: {
                typeId: 'channel',
                key: 'breville-web-us'
              }
            },
            {
              sku: 'BES880BSS1BUS1',
              quantity: 1,
              custom: {
                typeKey: 'lineitemoption',
                fields: [
                  {
                    name: 'parent_dynamic_bundle',
                    value: '"dyn_bnd_BES880BSS1BUS1"'
                  }, {
                    name: 'is_part_of_dynamic_bundle',
                    value: 'true'
                  }
                ]
              },
              distributionChannel: {
                typeId: 'channel',
                key: 'breville-web-us'
              }
            },
            {
              sku: 'MBZ31827CWA02012Z_PLAN_WEEKLY_2',
              quantity: 1,
              custom: {
                typeKey: 'lineitemoption',
                fields: [
                  {
                    name: 'parent_dynamic_bundle',
                    value: '"dyn_bnd_BES880BSS1BUS1"'
                  }, {
                    name: 'is_part_of_dynamic_bundle',
                    value: 'true'
                  },
                  {
                    name: 'Grind',
                    value: '"test"'
                  },
                  {
                    name: 'Subscription_plan_id',
                    value: '"test 02"'
                  }
                ]
              },
              distributionChannel: {
                typeId: 'channel',
                key: 'beanz-web-us'
              }
            }, {
              sku: 'BDC455BSS1BUS1',
              quantity: 1,
              distributionChannel: {
                typeId: 'channel',
                key: 'breville-web-us'
              }
            }
          ]
        }
        }
    };

    const params = { options };
    dispatch( createNewCart( { params } ) );
    // clearLocalStorage();
    // createBundleCart().then( ( response ) => {
    //   // history.push( '/cart' );
    //   localStorage.setItem( 'cartID', response.data.createMyCart.id );
    //   alert( 'cart with bundle created' );
    // } );
  }

  return (
    <div className='develop-only'>
      <h3>DEVELOP PAGE</h3>
      <h4>For development work only - to be removed</h4>
      <button className='develop-only__btn' onClick={ handleAddBundle }>
        Create New Cart
      </button>
    </div>
  );

};

export default DevelopOnly;
