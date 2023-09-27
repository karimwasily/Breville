import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { object } from 'prop-types';
import { VariantPickerPDPImage } from 'shared-ui/variant-picker/VariantPickerPDP/VariantPickerPDPImage';
import { Image } from 'components/shared-ui/image';
import { VideoPDP } from './VideoPDP';
import { selectProductVariantPDPImage } from 'library/store/product/selector';

export const HeroPDP = ( { aemData } ) => {
  const [currentImgSrc, setCurrentImgSrc] = useState( null );
  const [selectedProduct, setSelectedProduct] = useState( null );
  const [selectedProductIndex, setSelectedProductIndex] = useState( null );
  const [videoProduct, setVideoProduct] = useState( null );
  const [displayType, setDisplayType] = useState( 'image' );

  const productVariantPDPImage = useSelector( selectProductVariantPDPImage );

  useEffect( () => { // On variant click change the product image
    if ( productVariantPDPImage !== currentImgSrc ){
      // set first thumbnail image selected on click of color variants
      setSelectedProduct( productVariantPDPImage );
    }
    setDisplayType( 'image' ); // On variant change always the type is image(product image)
    setSelectedProduct( productVariantPDPImage );
    setCurrentImgSrc( productVariantPDPImage );
  }, [productVariantPDPImage] );


  function handleSelectWrap( url = '', type = '', id ) {
    // On click of thumbnail image or video update the product image or video
    if ( type === 'image' ){
      setCurrentImgSrc( url );
      setSelectedProduct( url );
      setSelectedProductIndex( id );
      setDisplayType( type );
    }
    else {
      const product = aemData.productVideos.find( ( v ) => ( v.videoCarouselIndex === id ) );
      setCurrentImgSrc( product.videoURL );
      setSelectedProduct( product.videoURL );
      setDisplayType( type );
      setSelectedProductIndex( product.videoCarouselIndex );
      setVideoProduct( product );
    }
  }

  const carouselImages = useMemo( () => aemData.productImages.filter( ( v ) =>( v.imageType === 'carousel' ) ), [aemData?.productImages] );
  const carouselVideos = useMemo( () => aemData.productVideos?.filter( ( v ) =>( v.videoType === 'carousel' ) ), [aemData?.productVideos] );

  if ( !currentImgSrc ) return null;

  return (
    <>
      <div className='hero-pdp'>
        { displayType === 'image' ? ( <Image src={ currentImgSrc } /> ) : (
          <div className='reactVideo cmp-reactvideo--embed'>
            <VideoPDP productVideos={ carouselVideos } videoUrl={ videoProduct.videoURL } videoAltText={ videoProduct.videoAltText }></VideoPDP>
          </div>
        ) }
      </div>
      <div className='primary-product-container__thumbnails'>
        <VariantPickerPDPImage variantImage={ productVariantPDPImage } carouselImages={ carouselImages } productVideos={ carouselVideos } handleSelectWrap={ handleSelectWrap } selectedProduct={ selectedProduct } selectedProductIndex={ selectedProductIndex } />
      </div>
    </>
  );
};

HeroPDP.propTypes = {
  aemData: object
};
