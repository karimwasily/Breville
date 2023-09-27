import React, { Fragment } from 'react';
import { array } from 'prop-types';
import Hr from 'components/shared-ui/Hr';


export const FreeBundle = ( { items } ) => {
  return (
    <>
      <Hr />
      <h4 className='order-item__section-title my-20'>Free with your complete coffee bundle</h4>
      {
        items.map( ( { id, title, price, description, content, src }, index ) => {
          const notLast = !( index === ( items.length - 1 ) );
          return (
            <Fragment key={ id } >
              <div className='order-item my-30' >
                <div className='order-item__image-wrap'>
                  <img src={ src } className='order-item__image' alt={ title } />
                </div>
                <div>
                  <h5 className='order-item__title'>{ title }</h5>
                  <h5 className='order-item__title'>{ price }</h5>
                  <div className='order-item__description'>{ description }</div>
                  <div className='order-item__description my-15'>{ content }</div>
                </div>
              </div>
              { notLast && <Hr /> }
            </Fragment>
          );
        } )
      }
    </>
  );
};

FreeBundle.propTypes = {
  items: array
};

export default FreeBundle;
