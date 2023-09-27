import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import { selectCoverageDetails, selectWarrantyDetail } from 'library/store/cart/selector';
import WarrantyCard from './WarrantyCard';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { Button } from 'xps-react/core';

const defaultWarrantyList = [
  'Limited warranty, valid beginning at date of purchase',
  'Full, no cost replacement upon material, part, or workmanship defect',
  'Extended warranties for some component parts may be available'
];

const WarrantyTemplate = ( props ) => {
  const [selectedIndex, setSelectedIndex] = useState( null );
  const { onCloseModal, productName, defaultWarranty, warrantyList = {} } = props;
  const coverageDetails = useSelector( selectCoverageDetails );
  const warrantyDetail = useSelector( selectWarrantyDetail );
  const warrantyDetailList = Object.values( warrantyList ).slice( 0, 2 );
  const shortWarranty = warrantyDetail[warrantyDetailList[0]];
  const longWarranty = warrantyDetail[warrantyDetailList[1]];
  const warrantyMap = [
    {
      id: 0,
      title: defaultWarranty,
      price: 'Included',
      WarrantyListItems: defaultWarrantyList,
      isDefault: true
    }
  ];

  function getWarrantyObj( warranty = {}, list ){
    const { name, id, formattedPrice } = warranty;
    const duration = parseInt( name ) / 12;
    return {
      id,
      title: `${ duration } Years Warranty`,
      price: formattedPrice,
      WarrantyListItems: list
    };
  }

  if ( shortWarranty ) warrantyMap.push( getWarrantyObj( shortWarranty, coverageDetails.short ) );
  if ( longWarranty ) warrantyMap.push( getWarrantyObj( longWarranty, coverageDetails.long ) );


  return (
    <div className='warranty-modal__container'>
      <div className='warranty-modal-header'>
        <h1 className='warranty-modal-header__title'>Protect Your Investment</h1>
        <p className='warranty-modal-header__desc'>Have a peace of mind with Breville Extended Protection Plan,
          <span>your { productName } comes with { defaultWarranty }.</span></p>
        <CloseIconButton onClick={ onCloseModal } className='warranty-modal__close-icon' size='large' />
      </div>
      <div className='warranty-modal-content'>
        <div className='react-flex'>
          {
            warrantyMap && warrantyMap.map( ( { id, ...item }, index ) => {
                const selected = ( item.isDefault ) ? 'Included' : `${ ( selectedIndex === index ) ? 'Selected' : 'Select' }`;
                const included = ( item.isDefault ) ? 'Included' : 'Upgrade to';
                const props = { ...item, index, selected, included };
                return <WarrantyCard key={ id } { ...props } onSelect={ setSelectedIndex } />;
            } )
          }
        </div>
      </div>
      <div className='warranty-modal-footer'>
        <div className='mulberyy-logo'></div>
        <Button className='warranty-update__button'>Update cart</Button>
      </div>
    </div>
  );
};

WarrantyTemplate.propTypes = {
  onCloseModal: func
};

export default WarrantyTemplate;

//  <div className="warranty-modal__close-icon" onClick={onCloseModal}></div>

{/* <CloseIconButton onClick={onCloseModal} className="icon-btn">
<i className="warranty-modal__close-icon"></i>
</Button>      */}
