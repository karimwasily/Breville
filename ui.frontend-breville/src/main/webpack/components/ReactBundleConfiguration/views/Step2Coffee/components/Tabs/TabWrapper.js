import React from 'react';
import { array, func, string } from 'prop-types';
import { TabHeader } from './TabHeader';


export const TabWrapper = ( { activeTab, handleTab, tabs } ) => {
  return (
    <div className='coffee-conf-tab__container'>
      <TabHeader activeTab={ activeTab } handleTab={ handleTab } tabs={ tabs } />
      <div className='coffee-conf-tab__content'>
        { tabs.find( ( tab ) => tab.id === activeTab ).content }
      </div>
    </div>
  );
};

TabWrapper.propTypes = {
  activeTab: string,
  handleTab: func,
  tabs: array,
  viewId: string
};
