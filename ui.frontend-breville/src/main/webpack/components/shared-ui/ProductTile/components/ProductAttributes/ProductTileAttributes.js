import React from 'react';
import { array } from 'prop-types';
import mockData from './mockProductTileAttributeData.json';

function fallbackToMockDataCheck( attributes, mockData ) {
  // todo: check for valid attributes

  // Check if valid data is coming through the API, otherwise fallback to mock data
  // will need to be updated to map through and check the appropriate values
  const isValidAttributes = Boolean( attributes?.length );

  if ( !isValidAttributes ) {
    console.warn( 'using mock data for product tile attributes' );
    attributes = mockData;
  }

  // ! temporarily forcing mock data, will update in future PR
  console.warn( 'todo: forcing mock data', { isValidAttributes, attributes } );
  return mockData;
  // return attributes;
}

export const ProductTileAttributes = ( { attributes } ) => {
  const attributeData = fallbackToMockDataCheck( attributes, mockData );

  return (
    <div className='cmp-producttile__attribute-list'>
      { /* Map icon based product attributes */ }
      { attributeData
        .map( ( { type, label, name, iconUrl, value } ) =>
          ( type === 'icon' ?
            <div key={ name } className='cmp-producttile__attribute-item cmp-producttile__attribute-item--icon'>
              <img className='cmp-producttile__attribute-name cmp-producttile__attribute-name--icon' src={ iconUrl } alt={ label } />
              <div className='cmp-producttile__attribute-value cmp-producttile__attribute-value--icon'>{ value }</div>
            </div> :
            []
          )
        )
      }

      { /* Map text based product attributes */ }
      { attributeData
        .map( ( { type, label, name, iconUrl, value } ) =>
          ( type === 'text' ?
            <div key = { name } className='cmp-producttile__attribute-item cmp-producttile__attribute-item--text'>
              <h4 className='cmp-producttile__attribute-name cmp-producttile__attribute-name--text'>{ label }</h4>
              <p className='cmp-producttile__attribute-value cmp-producttile__attribute-value--text'>
                { value ? value : '-' }

                { /* Display the dimensions icon if it is the dimensions attribute and a value exists */ }
                { name === 'WEB_TS_DIMENSIONS' && value ? (
                  <img
                    className='dimensions-icon'
                    src={ iconUrl }
                    alt={ name }
                  ></img>
                ) : (
                  ''
                ) }
              </p>
            </div> :
            []
          )
        )
      }
    </div>
  );
};

ProductTileAttributes.propTypes = {
  attributes: array
};