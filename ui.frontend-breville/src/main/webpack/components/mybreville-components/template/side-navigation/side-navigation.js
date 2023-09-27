import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGeneralAemData } from 'library/store/mybreville/selector';
import { array } from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { ActionModal } from 'xps-react/core';

const SideNavigation = ( { routes } ) => {
  const elementRef = useRef();
  const { t } = useTranslation();
  const BREAKPOINT_MD = 769;
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [openSupportPopupModal, setOpenSupportPopupModal] = useState( false );
  const aemData = useSelector( selectGeneralAemData );
  const [active, setActive] = useState( '/' );
  const { pathname } = useLocation();

  function changeOverlay( e ) {
    const element = e.target;
    if ( element?.scrollWidth - element?.scrollLeft === element?.clientWidth && ( window.innerWidth < BREAKPOINT_MD ) ) {
      element.className = 'cmp-side-navigation__group-left-overlay';
    }
    else {
      element.className = 'cmp-side-navigation__group';
    }
  }

  function smoothScrolToSelection() {
    const list = elementRef?.current;
    var element = list?.querySelector( '.cmp-side-navigation__group__item-active' );
    if ( window.innerWidth < BREAKPOINT_MD ) {
      element?.scrollIntoView( { behavior: 'smooth', block: 'center', inline: 'center' } );
    }
  }
  function setActiveLinkForNav(){
    routes.map( ( { path } ) => {
      if ( path !== '/my-machine-details' ) {
        const urlString = pathname;
        const urlArray = urlString?.split( '/' );
        const matchPath = urlArray?.find( ( result ) => result === path?.substring( 1 ) );
        if ( matchPath || ( path === '/' && urlString === '/' ) ) {
          setActive( path );
        }
      }
    } );
  }

  function handleLogin() {
    loginWithRedirect();
  }

  function handleLogout() {
    logout( { returnTo: window.location.origin } );
  }

  function showSupportPopup() {
    setOpenSupportPopupModal( true );
  }
  function hideSupportPopup() {
    setOpenSupportPopupModal( false );
  }
  function doRedirectToSupportPage() {
    if ( aemData?.brevilleSupportUrl ) {
      window.open( aemData.brevilleSupportUrl, '_blank', 'noopener noreferrer' );
      hideSupportPopup();
    }
    else {
      console.log( 'Support URL is not available' );
    }
  }

  useEffect( () => {
    smoothScrolToSelection();
    window.addEventListener( 'resize', smoothScrolToSelection );

    return () => {
      window.removeEventListener( 'resize', smoothScrolToSelection );
    };
  }, [] );

  useEffect( () => {
    setActiveLinkForNav();
  }, [pathname] );

  const menuLink = [];
  routes.map( ( { path, name, hideInNav }, index ) => {
    if ( !hideInNav ) {
      const route = (
        <li
          className='cmp-side-navigation__group__item' key={ index }
        >
          <NavLink
            className={ active === path ? 'cmp-side-navigation__group__item-active' : '' } to={ path }
          >{ t( name ) }</NavLink>
        </li>
      );
      if ( path === '/' ) menuLink.unshift( route );
      else menuLink.push( route );
    }
  } );

  return (
    <div className='cmp-side-navigation--dashbaord'>
      <div className='cmp-side-navigation'>
        <ul ref={ elementRef } onScroll={ changeOverlay } className='cmp-side-navigation__group' >
          { menuLink }
          <li
            className='cmp-side-navigation__group__item' key='97'
          >
            <a href={ void 0 } onClick={ showSupportPopup } tabIndex='0'>{ t( 'eh-page-title-support' ) }</a>
          </li>
          { !isAuthenticated ? (
            <li className='cmp-side-navigation__group__item' key='98'>
              <a href={ void 0 } onClick={ handleLogin } tabIndex='0'>{ t( 'eh-label-login' ) }</a>
            </li>
          ) : (
            <li className='cmp-side-navigation__group__item' key='99'>
              <a href={ void 0 } onClick={ handleLogout } tabIndex='0'>{ t( 'eh-label-logout' ) }</a>
            </li>
          ) }
        </ul>
      </div>

      <ActionModal isModalOpen= { openSupportPopupModal }
        title={ t( 'eh-text-support-hub' ) }
        cancelText={ t( 'eh-button-cancel' ) }
        onCancel={ hideSupportPopup }
        ctaText={ t( 'eh-text-support-hub' ) }
        onCta={ doRedirectToSupportPage }
        onModalClosed={ hideSupportPopup }
      >
        { t( 'eh-text-redirect-pagename', { pagename: t( 'eh-text-support-hub' ) } ) }
      </ActionModal>
    </div>
  );
};

SideNavigation.propTypes = {
  routes: array
};

export default SideNavigation;
