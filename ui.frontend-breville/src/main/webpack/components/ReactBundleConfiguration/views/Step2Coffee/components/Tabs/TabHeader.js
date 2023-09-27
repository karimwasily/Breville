import React, { useState } from 'react';
import { func, string, array } from 'prop-types';
import { Tab } from './Tab';

export const TabHeader = ( { activeTab, handleTab, tabs } ) => {

  function onTabClick( e ) {
    const tabId = e.target.getAttribute( 'data-index' );
    handleTab( tabId );
  }

  return (
    <div className='coffee-conf-tab'>
      <div className='coffee-conf-tab__content'>
        <h1 className='coffee-conf-tab__header-title'>
          Choose a coffee for your first shipment
        </h1>
        <p className='coffee-conf-tab__header-desc'>
          Update your coffee choice on Beanz.com anytime between deliveries and choose from hundreds of varieties.
        </p>
      </div>
      <div className='coffee-conf-tab__list'>
        { tabs.map( ( tab ) => (
          <Tab
            key={ tab.id }
            currentTab={ tab.id }
            onClick={ onTabClick }
            isActive={ tab.id === activeTab }
          >
            { tab.label }
          </Tab>
      ) ) }
      </div>
    </div>
  );
};

TabHeader.propTypes = {
  activeTab: string,
  handleTab: func,
  tabs: array
};
