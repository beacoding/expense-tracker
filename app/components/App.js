import React from 'react';
import ClaimList from '../containers/ClaimList';
import ClaimPage from '../containers/ClaimPage';
import NavBar from '../containers/NavBar';

const App = () => (
  <div>
    <NavBar />
    <ClaimList />
    <ClaimPage />
  </div>
)

export default App;