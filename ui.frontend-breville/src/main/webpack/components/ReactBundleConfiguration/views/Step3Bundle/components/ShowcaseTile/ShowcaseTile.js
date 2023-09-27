import React, { useState } from 'react';
import { string, object, array, bool } from 'prop-types';
import ReactVideo from 'components/ReactVideo/ReactVideo';
import { ShowcaseListCarousel, ShowcaseImageCarousel } from '../ShowcaseCarouselSplide/ShowcaseCarouselSplide';
import { Image } from 'components/shared-ui/image';
import { useTranslation } from 'react-i18next';

export const ShowcaseTile = ( { title, desc, price = null, video, carousel, image = null, customImageSliderSettings = {}, customListSliderSettings = {}, isFree = true } ) => {
  const [currentItemDetails, setCurrentItemDetails] = useState( {} );
  const [currentItemIndex, setCurrentItemIndex] = useState( 0 );

  const { t } = useTranslation();

  function onItemChange( { currentItem = {}, currentItemIndex } ) {
    setCurrentItemDetails( currentItem );
    setCurrentItemIndex( currentItemIndex );
  }

  if ( !video && !carousel && !image ) return null;

  return (
    <div className='showcase'>

      { carousel && (
        <div className='showcase__header'>
          <span className='showcase__badge'>{ isFree ? t( 'br-free' ) : price }</span>
          <h3 className='showcase__title'>{ title }</h3>
          <p className='showcase__desc'>{ desc }</p>
        </div>
      ) }

      <div className='showcase__feature'>
        {
          carousel ? (
            <ShowcaseImageCarousel showcaseItems={ carousel } onChange={ onItemChange } currentItem={ currentItemDetails } currentItemIndex={ currentItemIndex } customSliderSettings={ customImageSliderSettings } />
          ) :
          video ? (
            <div className='showcase__video'>
              <ReactVideo data={ video } />
            </div>
          ) :
            <div className='showcase__image-wrapper'>
              <Image src={ image?.src } alt={ image?.alt || '' } className='showcase__image' />
            </div>
        }
      </div>

      <div className='showcase__content'>
        {
          carousel ? (
            <div className='showcase__carousel-list'>
              <ShowcaseListCarousel showcaseItems={ carousel } onChange={ onItemChange } currentItem={ currentItemDetails } currentItemIndex={ currentItemIndex } customSliderSettings={ customListSliderSettings } />
            </div>
          ) :
          video ? (
            <div className='showcase__header'>
              <span className='showcase__badge'>{ isFree ? t( 'br-free' ) : price }</span>
              <img src={ video.bgImage } alt='' className='showcase__img' />
              <h3 className='showcase__title'>{ title }</h3>
              <p className='showcase__desc' dangerouslySetInnerHTML={{ __html: desc }}></p>
            </div>
          ) :
            <div className='showcase__header'>
              <span className='showcase__badge'>{ isFree ? t( 'br-free' ) : price }</span>
              <Image src={ image.src } alt='' className='showcase__img' />
              <h3 className='showcase__title'>{ title }</h3>
              <p className='showcase__desc' dangerouslySetInnerHTML={{ __html: desc }}></p>
            </div>
        }
      </div>

    </div>
  );
};

ShowcaseTile.propTypes = {
  title: string,
  desc: string,
  video: object,
  carousel: array,
  isFree: bool
};
