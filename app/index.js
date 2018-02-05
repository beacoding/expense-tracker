import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import App from './components/App';
import ClaimPageWithNav from './components/ClaimPageWithNav';
import ApprovalListWithNav from './components/ApprovalListWithNav';
import ClaimPage from './containers/ClaimPage';
import reducer from './reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

render(
  <Provider store={store}>
    <Router>
      <div>
      <Route exact path="/" component={App} />
      <Route path="/claims/:claim_id/" component={ClaimPageWithNav}/>
      <Route path="/approvals" component={ApprovalListWithNav}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)