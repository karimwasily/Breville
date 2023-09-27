
function init() {
  const OPEN_MENU_SELECTOR = 'is-open';
  const REGION_MODAL_CONTENTS = 'modal-contents';

  // General Selectors
  const navDrpdownBtn = document.querySelectorAll( '.cmp-dropdown__btn' );

  // Search Selectors
  const searchElem = document.querySelector( '.cmp-navigation__item--search' );
  const searchMenuIsClosedButton = document.querySelector( '.cmp-item__search-search' );
  const searchMenuIsOpenButton = document.querySelector( '.cmp-item__search-close' );

  // Hamburger Menu Selectors
  const hamburgerMenuBtn = document.querySelector( '.cmp-navigation__item--hamburger .cmp-navigation__link' );
  const hamburgerMenu = document.querySelector( '.cmp-hamburger__menu' );
  const hamburgerMenuBgOverlay = document.querySelector( '.cmp-hamburger__menu-bg-overlay' );
  const hamburgerClose = document.querySelector( '.cmp-hamburger_close' );
  const products = document.querySelector( '.products_hamburger_menu_item' );
  const parts = document.querySelector( '.parts_hamburger_menu_item' );
  const region = document.querySelector( '.region_hamburger_menu_item' );
  const hamburgerMenuHeaderRegion = document.querySelector( '.cmp-hamburger__menu-header--region' );

  // Region Selectors
  const regionDropDown = document.querySelector( '.cmp-hamburger__country-overlay' );
  const regionSelectDesktop = document.querySelector( '.cmp-region__region-select--desktop' );
  const regionSelectMobile = document.querySelector( '.cmp-region__region-select--mobile' );
  const regionModal = document.querySelector( '.bg-modal' );
  const regionOverlayClose = document.querySelector( '.close' );
  const regionOverlayCancel = document.querySelector( '.region-cancel-btn' );
  const continueBtn = document.querySelector( '.region-continue-btn' );
  const navItem = document.querySelector( '.cmp-navigation__item--country' );

  let isOpenProducts = false;
  let isOpenParts = false;
  let isOpenRegion = false;

  // Desktop Menu Dropdowns
  navDrpdownBtn.forEach( ( button ) => {
    button && button.addEventListener( 'click', () => {
      if ( button.parentNode.classList.contains( OPEN_MENU_SELECTOR ) ) {
        button.parentNode.classList.remove( OPEN_MENU_SELECTOR );
      }
      else {
        closeAllOpenMenus();
        button.parentNode.classList.add( OPEN_MENU_SELECTOR );
      }

      // additional logic based on interacting with the menu
      if ( button.parentNode.classList.contains( 'cmp-navigation__item--search' ) ) {
        handleSearchButtonDisplay();
      }
    } );
  } );

  // search
  function handleSearchButtonDisplay( ) {
    if ( searchElem && searchElem.classList.contains( OPEN_MENU_SELECTOR ) ) {
      searchMenuIsClosedButton && searchMenuIsClosedButton.classList.add( 'cmp-item__search-search--hidden' );
      searchMenuIsOpenButton && searchMenuIsOpenButton.classList.remove( 'cmp-item__search-close--hidden' );

      // add focus to the search input when opened (react may have not mounted input yet so we check here)
      const searchInput = searchElem.querySelector( 'input[type="search"]' );
      searchInput && searchInput.focus();
    }
    else {
      searchMenuIsClosedButton && searchMenuIsClosedButton.classList.remove( 'cmp-item__search-search--hidden' );
      searchMenuIsOpenButton && searchMenuIsOpenButton.classList.add( 'cmp-item__search-close--hidden' );
    }
  }

  // Desktop Region Modal Overlay
  regionSelectDesktop && regionSelectDesktop.addEventListener( 'change', function ( ele ) {
    const index = ele.target.selectedIndex;
    const regionUrl = ele.target.options[index].getAttribute( 'data-default-url' );
    continueBtn && continueBtn.setAttribute( 'href', regionUrl );
    navItem && navItem.classList.remove( 'is-open' );
    document.querySelector( '.bg-modal' ).style.display = 'flex';
    document.querySelector( '.btn-close' ).focus();
    document.querySelector( 'body' ).style.overflow = 'hidden';
  } );

  // Desktop Region Modal Overlay Close Button
  regionOverlayClose && regionOverlayClose.addEventListener( 'click', function () {
    closeRegionModal();
  } );

  // Desktop Region Modal Overlay Cancel Button
  regionOverlayCancel && regionOverlayCancel.addEventListener( 'click', function () {
    closeRegionModal();
  } );

  // Close Desktop Region Modal on Escape Key Press
  document.addEventListener( 'keyup', ( event )=>{
    if ( event.code === 'Escape' ){
      closeRegionModal();
    }
  } );

  // Close Desktop Region Modal on Background Click
  document.addEventListener( 'click', ( event ) => {
    // check if we are clicking on the modal contents
    function checkClickedOnRegionModal( clickedElem ) {
      return Boolean( clickedElem.closest( `.${ REGION_MODAL_CONTENTS }` ) );
    }

    if ( !checkClickedOnRegionModal( event.target ) ) {
      closeRegionModal();
    }
  } );

  // close any active menu when doc is clicked
  document.addEventListener( 'click', ( event ) => {
    // check if we are clicking on an active menu
    function checkClickedOnActiveMenu( clickedElem ) {
      return Boolean( clickedElem.closest( `.${ OPEN_MENU_SELECTOR }` ) );
    }

    if ( !checkClickedOnActiveMenu( event.target ) ) {
      closeAllOpenMenus();
    }

    handleSearchButtonDisplay();
  } );

  function closeRegionModal() {
    // Close Region Modal Overlay
    if ( regionModal ) regionModal.style.display = 'none';
    document.querySelector( 'body' ).style.overflow = 'auto';
    // Close Region Overlay
    if ( regionDropDown ) regionDropDown.style.display = 'none';
    isOpenRegion = false;
    // Reset Region Dropdown
    if ( regionSelectDesktop ) regionSelectDesktop.selectedIndex = 0;
    if ( regionSelectMobile ) regionSelectMobile.selectedIndex = 0;
  }

  function closeAllOpenMenus() {
    const elem = document.querySelector( `.${ OPEN_MENU_SELECTOR }` );
    if ( elem ) elem.classList.remove( OPEN_MENU_SELECTOR );
  }

  // mobile hamburger menu
  hamburgerMenuBtn && hamburgerMenuBtn.addEventListener( 'click', () => {
    hamburgerMenu.style.display = 'block';
    hamburgerMenuBgOverlay.style.display = 'block';
  } );
  hamburgerClose && hamburgerClose.addEventListener( 'click', () => {
    hamburgerMenu.style.display = '';
    hamburgerMenuBgOverlay.style.display = '';
  } );
  hamburgerMenuBgOverlay && hamburgerMenuBgOverlay.addEventListener( 'click', () => {
    hamburgerMenu.style.display = '';
    hamburgerMenuBgOverlay.style.display = '';
  } );

  // Products mobile
  products && products.addEventListener( 'click', function (){
    const productsDropdown = document.querySelector( '.cmp-hamburger__products-overlay' );
    if ( isOpenProducts ){
      productsDropdown.style.display = 'none';
      isOpenProducts = false;
    }
    else {
      productsDropdown.style.display = 'block';
      isOpenProducts = true;
    }
  } );

  // Parts mobile
  parts && parts.addEventListener( 'click', function (){
    const partsDropdown = document.querySelector( '.cmp-hamburger__parts-overlay' );
    if ( isOpenParts ){
      partsDropdown.style.display = 'none';
      isOpenParts = false;
    }
    else {
      partsDropdown.style.display = 'block';
      isOpenParts = true;
    }
  } );

  // Region mobile
  region && region.addEventListener( 'click', function ( event ){
    event.stopPropagation();


    if ( !isOpenRegion ){
      regionDropDown.style.display = 'block';
      isOpenRegion = true;

      hamburgerMenuHeaderRegion && hamburgerMenuHeaderRegion.addEventListener( 'click', function ( event ){
        event.stopPropagation();
        regionDropDown.style.display = 'none';
        isOpenRegion = false;
      } );
    }
  } );

  // Mobile Region Modal Overlay
  regionSelectMobile && regionSelectMobile.addEventListener( 'change', function ( ele ) {
    const index = ele.target.selectedIndex;
    const regionUrl = ele.target.options[index].getAttribute( 'data-default-url' );
    continueBtn && continueBtn.setAttribute( 'href', regionUrl );
    navItem && navItem.classList.remove( 'is-open' );
    document.querySelector( '.bg-modal' ).style.display = 'flex';
    document.querySelector( '.btn-close' ).focus();
    document.querySelector( 'body' ).style.overflow = 'hidden';
    // Close Mobile Region Modal on Background Click
    document.addEventListener( 'click', ( event ) => {
    // check if we are clicking on the modal contents
      function checkClickedOnRegionModal( clickedElem ) {
        return Boolean( clickedElem.closest( `.${ REGION_MODAL_CONTENTS }` ) );
      }

      if ( !checkClickedOnRegionModal( event.target ) ) {
        closeRegionModal();
      }
    } );
  } );

  // Click Event for Region Modal Overlay Close Button
  regionOverlayClose && regionOverlayClose.addEventListener( 'click', function () {
    closeRegionModal();
  } );

  // Click Event for Region Modal Overlay Cancel Button
  regionOverlayCancel && regionOverlayCancel.addEventListener( 'click', function () {
    closeRegionModal();
  } );
}

// initialise the header js script
document.addEventListener( 'DOMContentLoaded', init );
