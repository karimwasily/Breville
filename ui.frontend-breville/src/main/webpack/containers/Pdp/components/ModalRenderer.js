import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { formatPrice } from 'xps-utils/normalize';
import { selectBaristaStarterKitName, selectBaristaStarterKitKEY, selectBaristaStarterKitPrices, selectBaristaStarterKitBox, selectBaristaStarterKitCallout, selectDigitalAssetKEY, selectDigitalAssetName, selectDigitalAssetDescription, selectDigitalAssetImages, selectDigitalAssetPrices } from 'library/store/bundle/selector';
import { ShowcaseTile } from 'components/ReactBundleConfiguration/views/Step3Bundle/components/ShowcaseTile/ShowcaseTile';
import { ModalContentWrapper } from './ModalContentWrapper';
import { withAem } from 'xps-utils/withAem';
import { Button } from 'xps-react/core';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';
import classNames from 'classnames';


// Barista Starter Kit
const BaristaStarterKitContent = ( { closeModal } ) => {
  const baristaStarterKitKEY = useSelector( selectBaristaStarterKitKEY );
  const baristaStarterKitName = useSelector( selectBaristaStarterKitName );
  const baristaStarterKitCallout = useSelector( selectBaristaStarterKitCallout );
  const baristaStarterKitPrices = useSelector( selectBaristaStarterKitPrices );
  const baristaStarterKitBox = useSelector( selectBaristaStarterKitBox );

  const baristaKitProps = {
    key: baristaStarterKitKEY,
    title: baristaStarterKitName,
    desc: baristaStarterKitCallout,
    carousel: baristaStarterKitBox,
    price: baristaStarterKitPrices?.[0]?.value ? formatPrice( baristaStarterKitPrices?.[0]?.value ) : null,
    isFree: true,
    customImageSliderSettings: {
      width: '670px',
      height: '370px',
      breakpoints: {
        767: {
          width: 'calc(100vw - 40px)',
          height: '180px'
        },
        991: {
          width: '530px',
          height: '300px'
        },
        1199: {
          width: '670px',
          height: '350px'
        },
        1439: {
          width: '850px',
          height: '450px'
        },
        2560: {
          width: '670px',
          height: '370px'
        }
      }
    }
  };

  return <ModalContentWrapper title='' description={ <ShowcaseTile { ...baristaKitProps } /> } closeModal={ closeModal } />;
};


// Digital Asset
const DigitalAssetContent = ( { closeModal } ) => {
  const digitalAssetKEY = useSelector( selectDigitalAssetKEY );
  const digitalAssetName = useSelector( selectDigitalAssetName );
  const digitalAssetDescription = useSelector( selectDigitalAssetDescription );
  const digitalAssetImages = useSelector( selectDigitalAssetImages );
  const digitalAssetPrices = useSelector( selectDigitalAssetPrices );

  const digitalAssetProps = {
    key: digitalAssetKEY,
    title: digitalAssetName,
    desc: digitalAssetDescription,
    image: { src: digitalAssetImages?.[0]?.url || '' },
    price: digitalAssetPrices?.[0]?.value ? formatPrice( digitalAssetPrices?.[0]?.value ) : null,
    isFree: true
  };

  return <ModalContentWrapper title='' description={ <ShowcaseTile { ...digitalAssetProps } /> } closeModal={ closeModal } />;
};


// Content Switch
const ModalContentSwitch = ( { bundleId, title, description, closeModal, showModal } ) => {

  const GetModalContent = () => {
    // TODO: to be changed to a more permanent solution rather than relying on the array index
    switch ( bundleId ) {
      case '1':
        return <ModalContentWrapper title={ title } description={ description } closeModal={ closeModal } />;
      case '2':
        return <BaristaStarterKitContent closeModal={ closeModal } />;
      case '3':
        return <DigitalAssetContent closeModal={ closeModal } />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={ showModal }
      onRequestClose={ closeModal }
      className='coffee-bundle-modal'
      overlayClassName='complete-coffee-overlay'
    >
      <GetModalContent />
    </Modal>
  );
};


// Main Renderer
const ModalRenderer = ( { productBundle, aemData } ) => {
  const [showModal, setIsOpen] = useState( false );

  if ( !Array.isArray( productBundle ) ) {
    return null;
  }

  const bundleDetails = productBundle.find( ( bundle ) => bundle.id === aemData.id );

  if ( !bundleDetails ) {
    return null;
  }

  function openModal( event ) {
    setIsOpen( true );
    document.getElementsByTagName( 'body' )[0].style.overflow = 'hidden';
  }

  function onKeyPressEvent( event ) {
    keypressEnterSpace( event, openModal );
  }

  function closeModal() {
    setIsOpen( false );
    document.getElementsByTagName( 'body' )[0].style.overflow = 'auto';
  }

  return (
    <>
      { bundleDetails.modalData?.map( ( modal, idx ) => {
        const modelContentSwitchProps = {
          bundleId: bundleDetails.id,
          title: modal.modalTitle || '',
          description: modal.modalDescription || '',
          closeModal,
          showModal
        };

        return (
          <div key={ idx }>
            <Button
              className='cmp-complete-coffee-bundle__area-bundles-bundles-tiles-action-link'
              size='small'
              colorScheme='none'
              onClick={ openModal }
              onKeyPress={ onKeyPressEvent }
            >{ modal.modalLinkText || '' }</Button>
            <ModalContentSwitch { ...modelContentSwitchProps } />
          </div>
        );
      } ) }
    </>
  );
};

export default withAem( ModalRenderer );