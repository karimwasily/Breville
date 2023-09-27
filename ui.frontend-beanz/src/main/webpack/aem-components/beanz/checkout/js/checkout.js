const QUERY = {
  ACCORDION_WRAPPER: '.cmp-teaser__checkout-left-wrapper',
  ACCORDION_NAV: '.cmp-container__checkout-payment-wrapper .tabs-nav',
  ACCORDION_CONT: '.cmp-teaser__checkout-custom-details',
  DETAILS_NAV: '.cmp-container__deatils-toggle',
  DETAILS_CONTENT: '.cmp-teaser__checkout-order--content-details'
};
// Checkout Accordion
const accordions = document.querySelectorAll( QUERY.ACCORDION_WRAPPER );
accordions.forEach( ( accordion ) => {
  const panels = accordion.querySelectorAll( QUERY.ACCORDION_CONT );
  panels.forEach( ( panel ) => {
    const navElem = panel.querySelector( QUERY.ACCORDION_NAV );
    navElem.addEventListener( 'click', () => {
      panels.forEach( ( otherPanel ) => {
        if ( otherPanel !== panel ) {
          otherPanel.classList.remove( 'accordion-expanded' );
        }
      } );
      panel.classList.toggle( 'accordion-expanded' );
    } );
  } );
} );


// Show Details in Smaller devices
const detailsShowNav = document.querySelector( QUERY.DETAILS_NAV );
const detailsContent = document.querySelector( QUERY.DETAILS_CONTENT );
if ( detailsShowNav ){
  detailsShowNav.addEventListener( 'click', function () {
    this.classList.toggle( 'show' );
    detailsContent.classList.toggle( 'accordion-expanded' );
  } );
}

// Animated placeholder for input box
const setActive = ( el, active ) => {
  const formField = el.parentNode.parentNode;
  const formFieldActive = 'cmp-form__checkout-form-field--is-active';
  const formFieldFilled = 'cmp-form__checkout-form-field--is-filled';
  `${ ( active ? formField.classList.add( formFieldActive ) :
    formField.classList.remove( formFieldActive ) ) }`;
  `${ ( el.value.length == 0 ? formField.classList.remove( formFieldFilled ) :
    formField.classList.add( formFieldFilled ) ) }`;
};
document
.querySelectorAll(
  '.cmp-form__checkout-form-field__input, .cmp-form__checkout-form-field__textarea'
)
.forEach( ( elem ) => {
  elem.addEventListener( 'blur', () => setActive( elem, false ) );
  elem.addEventListener( 'focus', () => setActive( elem, true ) );
} );
