import React, { useState } from 'react';
import { string, func } from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { usePageVisibility } from 'react-page-visibility';

const VideoPlayer = ( { src, handleEnded } ) => {
  const isVisible = usePageVisibility();
  const [play, setPlay] = useState( true );

  function handlePause(){
    if ( isVisible ) {
      setPlay( false );
    }
  }
  function handlePlay(){
    setPlay( true );
  }
  return (
    <div className='player-wrapper'>
      <div className='react-player-wrapper'>
        <ReactPlayer
          playsinline={ true }
          controls={ true }
          onEnded={ handleEnded }
          url={ src }
          className='react-player'
          playing={ isVisible && play }
          onPause={ handlePause }
          onPlay={ handlePlay }
        />
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: string.isRequired,
  handleEnded: func
};

export default VideoPlayer;
