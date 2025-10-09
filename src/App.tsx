import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/app.scss';
import './index.css';

import AdminApp from './admin/AdminApp';
import ClientApp from './Client';
import React from 'react';
import MouseTrail from './components/MouseTrail';

function App() {
  return (
    <>
      <link rel='icon' type='image/png' href='/favicon.png' />
      <Router basename='/'>
        <Routes>
          <Route path='/admin/*' element={<AdminApp />} />
          <Route path='/*' element={<ClientApp />} />
        </Routes>
      </Router>
      <MouseTrail />
    </>
  );
}

export default App;
