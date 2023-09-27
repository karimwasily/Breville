import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const resetRefinements = ({ items, refine, onReset }) => {

  function handleClick() {
    refine(items)
    if(onReset) onReset();
  }
  
return(
  <button className="cmp-button__plp-left--reset-btn" onClick={handleClick}>
    Reset
  </button>
);
}

export const ClearRefinements = connectCurrentRefinements(resetRefinements);