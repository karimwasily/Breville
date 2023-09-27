import { bool, string, func } from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player';

/**
 * Generic React Player component using 'react-player' module
 * 
 * @param {{src: string, isPlaying?: boolean, handleEnded: () => void, props?: object}} PlayerArgs
 * @returns {React.ReactElement}
 */
const Player = ({ src, isPlaying = false, handleEnded }) => {
  return (
    <div className='player-wrapper'>
      <div className='react-player-wrapper'>
        <ReactPlayer
          controls={isPlaying}
          onEnded={handleEnded}
          url={src}
          className='react-player'
          playing
          width='100%'
          height='100%'
        />
      </div>
    </div>
  );
};

Player.propTypes = {
  src: string.isRequired,
  isPlaying: bool.isRequired,
  handleEnded: func,
};

export { Player };
