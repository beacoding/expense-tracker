import { combineReducers } from 'redux';
import authentication from './authentication';
import claimItems from './claimItems';
import claims from './claims';
import policies from './policies';
import reports from './reports';
import employees from './employees';
import email from './email';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as modalReducer } from 'react-redux-modal';
import { reducer as toastrReducer } from 'react-redux-toastr'

const appReducer = combineReducers({
  authentication,
  claimItems,
  claims,
  policies,
  reports,
  employees,
  policies,
  email,
  toastr: toastrReducer,
  form: reduxFormReducer,
  modals: modalReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;