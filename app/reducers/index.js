import { combineReducers } from 'redux';
import { reducer as modalReducer } from 'react-redux-modal'
import authentication from './authentication';
import claimItems from './claimItems';
import claims from './claims';

const rootReducer = combineReducers({
  authentication,
  claimItems,
  claims,
  modals: modalReducer
});

export default rootReducer;