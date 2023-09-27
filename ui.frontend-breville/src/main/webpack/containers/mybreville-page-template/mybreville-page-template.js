import React from 'react';
import { array, node } from 'prop-types';
import { Grid, Row, Col } from 'xps-react/core/layout';
import UserWidget from 'components/mybreville-components/template/user-widget';
import SideNavigation from 'components/mybreville-components/template/side-navigation';
import { selectDerivedUserDetail } from 'library/store/mybreville/selector';
import { useSelector } from 'react-redux';

const MyBrevillePageTemplate = ( { routes, children } ) => {

  const userDetail = useSelector( selectDerivedUserDetail );
  const { FirstName, LastName } = userDetail || {};


  return (
    <Grid fluid className='cmp-mybreville-template'>
      <Row>
        <Col md={ 3 } className='cmp-mybreville-template__left-column'>
          <UserWidget firstName={ FirstName } lastName={ LastName } />
          <SideNavigation routes = { routes } />
        </Col>
        <Col md={ 9 } className='cmp-mybreville-template__right-column'>
          { children }
        </Col>
      </Row>
    </Grid>
  );
};

MyBrevillePageTemplate.propTypes = {
  routes: array,
  children: node
};

export default MyBrevillePageTemplate;
