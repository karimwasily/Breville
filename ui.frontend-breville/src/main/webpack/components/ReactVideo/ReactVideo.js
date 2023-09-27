import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';

import { VideoCmpButton } from './VideoCmpButton';
import { Player } from './Player';
import { VideoCmpTeaser } from './VideoCmpTeaser';
import { withAem } from 'xps-utils/withAem';
import { getYoutubePreviewImage } from 'xps-utils/video';

/**
 * provided json properties are passed as state and directly applied to 'react-video (Player)' component
 * to extend functionality, pass the correct json attributes matching the expected namespace for react-player library
 */

const ReactVideo = ( { data, aemData } ) => {
  const state = { ...data, ...aemData };
  const [isPlaying, setIsPlaying] = useState( false );

  useEffect( () => {
    // check state and whether autoplay is configured, if so then skip thumbnail & play video
    if ( state.autoPlay ) setIsPlaying( true );
  }, [state] );


  /**
   * set whether the video is playing or not
   * @param {boolean} flag - boolean to set the play state
   * @returns {function}
   */
  function handlePlayVideo( flag ) {
    return function () {
      setIsPlaying( flag );
    };
  }

  /**
   * when video has finished
   * @returns {void}
   */
  function handleEnded() {
    setIsPlaying( false );
  }

  if ( !state?.videoSrc ) return null;

  return (
    <div id={ state?.id ? state.id : 'cmp-reactvideo' }>
      { !isPlaying ? (
        <VideoCmpTeaser
          handlePlayVideo={ handlePlayVideo( true ) }
          playButtonText={ state.playButtonText }
          title={ state.title }
          subtitle={ state.subtitle }
          bgImage={ getYoutubePreviewImage( state.videoSrc, 'maxres' ) }
          description={ state.description }
          colorScheme={ state.colorScheme }
        />
      ) : (
        <>
          <Player
            src={ state.videoSrc }
            isPlaying={ isPlaying }
            handleEnded={ handleEnded }
            { ...state }
          />
          <VideoCmpButton
            className='cmp-reactvideo-close-button'
            onClick={ handlePlayVideo( false ) }
          />
        </>
      ) }
    </div>
  );
};

ReactVideo.propTypes = {
  data: object,
  aemData: object,
  appRef: object
};

export default withAem( ReactVideo );
