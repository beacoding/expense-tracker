import { combineReducers } from 'redux';
import authentication from './authentication';
import claimItems from './claimItems';
import claims from './claims';

const expenseApp = combineReducers({
  authentication,
  claimItems,
  claims
});

export default expenseApp;