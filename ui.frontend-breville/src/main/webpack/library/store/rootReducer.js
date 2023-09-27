import { combineReducers } from 'redux';

import { reducer as demoSlice } from './demo-slice/reducer';
import { reducer as ui } from './ui/reducer';
import { reducer as payment } from './payment/reducer';
import { reducer as product } from './product/reducer';
import { reducer as cart } from './cart/reducer';
import { reducer as bundle } from './bundle/reducer';
import { reducer as global } from './global/reducer';
import { reducer as checkout } from './checkout/reducer';
import { reducer as user } from './user/reducer';
import { reducer as mybreville } from './mybreville/reducer';

export default combineReducers( {
  payment,
  product,
  cart,
  demoSlice,
  ui,
  bundle,
  global,
  checkout,
  user,
  mybreville
} );
