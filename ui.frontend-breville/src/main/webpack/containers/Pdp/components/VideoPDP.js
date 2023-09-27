import React from 'react';
import { ReactVideo } from 'components/ReactVideo';
import { string, array } from 'prop-types';

export const VideoPDP = ( { productVideos, videoUrl, videoTitle, videoAltText } ) => {

  function getHeroVideo( productVideos ) {
    return productVideos.find( ( video ) => video.videoType === 'herobanner' ) || productVideos[0];
  }

  function normalizeReactVideoData( aemVideo ) {
    // aemVideoData...
    /*
    {
      videoURL: 'https://www.youtube.com/watch?v=_olQivgv2rA',
      videoTitle: 'Breville Barista Touch™',
      videoAltText: 'Watch Video',
      videoType: 'herobanner',
      videoCarouselIndex: null
    }
    */

    // * this is the data object 'ReactVideo' component expects
    return {
      id: null,
      title: videoTitle,
      subtitle: null,
      description: null,
      bgImage: null,
      videoSrc: videoUrl,
      playButtonText: null
    };
  }

  return (
    <ReactVideo data={{ ...normalizeReactVideoData( getHeroVideo( productVideos ) ) }} />
  );
};

VideoPDP.propTypes = {
  productVideos: array,
  videoUrl: string,
  videoTitle: string,
  videoAltText: string
};
