import React, { useEffect, useState } from 'react';
import { selectComparionList } from 'library/store/global/selector';
import { useSelector } from 'react-redux';

export const ComparisonEmptyNotification = () => {
  // todo: this text needs to be passed from AEM
  const secondModelLabel = 'Select a second model below';
  const thirdModelLabel = 'Select an optional third model below';

  const [textContent, setTextContent] = useState( '' );

  const comparisonList = useSelector( selectComparionList );

  useEffect( () => {
    const compLen = comparisonList.length;
    const content = compLen === 1 ? secondModelLabel : compLen === 2 ? thirdModelLabel : '';
    setTextContent( content );
  }, [comparisonList] );

  if ( textContent === '' ) {
    return null;
  }

  return (
    <div className='cmp-comparison__emptyslots'>
      <div className='cmp-comparison__emptyslots-block'>
        { textContent }
      </div>
    </div>
  );
};
