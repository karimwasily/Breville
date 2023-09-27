import React, { useState, useEffect } from 'react';
import { array } from 'prop-types';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';
import OrderListComponents from './order-list-components';

const LoadMore = ( { orders } ) => {

  const { t } = useTranslation();
  const initialListItems = 6;
  const loadMoreItems = 6;
  const loadButton = orders.length > initialListItems;
  const initialList = orders?.slice( 0, initialListItems );

  const [ordersList, setOrdersList] = useState( initialList );
  const [offSet, setOffSet] = useState( initialListItems );
  const [showButton, setShowButton] = useState( loadButton );

  useEffect( () => {
    setOrdersList( initialList );
    setShowButton( loadButton );
  }, [orders] );

  function handleClick() {
    const startValue = offSet;
    const newOffset = startValue + loadMoreItems;
    const showMoreItems = orders.slice( 0, newOffset );
    const newList = orders.slice( startValue, newOffset );
    const nextLimit = newOffset + loadMoreItems;
    const nextList = orders.slice( newOffset, nextLimit );
    setOffSet( newOffset );
    setOrdersList( showMoreItems );
    newList.length < initialListItems || nextList.length < 1 ? setShowButton( false ) : setShowButton( true );
  }

  return (
    <div data-testid='orders-load-more'>
      <OrderListComponents orders={ ordersList } />
      { !!showButton && (
        <div className='cmp-button-load-more'>
          <Button
            disabled={ false }
            children={ t( 'eh-button-load-more' ) }
            onClick={ handleClick }
          />
        </div> )
      }
    </div>
  );
};

LoadMore.propTypes = {
  orders: array
};

export default LoadMore;
