import React from 'react';
import { Grid } from 'xps-react/core';

export const BeanzSpinner = ( ) => {

  return (
    <Grid>
      <div className='dialog__overlay'></div>
      <div role='dialog' aria-labelledby='spinnerTitle' className='dialog__content_spinner text-center'>
        <div role='document'>
          <div>
            <div className='lds-spinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className='text-content'>
            <div id='spinner__title_cart' className='modalTitleh2 c-spacing-margin-top-1-5rem'></div>
            <div className='modal-body js-modal-body'>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};