import { combineReducers } from 'redux';
import authentication from './authentication';
import claimItems from './claimItems';
import claims from './claims';
import limits from './approvalLimits';
import {reducer as reduxFormReducer } from 'redux-form';
import {reducer as modalReducer} from 'react-redux-modal'

const rootReducer = combineReducers({
  authentication,
  claimItems,
  claims,
  limits,
  form: reduxFormReducer,
  modals: modalReducer
});

export default rootReducer;