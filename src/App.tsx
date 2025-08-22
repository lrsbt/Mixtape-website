import "@app/assets/css/styles.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from '@app/screens/auth/Signup';
import Login from '@app/screens/auth/Login';
import Logout from "./screens/auth/Logout";
import MyProfile from "./screens/myProfile";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/me" element={<MyProfile/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
