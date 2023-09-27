import React from 'react';
import { object, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { pathTo } from 'containers/mybreville-application/utils';
import { NavLink } from 'react-router-dom';


const Breadcrumbs = ( { route, hideCurrentPage } ) => {

  const { t } = useTranslation();

  const breadcrumb = pathTo( route ).map( ( { path, name }, index, breadcrumbs ) => {
    if ( hideCurrentPage && ( index === breadcrumbs.length - 1 ) ) {
      return;
    }
    else {
      return (
        <div key={ index } className='cmp-mybreville__breadcrumb-item'>
          <span className='cmp-mybreville__breadcrumb-item-mobile'>
            <span className='cmp-mybreville__breadcrumb-item-mobile-arrow'></span>
            <span className='cmp-mybreville__breadcrumb-item-mobile-text'></span>{ `${ t( 'eh-label-breadcrumb-back-to' ) } ` }
          </span>
          <NavLink to={ path }>{ t( name ) }</NavLink>
          <span className='cmp-mybreville__breadcrumb-item-separator'>|</span>
        </div>
      );
    }
  } );

  return (
    <nav className='cmp-mybreville__breadcrumbs'>
      { breadcrumb }
    </nav>
  );
};

Breadcrumbs.propTypes = {
  route: object,
  hideCurrentPage: bool
};

export default Breadcrumbs;
