import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ShowcaseTile } from './components/ShowcaseTile/ShowcaseTile';
import { selectMachine, selectCoffee, selectMachineName, selectMachineImage, selectMachineDisplayPrice, selectBundleDiscountPercentage, selectNumberOfCoffeeBags, selectDigitalAssetName, selectDigitalAssetDescription, selectDigitalAssetImages, selectDigitalAssetPrices, selectDigitalAssetID, selectBaristaStarterKitName, selectBaristaStarterKitDescription, selectBaristaStarterKitKEY, selectDigitalAssetKEY, selectBaristaStarterKitPrices, selectMachineKEY, selectBaristaStarterKitBox, selectBaristaStarterKitCallout } from 'library/store/bundle/selector';
import { selectCurrencySymbol } from 'library/store/global/selector';
import { useDispatch, useSelector } from 'react-redux';
import { addBundleToCart, fetchAssociatedDynamicBundle, setView } from 'library/store/bundle/actions';
import { calcDiscountPriceUS } from 'library/utils/createDiscountPriceUS';
import { BUNDLE_SUMMARY_VIEW, COFFEE_CONFIG_VIEW, MACHINE_CONFIG_VIEW } from 'components/ReactBundleConfiguration/constants';
import { roundPriceUS } from 'library/utils/roundPriceUS';
import { formatPrice } from 'xps-utils/normalize';

export const BundleConfiguration = () => {
  const machine = useSelector( selectMachine );
  const machineKEY = useSelector( selectMachineKEY );
  const machineName = useSelector( selectMachineName );
  const machineImage = useSelector( selectMachineImage );
  const machineDisplayPrice = useSelector( selectMachineDisplayPrice );
  const coffee = useSelector( selectCoffee );
  const currencySymbol = useSelector( selectCurrencySymbol );
  const bundleDiscountPercentage = useSelector( selectBundleDiscountPercentage );
  const numOfCoffeeBags = useSelector( selectNumberOfCoffeeBags );

  // barista starter kit
  const baristaStarterKitKEY = useSelector( selectBaristaStarterKitKEY );
  const baristaStarterKitName = useSelector( selectBaristaStarterKitName );
  const baristaStarterKitCallout = useSelector( selectBaristaStarterKitCallout );
  const baristaStarterKitPrices = useSelector( selectBaristaStarterKitPrices );
  const baristaStarterKitBox = useSelector( selectBaristaStarterKitBox );

  // digital asset
  const digitalAssetKEY = useSelector( selectDigitalAssetKEY );
  const digitalAssetName = useSelector( selectDigitalAssetName );
  const digitalAssetDescription = useSelector( selectDigitalAssetDescription );
  const digitalAssetImages = useSelector( selectDigitalAssetImages );
  const digitalAssetPrices = useSelector( selectDigitalAssetPrices );

  const dispatch = useDispatch();
  const history = useHistory();

  const discountCoffeePrice = calcDiscountPriceUS( coffee?.retailPriceMap, bundleDiscountPercentage );
  const bagTotal = roundPriceUS( numOfCoffeeBags * Number( discountCoffeePrice ) );

  useEffect( () => {
    dispatch( setView( BUNDLE_SUMMARY_VIEW ) );
  }, [] );

  useEffect( () => {
    if ( !machineKEY ) return;
    dispatch( fetchAssociatedDynamicBundle( { key: machineKEY, expand: true } ) );
  }, [machineKEY] );

  // redirect user to relevant page if they have not added all the required products for the summary
  useEffect( () => {
    if ( !machine ) {
      history.push( MACHINE_CONFIG_VIEW );
    }
    else if ( !coffee ){
      history.push( COFFEE_CONFIG_VIEW );
    }
  }, [coffee, machine] );

  function handleSubmit() {
    dispatch( addBundleToCart() );
  }

  return (
    <Layout machineName={ machineName } discount={ bundleDiscountPercentage } handleSubmit={ handleSubmit }>
      { /* summary */ }
      <div className='bundle-conf__summary'>
        { /* item 1 - machine summary */ }
        { machine && (
          <div className='summary-machine'>
            <img src={ machineImage } alt='' className='summary-machine__image' />
            <div className='summary-machine__content'>
              <h4 className='summary-machine__title'>{ machineName }</h4>
              <p className='summary-machine__price'>{ machineDisplayPrice }</p>
              <Link to={ MACHINE_CONFIG_VIEW } className='summary-machine__link'>
                Edit Machine Selection
              </Link>
            </div>
          </div>
        ) }
        { /* item 2 - coffee summary */ }
        { coffee && (
          <div className='summary-coffee'>
            <img
              src={ coffee.tile_image }
              alt=''
              className='summary-coffee__image'
            />
            <div className='summary-coffee__content'>
              <div className='summary-coffee__title_group'>
                <h4 className='summary-coffee__title'>Beanz 3 Month Offer </h4>
                <span className='summary-coffee__badge'>{ bundleDiscountPercentage }% off</span>
              </div>

              <p className='summary-coffee__item'>{ coffee.title }</p>
              <p className='summary-coffee__desc'>
                2 bags (12oz) every 2 weeks
                <br />
                { numOfCoffeeBags } Bags Total with <b>free shipping</b>
              </p>
              <p className='summary-coffee__price-info'>
                <span className='summary-coffee__price-before'>{ coffee.displayPrice }</span>
                <span className='summary-coffee__price-amount'>
                  { currencySymbol }{ discountCoffeePrice } per bag
                </span>
                <span className='summary-coffee__price-total'>
                  (Total { currencySymbol }{ bagTotal })
                </span>
              </p>
              <Link to={ COFFEE_CONFIG_VIEW } className='summary-coffee__link'>
                Edit Coffee Selection
              </Link>
            </div>
          </div>
        ) }
      </div>

      { /* included free */ }
      <h2 className='bundle-conf__free-title'>
        Included free with your bundle
      </h2>

      { /* barista starter kit */ }
      <ShowcaseTile
        key={ baristaStarterKitKEY }
        title={ baristaStarterKitName }
        desc={ baristaStarterKitCallout }
        carousel={ baristaStarterKitBox }
        price={ baristaStarterKitPrices?.[0]?.value ? formatPrice( baristaStarterKitPrices?.[0]?.value ) : null }
        isFree={ true }
      />

      { /* digital asset */ }
      <ShowcaseTile
        key={ digitalAssetKEY }
        title={ digitalAssetName }
        desc={ digitalAssetDescription }
        image={{ src: digitalAssetImages?.[0]?.url }}
        price={ digitalAssetPrices?.[0]?.value ? formatPrice( digitalAssetPrices?.[0]?.value ) : null }
        isFree={ true }
      />

    </Layout>
  );
};
