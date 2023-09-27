import React from 'react';
import { Link } from 'react-router-dom';
import { string, object, array, number } from 'prop-types';

const MasterclassTiles = ( { logo, name, tags, location, startDate, eventDuration, host } ) => {

  // TODO: Need to plug in masterclass link to eventbrite
  const masterclassLink = '#';

  const formatDuration = ( duration ) => {

    const hours = ( duration / 60 ).toFixed( 1 );

    if ( duration < 60 ) return `${ duration } Min`;
    else if ( hours < 24 ) return `${ hours } Hrs`;
  };

  const formattedDate = ( dateString ) => {
    const date = new Date( dateString );
    const isInvalidDate = isNaN( date.getTime() );

    if ( !isInvalidDate ) {
      const day = date.getDate();
      const month = date.toLocaleString( 'default', { month: 'long' } );
      const year = date.getFullYear();
      const time = date.toLocaleString( 'default', { hour: 'numeric', hour12: true } );

      return `${ month } ${ day }, ${ year }, ${ time }`;
    }

    return null;
  };

  return (
    <div className='masterclass-tile'>
      <Link className='masterclass-tile__image-wrapper' to={ masterclassLink } tabIndex='-1'>
        <img className='masterclass-tile__image' src={ logo } alt={ name } />
        <div className='masterclass-tile__video-time-wrapper'>
          <span className='masterclass-tile__video-icon'></span>
          <span className='masterclass-tile__video-duration'>{ formatDuration( eventDuration ) }</span>
        </div>
      </Link>
      { tags?.map( ( tag, index ) =>
        <span className='masterclass-tile__tag masterclass-tile__tag--orange' key={ index }> { tag } </span>
      ) }
      <Link className='masterclass-tile__list-description-title' to={ masterclassLink }> { name } </Link>
      <div className='masterclass-tile__description'>
        { startDate.local && <div className='masterclass-tile__icon masterclass-tile__time'>{ formattedDate( startDate.local ) } </div> }
        { location && <div className='masterclass-tile__icon masterclass-tile__location'>{ location }</div> }
        { host && <div className='masterclass-tile__icon masterclass-tile__host'>{ host }</div> }
      </div>
    </div>
  );
};

MasterclassTiles.propTypes = {
  logo: string,
  name: string,
  tags: array,
  startDate: object,
  eventDuration: number,
  location: string,
  host: string
};

export default MasterclassTiles;