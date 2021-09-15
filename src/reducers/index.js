import { combineReducers } from 'redux';
import psp from './psp/psp';
import pdp from './pdp/pdp';

export default combineReducers({
  psp: psp,
  pdp: pdp
});
