import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLocale } from 'library/store/global/selector';
import { kebabToSnakeCase } from 'xps-utils/format';
import { func, string, object, array, arrayOf, shape } from 'prop-types';
import { uniqBy } from 'lodash';
import { withAem } from 'xps-utils/withAem';
import { Image } from 'components/shared-ui/image';
import classNames from 'classnames';
import { getYoutubePreviewImage } from 'xps-utils/video';

export const VariantPickerPDPImage = ( { carouselImages, handleSelectWrap, selectedProduct, selectedProductIndex, variantImage, productVideos } ) => {
  const locale = useSelector( selectLocale );
  const localeFormatted = kebabToSnakeCase( locale );

  // uniq and normalized variants
  const variants = useMemo( () => {
    const allVariants = carouselImages
    .filter( ( v ) => v.imageIndex !== null )
    .map( ( v ) => ( {
      imageIndex: v?.imageIndex,
      title: v?.imageText?.[localeFormatted].imageTitle,
      productImage: v?.productImage
    } ) );
    return uniqBy( allVariants, 'imageIndex' );
  }, [carouselImages] );

  function handleSelectWrapper( url, type, id ) {
    return function () {
      handleSelectWrap( url, type, id );
    };
  }

  return (
    <>
      <div className='variant-thumbnail'>
        <ul className='variant-thumbnail__list'>
          <li key='prod' className='variant-thumbnail__item'>
            <button
              onClick={ handleSelectWrapper( variantImage, 'image' ) }
              className={ classNames( 'variant-btn', {
                      'variant-btn--selected': selectedProduct === variantImage
                    } ) }
            >
              <Image src={ `${ variantImage }` } />
            </button>
          </li>
          { carouselImages && variants?.map( ( v ) => (
            <li key={ `image${ v.imageIndex }` } className='variant-thumbnail__item'>
              <button
                onClick={ handleSelectWrapper( v.productImage, 'image', v.imageIndex ) }
                className={ classNames( 'variant-btn', {
                  'variant-btn--selected': ( selectedProduct === v.productImage && selectedProductIndex === v.imageIndex )
                 } ) }
              >
                <Image src={ `${ v.productImage }` } />
              </button>
            </li>
            ) ) }
          { productVideos && productVideos?.map( ( v ) => (
            <li key={ `video${ v.videoCarouselIndex }` } className='variant-thumbnail__item'>
              <button
                onClick={ handleSelectWrapper( v.videoURL, 'video', v.videoCarouselIndex ) }
                className={ classNames( 'variant-btn', {
                      'variant-btn--selected': ( selectedProduct === v.videoURL && selectedProductIndex === v.videoCarouselIndex )
                  } ) }
              >
                <Image src={ getYoutubePreviewImage( v.videoURL ) } alt={ v.videoAltText } />
                <div className='variant-thumbnail__action-container'>
                  <div className='button cmp-reactvideo-button'>
                    <div className='cmp-button'>
                      <span className='cmp-button__icon'></span>
                      <span className='cmp-button__text'></span>
                    </div>
                  </div>
                </div>

              </button>
            </li>
            ) ) }
        </ul>
      </div>

    </>
  );
};

VariantPickerPDPImage.propTypes = {
  carouselImages: arrayOf( shape( {
    imageIndex: string,
    imageText: object,
    imageType: string,
    productImage: string
  } ) ),
  handleSelectWrap: func,
  selectedProduct: string,
  variantImage: string,
  productVideos: arrayOf( shape( {
    videoAltText: string,
    videoCarouselIndex: string,
    videoTitle: string,
    videoType: string,
    videoURL: string
  } ) )
};

export default withAem( VariantPickerPDPImage );