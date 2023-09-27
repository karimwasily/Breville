/**
 * Custom React App Launcher for AEM static pages
 *
 * Mount react apps based on a case-sensitive MATCH between their component NAME and html ID or DATA-REACT-APP
 *
 * @example
 * >> REACT
 *  1.
 *  CustomApp.displayName = 'CustomApp'
 * 
 *  2.
 *  <AppLauncher>
 *    <CustomApp />
 *    <AnotherCustomApp />
 *  </AppLauncher>
 * 
 * >> WEBPAGE
 *  3.
 *  <div data-react-app='CustomApp'></div>
 *   OR
 *  <div id='CustomApp'></div>
 *
 * @author "Josh Mu"
 */

import { node } from 'prop-types';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

/**
 * split the react apps in to a list of object containing the name and component
 * the 'name' is made available via webpack
 * @param {React.ReactNode | React.ReactNode[]} components - one or more components to transform
 * @returns {{name: string, component: React.ReactNode}[]}
 */
const getApps = components => {
  // convert to array if we only have one app present
  const list = Array.isArray(components) ? components : [components];
  return list.map(component => ({
    name: component.type.displayName,
    component,
  }));
};

/**
 * get all html elems which require a react app to mount to
 * via matching ID or data-react-app attribute
 * @param {string} id - react app name
 * @returns {Element[]}
 */
const getReactElems = id => [
  ...document.querySelectorAll(`#${id}, [data-react-app="${id}" i]`),
];

/**
 * a loading indicator prior while apps load
 * @returns {React.ReactElement}
 */
const LoadingIndicator = () => <span>Loading...</span>;

/**
 * Helper utility to find and launch custom react apps on a static page via portals
 * @param {{children: React.ReactElement | React.ReactElement[]}} AppLauncherArgs - children is the list of custom react apps
 * @returns {React.ReactElement}
 */
const AppLauncher = ({ children }) => (
  <>
    {getApps(children).map(app =>
      getReactElems(app.name).map((elem, idx) => (
        <Suspense key={idx} fallback={<LoadingIndicator />}>
          {ReactDOM.createPortal(app.component, elem)}
        </Suspense>
      ))
    )}
  </>
);

AppLauncher.propTypes = {
  children: node,
};

export default AppLauncher;
