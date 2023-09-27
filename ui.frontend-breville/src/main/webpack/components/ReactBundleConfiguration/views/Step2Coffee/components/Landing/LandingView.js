import React from 'react';
import { func, object } from 'prop-types';
import { BROWSE_TAB, QUESTIONNAIRE_TAB } from 'components/ReactBundleConfiguration/constants';

export const LandingView = ( { handleTab } ) => {
  // todo: react teaser component should swap anchor tag for button instead? refactor?
  const handleClick = ( event, tabId ) => {
    event.preventDefault();
    handleTab( tabId );
  };

  return (
    <div className='cmp-teaser cmp-teaser--landing-view'>
      <div className='cmp-teaser__image'>
        <div className='cmp-image'>
          <img
            src='/content/dam/breville-brands/coffee-solution/beanz-products-white@3x.png'
            className='cmp-image__image'
          />
        </div>
      </div>
      <div className='cmp-teaser__content'>
        <div className='cmp-teaser__pretitle'>
          Better beans<br />make better coffee.
        </div>
        <h1 className='cmp-teaser__title'>
          Breville is proud to partner with the best roasters in the country.
        </h1>
        <div className='cmp-teaser__description'>
          <p>How would you like to choose your coffee?</p>
        </div>
        <div className='cmp-teaser__action-container'>
          <a
            onClick={ ( event ) => handleClick( event, QUESTIONNAIRE_TAB ) }
            className='cmp-teaser__action-link'
            href='#'
          >
            Help Me Choose
          </a>
          <span className='cmp-teaser__action-link-divider'>or</span>
          <a
            onClick={ ( event ) => handleClick( event, BROWSE_TAB ) }
            className='cmp-teaser__action-link'
            href='#'
          >
            Browse Coffee Roasters
          </a>
        </div>
      </div>
    </div>
  );
};

LandingView.propTypes = {
  handleTab: func,
  tabs: object
};
