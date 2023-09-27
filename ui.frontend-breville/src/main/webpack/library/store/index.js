import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from '../saga';

/**
 * Redux logging middleware
 * @returns {*}
 */
const getReduxDevtoolsExtension = () => require( 'redux-devtools-extension' );
const reduxDevToolsOptions = { trace: true, traceLimit: 30 };
const sagaMiddleware = createSagaMiddleware();
const getStoreEnhancer = () => applyMiddleware( sagaMiddleware );
export let storeInstance = null;

/**
 * Store configuration
 * @param {Object} initialState initial state
 * @returns {*}
 */
export default function configureStore( initialState = {} ) {

  console.info( process.env.ENV, 'environment' );

  const enhance = process.env.ENV === 'development' ?
    getReduxDevtoolsExtension().composeWithDevTools( reduxDevToolsOptions )( getStoreEnhancer() ) :
    getStoreEnhancer();
  const store = createStore(
    rootReducer,
    initialState,
    enhance
  );

  sagaMiddleware.run( rootSaga );

  // Initialization of mediator and Router
  window.__STORE = store;
  storeInstance = store;
  return store;

}
