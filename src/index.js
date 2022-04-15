import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Event from './components/Event/Event';
import AppNavbar from './components/AppNavbar/AppNavbar'
import Search from './components/Search/Search'
import User from './components/User/User'
import Login from './components/Login/Login'
import Favorites from './components/Favorites/Favorites'
import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from "./hooks/useAuth";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Login register={true} />} />
          <Route path="event/:id" element={<Event />} />
          <Route path="search" element={<Search />} />
          <Route path="user/:id" element={<User />} />
          <Route path="favorites/:id" element={<Favorites />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
