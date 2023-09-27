import React from 'react';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const GetSupportProducts = ( { data } ) => {
  const { products, guidesLink } = data;
  const { t } = useTranslation();

  return products?.length > 0
    ?
    (
      <div className='cmp-registered-products'>
        <div className='cmp-registered-products__header'>
          <div className='cmp-registered-products__header-title'>
            <span>{ t( 'eh-title-registered-products-support-page' ) } ({ products?.length })</span>
          </div>
          <div className='cmp-registered-products__header-description'>
            <p>{ t( 'eh-text-registered-product-support-page' ) }</p>
          </div>
          <a href={ guidesLink || '#' } className='all-product-guides-link'>
            { t( 'eh-view-all-product-guides' ) }
          </a>
        </div>

        <div className='cmp-registered-products__tiles'>
          <Splide
            options={{
              type: 'slide',
              arrows: true,
              rewind: true,
              pagination: false,
              perPage: 4,
              perMove: 1,
              autoWidth: true,
              keyboard: 'focused',
              breakpoints: {
                768: {
                  destroy: true
                }
              }
            }}
          >
            { products?.map( ( product ) =>
              <SplideSlide key={ product?.id }>
                <a
                  href={ `https://mybreville.force.com/BrevilleCustomerCommunity/s/global-search/${ product?.Meta?.orderParentId }?language=en&region=us&brand=Breville` }
                  className='cmp-registered-products__tiles-product-tile'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <span className='tile-image'>
                    <img src={ product?.Meta?.orderImages } alt={ product?.productName } />
                  </span>
                  <span className='tile-product-name'>
                    { product?.productName }
                  </span>
                </a>
              </SplideSlide>
            ) }
          </Splide>
        </div>
      </div>
    )
    :
    (
      <div>TODO: Waiting for component if user has 0 product</div>
    );
};

GetSupportProducts.propTypes = {
  data: object
};

export default GetSupportProducts;