import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import ReduxModal from 'react-redux-modal'
import NavBar from './containers/NavBar';
import ClaimList from './containers/ClaimList';
import ClaimPage from './containers/ClaimPage';
import ApprovalPage from './containers/ApprovalPage';
import ApprovalLimitsContainer from './containers/ApprovalLimitsContainer';
import UserManagementContainer from './containers/UserManagementContainer';
import ReportsContainer from './containers/ReportsContainer';
import reducer from './reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

    <div className="wrapper">
      <nav id="sidebar">
        <NavBar />
      </nav>
      <div id="content">
        <ApprovalPage/>
      </div>
    </div>

render(  
  <Provider store={store}>
    <div className="App">
      <Router>
        <div className="wrapper">
          <nav id="sidebar">
            <NavBar />
          </nav>
          <div id="content">
            <Switch>
              <Route exact path="/" component={ClaimList} />
              <Route exact path="/claims" component={ClaimList}/>
              <Route path="/claims/:claim_id/" component={ClaimPage}/>
              <Route exact path="/approvals" component={ApprovalPage}/>
              <Route path="/approvals/:claim_id/" component={ClaimPage}/> 
              <Route path="/admin/reports" component={ReportsContainer}/> 
              <Route path="/admin/limits" component={ApprovalLimitsContainer}/> 
              <Route path="/admin/users" component={UserManagementContainer}/> 
            </Switch>
          </div>
        </div>
      </Router>
      <ReduxModal />
    </div>
    </Provider>,
  document.getElementById('root')
)