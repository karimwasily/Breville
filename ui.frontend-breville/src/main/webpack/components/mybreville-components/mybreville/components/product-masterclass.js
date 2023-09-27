import React from 'react';
import { array } from 'prop-types';
import MasterclassTiles from './masterclass-tiles';

const ProductMasterclass = ( { masterClassesData } ) => {
  return (
    <div className='masterclasses__list'>
      { !!masterClassesData?.length && masterClassesData?.map( ( masterclass, index ) =>
        <MasterclassTiles { ...masterclass } key={ index } />
        ) }
    </div>
  );
};

ProductMasterclass.defaultProps = {
  masterClassesData: []
};

ProductMasterclass.propTypes = {
  masterClassesData: array
};

export default ProductMasterclass;