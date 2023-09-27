import React from 'react';
import { object, func } from 'prop-types';
import TutorialsPlaylist from './tutorials-playlist';

const MyProductTutorials = ( { tutorialData, handleOpenVideo } ) => {
  const {
    title: title = '',
    items: playlists = []
  } = tutorialData;

  return (
    <div className= 'my-product-tutorials' >
      <h3 className= 'my-product-tutorials__header'>
        { title }
      </h3>
      {
        playlists.map( ( item, index ) => (
          <TutorialsPlaylist
            key={ index }
            tutorialData={ item }
            handleOpenVideo={ handleOpenVideo }
          /> )
         )
      }
    </div>
  );
};

MyProductTutorials.defaultProps = {
  tutorialData: {},
  handleOpenVideo: () => void 0
};

MyProductTutorials.propTypes = {
  tutorialData: object,
  handleOpenVideo: func
};

export default MyProductTutorials;