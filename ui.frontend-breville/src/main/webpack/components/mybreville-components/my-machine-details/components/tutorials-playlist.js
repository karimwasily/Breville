import React, { useState, useRef } from 'react';
import { object, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import TutorialsCarousel from './tutorials-carousel';

const TutorialsPlaylist = ( { tutorialData, handleOpenVideo } ) => {

  const {
    title: playlistName,
    desc: playListDesc = 'Learn how to get your machine setup and running correctly.', // no data atm - hard code
    items: playlistData
  } = tutorialData;

  const { t } = useTranslation();

  const sliderRef = useRef( null );
  const [isFirst, setIsFirst] = useState( true );
  const [isLast, setIsLast] = useState( playlistData.length === 0 );

  function handlePrev() {
    sliderRef.current.slickPrev();
  }

  function handleNext() {
    sliderRef.current.slickNext();
  }

  function handleChange( _1, next ) {
    ( next === 0 ) ? setIsFirst( true ) : setIsFirst( false );
    ( playlistData.length - next <= 3 ) ? setIsLast( true ) : setIsLast( false );
  }

  return (
    <div className='my-product-tutorials__playlist'>
      <div className='playlist__header'>
        <div className='header__start'>
          <h4 className='header__start__title'>
            { playlistName }
          </h4>
          <p className='header__start__desc'>
            { playListDesc }
          </p>
        </div>
        <div className='header__end'>
          <div className='header__end__arrows'>
            <button className='arrows--left' onClick={ handlePrev } disabled={ isFirst } />
            <button className='arrows--right' onClick={ handleNext } disabled={ isLast } />
          </div>
        </div>
      </div>

      <TutorialsCarousel
        ref={ sliderRef }
        playlistData={ playlistData }
        onChange={ handleChange }
        handleOpenVideo={ handleOpenVideo }
      />
    </div>
  );
};

TutorialsPlaylist.defaultProps = {
  tutorialData: {},
  handleOpenVideo: () => void 0
};

TutorialsPlaylist.propTypes = {
  tutorialData: object,
  handleOpenVideo: func
};

export default TutorialsPlaylist;