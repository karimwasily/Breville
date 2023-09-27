import { func, string } from 'prop-types';
import React from 'react';

import { VideoCmpButton } from './VideoCmpButton';
import classnames from 'classnames';

/**
 * Based from the Teaser AEM core component (with additional nested Button AEM core component)
 *
 * @param {{ handlePlayVideo: function, playButtonText?: string, subtitle: string, title: string, bgImage: string, description: string, props?: object }} VideoCmpTeaserArgs
 * @returns
 */
const VideoCmpTeaser = ( {
  handlePlayVideo,
  playButtonText = '',
  subtitle,
  title,
  bgImage,
  description,
  colorScheme,
  ...props
} ) => {
  return (
    <div className={ classnames( 'teaser', colorScheme ) } { ...props }>
      <div className='cmp-teaser'>
        { bgImage && (
          <div className='cmp-teaser__image'>
            <div className='cmp-image' itemType='http://schema.org/ImageObject'>
              <img
                src={ bgImage }
                className='cmp-image__image'
                itemProp='contentUrl'
                alt='Video Background Image'
              />
            </div>
            <div className='cmp-image__mask'></div>
          </div>
        ) }

        <div className='cmp-teaser__content'>
          { subtitle && <div className='cmp-teaser__subtitle'>{ subtitle }</div> }

          { title && <h1 className='cmp-teaser__title'>{ title }</h1> }

          { description && (
            <div className='cmp-teaser__description'>
              <p>{ description }</p>
            </div>
          ) }

          <div className='cmp-teaser__action-container'>
            <VideoCmpButton onClick={ () => handlePlayVideo( true ) }>
              { playButtonText }
            </VideoCmpButton>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoCmpTeaser.propTypes = {
  handlePlayVideo: func.isRequired,
  playButtonText: string,
  title: string,
  subtitle: string,
  description: string,
  bgImage: string
};

export { VideoCmpTeaser };
