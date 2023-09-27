import React from 'react';
import { number, any, func } from 'prop-types';

const Item = ( props ) => {
  const { index, isOpen, onNext } = props;

  if ( !isOpen ) {
    return <div></div>;
  }

  return (
    <>
      <div className='item-new'>
        Item: { index + 1 }
      </div>
      <button className='form-button' onClick={ onNext }>Next</button>
    </>
  );
};

Item.propTypes = {
  index: number,
  isOpen: any,
  onNext: func
};

export default Item;
