import { combineReducers } from 'redux';

import { reducer as demoSlice } from './demo-slice/reducer';
import { reducer as ui } from './ui/reducer';
import { reducer as cart } from './cart/reducer';
import { reducer as subscription } from './subscription/reducer';
import { reducer as user } from './user/reducer';
import { reducer as checkout } from './checkout/reducer';

export default combineReducers( {
  cart,
  checkout,
  subscription,
  demoSlice,
  ui,
  user
} );
