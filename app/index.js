import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)