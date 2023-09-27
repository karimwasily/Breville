import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

export const ModelPDP = ( { model } ) => {
  const { t } = useTranslation();

  if ( !model ) return null;

  return (
    <p className='primary-product-container__model-value'>
      <span className='primary-product-container__model-value-prefix'>{ t( 'pdp-model' ) }:</span> { model }
    </p>
  );
};

ModelPDP.propTypes = {
  model: string
};