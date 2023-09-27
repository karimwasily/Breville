import React from 'react';
import { array } from 'prop-types';
import TutorialsTiles from './tutorials-tiles';

const ProductTutorial = ( { data } ) => {

  function handleClick() {
    // Function hasn't been yet determined
    console.log( 'clicked on tutorial tiles' );
  }

  return (
    <div className='product-tutorial'>
      <div className='product-tutorial__wrapper'>
        { data?.map( ( item, index )=>
          <TutorialsTiles
            tileData={ item }
            onClick={ handleClick }
            key={ index }
          />
        ) }
      </div>
    </div>
  );
};

ProductTutorial.propTypes = {
  data: array
};

export default ProductTutorial;