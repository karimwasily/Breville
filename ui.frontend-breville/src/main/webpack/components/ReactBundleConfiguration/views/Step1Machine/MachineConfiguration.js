import React, { useEffect } from 'react';
import { SelectProduct } from './components/SelectProduct';
import { CategoryTile } from './components/CategoryTile/CategoryTile';
import { Flex } from 'shared-ui/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDynamicBundleProductCategories, initBundleCategorySelection, setMachine, setView } from 'library/store/bundle/actions';
import {
  COFFEE_CONFIG_VIEW,
  MACHINE_CONFIG_VIEW
} from 'components/ReactBundleConfiguration/constants';
import { useHistory } from 'react-router-dom';
import { Button } from 'xps-react/core';
import { selectAvailableMachines, selectDynamicBundleProductCategories, selectMachine, selectSelectedBundleCategory } from 'library/store/bundle/selector';
import { selectLocale, selectSiteRootPath } from 'library/store/global/selector';
import { useTranslation } from 'react-i18next';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';
import classNames from 'classnames';

export const MachineConfiguration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const machines = useSelector( selectAvailableMachines );
  const selectedMachine = useSelector( selectMachine );
  const selectedCategory = useSelector( selectSelectedBundleCategory );
  const locale = useSelector( selectLocale );
  const siteRootPath = useSelector( selectSiteRootPath );
  const machineSeries = useSelector( selectDynamicBundleProductCategories );

  useEffect( () => {
    dispatch( setView( MACHINE_CONFIG_VIEW ) );
    dispatch( fetchDynamicBundleProductCategories() );
  }, [] );

  function handleCategorySelectionWrap( categoryItem ) {
    return function () {
      dispatch( initBundleCategorySelection( categoryItem ) );
    };
  }
  function handleCategorySelectionKeypressWrap( categoryItem ) {
    return function ( event ) {
      keypressEnterSpace( event, () => {
        dispatch( initBundleCategorySelection( categoryItem ) );
      } );
    };
  }

  function handleProductSelection( parentProduct, variant ) {
    dispatch( setMachine( { parent: parentProduct, variant } ) );
  }

  function handleNextStep() {
    history.push( COFFEE_CONFIG_VIEW );
  }
  function handleNextStepKeypress( event ) {
    keypressEnterSpace( event, handleNextStep );
  }

  if ( !machineSeries?.length ) return null;

  return (
    <main className='machine-conf'>
      <h2 className='machine-conf__category-title'>Select Your Machine</h2>
      <div className='machine-conf__category-subtitle'>
        Choose a Series to view Machine Options
      </div>

      <Flex className='machine-conf__category-list'>
        { machineSeries.map( ( category ) => (
          <div
            key={ category.id }
            className={ classNames(
                'machine-conf__category-list-item',
                { 'machine-conf__category-list-item--selected': category.id === selectedCategory?.id }
            ) }
            onClick={ handleCategorySelectionWrap( category ) }
            onKeyPress={ handleCategorySelectionKeypressWrap( category ) }
            role='button'
            tabIndex={ 0 }
          >
            <CategoryTile
              title={ category?.name }
              subheading={ category?.description }
              imageUrl={ category?.custom.customFieldsRaw[0]?.value }
            />
          </div>
        ) ) }
      </Flex>

      { ( selectedCategory && machines?.length > 0 ) && (
        <SelectProduct
          categoryTitle={ selectedCategory.title }
          products={ machines }
          selectedParentProduct={ selectedMachine }
          handleProductSelection={ handleProductSelection }
          locale={ locale }
        />
      ) }

      <div className={ `machine-conf__section-link ${ selectedCategory ? 'machine-conf__section-link--selected-series' : '' }` }>
        <a href={ `${ siteRootPath }/products/espresso.html` } className='machine-conf__section-link-shop-all'>
          { t( 'cs-shop-all-machines' ) }
        </a>
      </div>

      { machines && (
        <div className='machine-conf__section-next'>
          <Button
            size='medium'
            onClick={ handleNextStep }
            onKeyPress={ handleNextStepKeypress }
            textType='bold'
            colorScheme='green'
            className='machine-conf__section-next-button'
            disabled={ selectedMachine === null }
          >{ t( 'cs-next-choose-coffee' ) }</Button>
        </div>
      ) }
    </main>
  );
};
