import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { LoggedProvider } from './contexts/LoggedContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectRoute from '../ProtectRoute';
import Login from './Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <NotificationProvider>
      <LoggedProvider>
        <ToastContainer
          autoClose={1000}
          draggable="touch"
          draggableDirection="x"
          theme="light"
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </LoggedProvider>
    </NotificationProvider>
  );
}

export default App;
