import { combineReducers } from 'redux';
import authentication from './authentication';
import claimItems from './claimItems';
import claims from './claims';
import policies from './policies';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as modalReducer } from 'react-redux-modal'

const rootReducer = combineReducers({
  authentication,
  claimItems,
  claims,
  policies,
  form: reduxFormReducer,
  modals: modalReducer
});

export default rootReducer;