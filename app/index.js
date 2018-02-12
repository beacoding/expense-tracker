import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import ReduxModal from 'react-redux-modal'
import ClaimListWithNav from './components/ClaimListWithNav';
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
    <div>
      <Router>
        <div>
        <Route exact path="/" component={ClaimListWithNav} />
          <Route exact path="/claims" component={ClaimListWithNav}/>
          <Route path="/claims/:claim_id/" component={ClaimPageWithNav}/>
          <Route exact path="/approvals" component={ApprovalListWithNav}/>
          <Route path="/approvals/:claim_id/" component={ClaimPageWithNav}/>  
        </div>      
      </Router>
      <ReduxModal />
    </div>
  </Provider>,
  document.getElementById('root')
)