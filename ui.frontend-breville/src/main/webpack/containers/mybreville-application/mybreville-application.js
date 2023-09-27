import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withAem } from 'xps-utils/withAem';
import { ScrollToTop } from 'xps-react/core/scroll-to-top';

import { routes } from './routes';
import { generateAppRoutes } from './utils';
import { MyBrevillePageTemplate as PageTemplate, MyBrevillePage as Page } from 'containers/mybreville-page-template';
import { MyBreville } from 'components/mybreville-components/mybreville';
import { fetchRequest, setAemData } from 'library/store/mybreville/actions';
import { selectFetch } from 'library/store/mybreville/selector';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const MyBrevilleApplication = ( { aemData } ) => {

  const isFetched = useSelector( selectFetch );

  // Dispatch initial user detail, user orders and user subscriptions to Redux store
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch( fetchRequest() );
    dispatch( setAemData( aemData ) );
  }, [] );

  // Generating flat structure for Routes
  const flatRoutes = generateAppRoutes( routes );

  const routeComponents = flatRoutes.map( ( route ) => (
    <Route key={ route.path } path={ route.path }>
      <Page route={ route } />
    </Route>
  ) );

  return (
    <div className='cmp-mybreville'>
      { isFetched && <PageTemplate routes = { flatRoutes }>
        <ScrollToTop />
        <Switch>
          { routeComponents }
          <Route><MyBreville /></Route>
        </Switch>
      </PageTemplate> }
    </div>
  );
};

MyBrevilleApplication.propTypes = {
  aemData: object
};

export default withAem( withAuthenticationRequired( MyBrevilleApplication ) );
