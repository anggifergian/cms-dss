import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import User from './pages/User';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route path='/app'>
        <Route path='home' element={<Dashboard />} />
        <Route path='user' element={<User />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to='/login' />
        }
      />
    </Routes>
  )
}

export default App