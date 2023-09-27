import React from 'react';
import { string } from 'prop-types';

import { ComparisonList } from './ComparisonList';
import { ComparisonEmptyNotification } from './ComparisonEmptyNotification';
import { Button } from 'xps-react/core';
import { selectComparionList, selectIsComparing, selectSiteBaseUrl } from 'library/store/global/selector';
import { useDispatch, useSelector } from 'react-redux';
import { comparisonClose } from 'library/store/global/actions';

export const ComparisonBanner = ( { locale, category } ) => {
  const dispatch = useDispatch();
  const isComparing = useSelector( selectIsComparing );
  const comparisonList = useSelector( selectComparionList );
  const siteBaseUrl = useSelector( selectSiteBaseUrl );

  // * hide banner when not comparing
  if ( !isComparing ) {
    return null;
  }

  function closeBanner() {
    dispatch( comparisonClose() );
  }

  function gotoComparisonResults() {
    // ?compare=BES990,BES980,BES920,BES878&category=espresso
    window.location.href = `${ siteBaseUrl }/product-compare.html?compare=${ comparisonList.map( ( item ) => item.parentItemID ).join( ',' ) }&category=${ category }`;
  }

  return (
    <div className='cmp-comparison__banner'>
      <div className='cmp-comparison__banner-header'>
        <h3 className='cmp-comparison__banner-title'>
          Select up to 3 products to compare.
        </h3>
        <button
          onClick={ closeBanner }
          className='cmp-comparison__banner-close'
        ></button>
      </div>
      { comparisonList.length > 0 && (
        <div className='cmp-comparison__results'>
          <ComparisonList showRatings={ false } locale={ locale } />
          <ComparisonEmptyNotification />
          <Button
            className={ 'cmp-comparison__result-btn' }
            disabled={ comparisonList.length === 1 }
            onClick={ gotoComparisonResults }
          >
            Compare
          </Button>
        </div>
      ) }
    </div>
  );
};

ComparisonBanner.propTypes = {
  locale: string,
  category: string
};