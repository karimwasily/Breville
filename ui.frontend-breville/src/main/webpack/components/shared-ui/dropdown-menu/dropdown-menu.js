import React, { cloneElement, useState } from 'react';
import { object, string } from 'prop-types';
import Hr from 'components/shared-ui/Hr';
import ArrowDown from 'resources/svgs/arrow-down-selectbox.svg';
import classNames from 'classnames';

const DropdownMenu = ( { label, children } ) => {
  const [isOpen, setIsOpen] = useState( false );
  const dropDwnMenuClass = classNames({'dropdown-menu__icon': true, 'dropdown-menu__icon--open': isOpen});

  function onClick(){
    setIsOpen( !isOpen );
  }

  return (
    <>
      <Hr />
      <div role = 'button' className='dropdown-menu py-20' onClick={ onClick } onKeyDown={ onClick } tabIndex={ 0 }>
        <div className='dropdown-menu__title'>
          <div className='dropdown-menu__label'>{ label }</div>
          { isOpen && <div className='dropdown-menu__edit'>Edit Cart</div> }
        </div>
        <div className='dropdown-menu__icon-wrap'>
          <ArrowDown className={dropDwnMenuClass} />
        </div>
      </div>
      <Hr />
      { cloneElement( children, { isOpen } ) }
    </>
  );
};

DropdownMenu.propTypes = {
  label: string,
  children: object
};

export default DropdownMenu;
