import React, { cloneElement } from 'react';
import { number, object, func, string } from 'prop-types';
import WhiteTick from 'resources/svgs/white-tick.svg';
import Hr from 'components/shared-ui/Hr';

const AccordionItem = ( { label, index, curIndex, setIndex, children } ) => {
  const isOpen = ( index === curIndex );

  function onEdit() {
    setIndex( index );
  }
  function onNext() {
    setIndex( index + 1 );
  }

  let showTick = false;
  let showEdit = false;

  let headerClass = '';

  if ( index < curIndex ) {
    showTick = true;
    showEdit = true;
    headerClass = 'accordion-item__header--closed';
  }

  if ( index > curIndex ) {
    headerClass = `accordion-item__header--disabled`;
  }

  return (
    <>
      <div className='accordion-item'>
        <div className={ `accordion-item__header ${ headerClass } mb-10` } >
          <div className='accordion-item__title'>
            { showTick && <div className='accordion-item__icon'>
              <WhiteTick className='accordion-item__white-tick' />
            </div>
            }
            <span>{ `${index + 1}. ${label}` }</span>
          </div>
          { showEdit &&
            <span role='button' tabIndex={ 0 } className='accordion-item__edit' onClick={ onEdit } onKeyDown={ onEdit }>Edit</span>
          }
        </div>
        <Hr className='my-20' />
        { cloneElement( children, { index, isOpen, onNext, curIndex } ) }
      </div>
      { isOpen && <Hr /> }
    </>
  );
};

AccordionItem.propTypes = {
  label: string,
  index: number,
  curIndex: number,
  children: object,
  setIndex: func
};

export default AccordionItem;
