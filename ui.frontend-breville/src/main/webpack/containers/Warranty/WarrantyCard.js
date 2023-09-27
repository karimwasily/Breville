import React from 'react';
import { string, arrayOf, func, number, boolean } from 'prop-types';
import classNames from 'classnames';

const WarrantyCard = ( props ) => {
  const { title, price, WarrantyListItems, index, isDefault, selected, included, onSelect } = props;
  const warrantyClass = classNames( `waranty-card__item ${ selected }` );

  const warrantySelectHandler = () => {
    onSelect( index );
  };

  const warrantyHtmlProps = {
    onClick: warrantySelectHandler,
    onKeyPress: warrantySelectHandler,
    tabIndex: 0
  };

  return (
    <div className={ warrantyClass } { ...( !isDefault ) && { ...warrantyHtmlProps } } >
      <div className='waranty-card__header'>
        <div className='checkmark-icon '></div>
        <p className='warranty-card-header__include'>{ included }</p>
        <h2 className='warranty-card-header__title'>{ title }</h2>
        { !isDefault &&
          <p className='warranty-card-header__price'>{ price }</p>
        }
      </div>
      <div className='waranty-card__content'>
        <ul className='waranty-card-list'>
          {
            WarrantyListItems && WarrantyListItems.map( ( warranty, index ) =>
              <li className='waranty-card-list__item' key={ index }>{ warranty }</li>
            )
          }
          {
            isDefault ?
            (
              <>
                <a href='https://www.breville.com/us/en/support/Warranty.html' onClick='event.stopPropagation();' className='waranty-terms__link' target='_blank' rel='noreferrer'>Breville warranty terms and conditons</a>
                <p className='waranty-terms__subnote'>* Does not include accessories, cleaning or maintanence products used for regular upkeep or care of your product.</p>
              </>
            ) :
            (
              <a href='https://www.getmulberry.com/terms-of-service' onClick='event.stopPropagation();' className='waranty-terms__link' target='_blank' rel='noreferrer'>Mulberry warranty terms and conditons</a>
            )
          }
        </ul>

        <div className='waranty-card-select'> { selected } <div className='checkmark-icon'></div></div>

      </div>
    </div>
  );
};

WarrantyCard.propTypes = {
  index: number,
  title: string,
  price: string,
  WarrantyListItems: arrayOf( string ),
  onSelect: func,
  selected: string,
  isDefault: boolean,
  included: string
};

export default WarrantyCard;
