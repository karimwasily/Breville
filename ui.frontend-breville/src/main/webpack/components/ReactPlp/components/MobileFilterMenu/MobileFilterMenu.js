import React, { useState } from 'react';
import { bool, func, object, string, button } from 'prop-types';
import classNames from 'classnames';

import Button from 'components/shared-ui/button';
import { CustomCurrentRefinements, CustomRangeSlider, CustomRefinementList } from 'components/shared-ui/AlgoliaCustomWidgets';
/**
 * Mobile Filter Menu
 * @params {{isActive?: boolean, close: function, facetMenu: object}} param0
 * @returns {React.ReactElement}
 */
export const MobileFilterMenu = ( {
  isActive = false,
  close,
  facetMenu,
  showFeatureFilter,
  transformFeatureFilterItems,
  currencySymbol,
  filterOperator
} ) => {
  const [showFacetContainer, setShowFacetContainer] = useState( null );
  const [showApplyBtn, setShowApplyBtn] = useState( false );

  const selectFilter = ( facet ) => {
    return ( facet !== showFacetContainer ? setShowFacetContainer( facet ) : setShowFacetContainer( null ) );
  };

  function handleRefinements( items ) {
    if ( items.length > 0 && !showApplyBtn ) setShowApplyBtn( true );
    if ( items.length === 0 && showApplyBtn ) setShowApplyBtn( false );
  }

  function handleSelectFilterWrap( filter ) {
    return function () {
      selectFilter( filter );
    };
  }

  return (
    <div className={ classNames( 'mobile-filter-menu', { hidden: !isActive } ) }>
      <div className='mobile-filter-menu__header'>
        <h3 className='mobile-filter-menu__title'>Filter</h3>
        <button onClick={ close } className='mobile-filter-menu__cancel'></button>
      </div>
      <ul className='mobile-filter-menu__list'>
        <li className={ classNames( 'mobile-filter-menu__item', { hidden: !showFeatureFilter } ) }>
          <div className='mobile-filter-menu__item-text' onClick={ handleSelectFilterWrap( facetMenu.FEATURES ) } onKeyUp={ handleSelectFilterWrap( facetMenu.FEATURES ) } role={ button } tabIndex={ 0 }>
            Features
            <span className={ classNames( 'mobile-filter-menu__item-icon', { 'mobile-filter-menu__item-icon-active': showFacetContainer === facetMenu.FEATURES } ) }></span>
          </div>

          <div className={ classNames( 'feature-container', { hidden: showFacetContainer !== facetMenu.FEATURES } ) }>
            <CustomRefinementList
              attribute={ facetMenu.FEATURES } className={ classNames( 'facet-features', { hidden: showFacetContainer !== facetMenu.FEATURES } ) }
              transformItems={ transformFeatureFilterItems }
              operator={ filterOperator }
            />
          </div>
        </li>

        <li className='mobile-filter-menu__item'>
          <div className='mobile-filter-menu__item-text' onClick={ handleSelectFilterWrap( facetMenu.PRICE ) } onKeyUp={ handleSelectFilterWrap( facetMenu.PRICE ) } role={ button } tabIndex={ 0 }>
            Price Range
            <span className={ classNames( 'mobile-filter-menu__item-icon', { 'mobile-filter-menu__item-icon-active': showFacetContainer === facetMenu.PRICE } ) }></span>
          </div>
          <div className={ classNames( 'facet-container', { hidden: showFacetContainer !== facetMenu.PRICE } ) }>
            <CustomRangeSlider
              attribute={ facetMenu.PRICE }
              className={ classNames( 'facet-price', { hidden: showFacetContainer !== facetMenu.PRICE } ) }
              currencySymbol={ currencySymbol }
            />
          </div>
        </li>
      </ul>
      <div className='mobile-filter-fixed-buttons'>
        { showApplyBtn && (
          <div className='mobile-filter-select__actions'>
            <Button
              colorScheme='green'
              size='large'
              onClick={ close }
              className='mobile-filter-select__apply-btn'
            >
              Apply
            </Button>
          </div>
        ) }
        <div className='mobile-filter-clear__actions'>
          <CustomCurrentRefinements
            translations={{ reset: 'Clear Filters' }}
            handleItems={ handleRefinements }
          />
        </div>
      </div>
    </div>
  );
};

MobileFilterMenu.defaultProps = {
  isActive: false
};

MobileFilterMenu.propTypes = {
  isActive: bool,
  close: func,
  facetMenu: object,
  showFeatureFilter: bool,
  transformFeatureFilterItems: func,
  currencySymbol: string,
  filterOperator: string
};
