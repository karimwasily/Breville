import React from 'react';
import VisaSvg from 'resources/svgs/visa.svg';
import AmexSvg from 'resources/svgs/amex.svg';
import MasterCardSvg from 'resources/svgs/mastercard.svg';
import DiscoverSvg from 'resources/svgs/discover.svg';

export default ()=>{
  return (
    <div className='card-type'>
      <VisaSvg />
      <AmexSvg />
      <MasterCardSvg />
      <DiscoverSvg />
    </div>
  );
};