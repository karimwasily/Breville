import React from 'react';
import { object, func } from 'prop-types';
import { TUTORIAL_IMAGE_URL } from '../../../mybreville-components/constants';

const TutorialsTiles = ( { tileData, onClick } ) => {
  const {
    title,
    chef = 'Barista Brian', // no data atm - hard coded
    video: [ videoId = '' ],
    tags: [
      {
        tag,
        tagColor: {
          categoryColor = 'product-tutorial__category-cream' // no data atm - hard coded
        }
      }
    ]
  } = tileData;

  const imageURL = TUTORIAL_IMAGE_URL.replace( 'videoId', videoId );

  return (
    <div className='product-tutorial__tile'
      onClick={ onClick }
      onKeyPress={ onClick }
      role='button'
      tabIndex='0'
    >
      <div className='product-tutorial__video'>
        <img src={ imageURL } className='product-tutorial__video-size' alt={ title } />
        <div className='product-tutorial__video-time-wrapper'>
          <span className='product-tutorial__video-icon'></span>
          <span className='product-tutorial__video-duration'>15:12</span>
        </div>
      </div>
      <div className={ categoryColor }>{ tag }</div>
      <div className='product-tutorial__name'>{ title }</div>
      <div className='product-tutorial__chef'>{ chef }</div>
    </div>
  );
};

TutorialsTiles.defaultProps = {
  tileData: {},
  onClick: () => void 0
};

TutorialsTiles.propTypes = {
  tileData: object,
  onClick: func
};

export default TutorialsTiles;