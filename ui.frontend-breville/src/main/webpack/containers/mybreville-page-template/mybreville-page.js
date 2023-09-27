import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationText } from 'library/store/mybreville/actions';
import { selectNotificationText, selectIsError } from 'library/store/mybreville/selector';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from 'components/mybreville-components/template/breadcrumbs';
import ActionNotification from 'xps-react/core/action-notification';
import { searchParams } from 'xps-utils/misc';

const MyBrevillePage = ( { route } ) => {

  const actionNotificationText = useSelector( selectNotificationText );
  const dispatch = useDispatch();
  const isError = useSelector( selectIsError );
  const location = useLocation();
  const params = searchParams( location.search );

  const PageBody = route.component;
  const { t } = useTranslation();

  const PageTitle = () => {
    const isMyMachineComponent = !!params.ProductName;
    switch ( isMyMachineComponent ){
      case true: return <h2 className='cmp-mybreville__page-title'>{ params.ProductName }</h2>;
      case false: return route.name ? <h2 className='cmp-mybreville__page-title'>{ t( route.name ) }</h2> : '';
      default: return <h2 className='cmp-mybreville__page-title'>{ t( route.name ) }</h2>;
    }
  };

  function handleClosePopup() {
    dispatch( setNotificationText( '' ) );
  }

  return (
    <div className='cmp-mybreville__page'>
      <Breadcrumbs route={ route } hideCurrentPage={ true } />
      <PageTitle />
      { actionNotificationText && <ActionNotification message={ actionNotificationText } isError={ isError } closeAction={ handleClosePopup } /> }
      <PageBody />
    </div>
  );
};

MyBrevillePage.propTypes = {
  routes: array
};

export default MyBrevillePage;
