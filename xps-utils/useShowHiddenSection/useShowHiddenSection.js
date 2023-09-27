import { useEffect } from 'react';

/**
 * custom hook to show hidden section
 * @param {{toggleId: string, selectorId: string}} args args
 * @returns {void}
 */
export const useShowHiddenSection = ( { toggleId, selectorId } ) => {

  useEffect( () => {
    const hiddenSectionToggle = document.getElementById(toggleId);
    const hiddenSectionSelector = document.getElementById(selectorId);
    
    // conditionally check that toggle and selector exist
    if ( hiddenSectionToggle && hiddenSectionSelector) {
      // show a particular hidden section with 'selectorId' when a toggle with 'toggleId' is clicked
      hiddenSectionToggle.addEventListener('click', function() {
        hiddenSectionToggle.style.display = 'none';
        hiddenSectionSelector.style.display = 'block';
      }, { once: true }); // only run the event listener once
    }
  }, [] );

};
