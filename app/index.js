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
import ApprovalList from './containers/ApprovalList';
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
        <ApprovalList/>
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
              <Route exact path="/approvals" component={ApprovalList}/>
              <Route path="/approvals/:claim_id/" component={ClaimPage}/> 
              <Route path="/reports" component={ReportsContainer}/> 
            </Switch>
          </div>
        </div>
      </Router>
      <ReduxModal />
    </div>
    </Provider>,
  document.getElementById('root')
)