import React from 'react';
import { string, node } from 'prop-types';

export const SectionWithHeading = ( { title, children } ) => {
  return (
    <div className='cmp-container'>
      <div className='title'>
        <div className='cmp-title'>
          <h2 className='cmp-title__text'> { title }</h2>
        </div>
      </div>
      { children }
    </div>
  );
};

SectionWithHeading.propTypes = {
  title: string,
  children: node
};
