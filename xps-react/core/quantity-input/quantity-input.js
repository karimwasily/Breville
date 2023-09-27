import React, { useState, useEffect } from 'react';
import { func, number } from 'prop-types';

const QuantityInput = ( props ) => {

  const { onPlus, onMinus, value } = props;
  const [counter, setCounter] = useState( value );

  useEffect( ()=>{
    setCounter( value );
  }, [value] );

  function handleAddClick() {
    const newValue = counter + 1;
    setCounter( newValue );
    onPlus( newValue );
  }

  function handleMinusClick() {
    const newValue = counter === 1 ? counter : counter - 1;
    setCounter( newValue );
    if( counter !== 1 ) onMinus( newValue );
  }

  return (
    <div className='quantity'>
      <button className='quantity__button decrease' onClick={ handleMinusClick } title='Decrease Quantity'><span>_</span></button>
      <span className='quantity__indicator'>{ counter }</span>
      <button className='quantity__button' onClick={ handleAddClick } title='Increase Quantity'><span>+</span></button>
    </div>
  );
};

QuantityInput.propTypes = {
  onPlus: func,
  onMinus: func,
  value: number
};

export default QuantityInput;
