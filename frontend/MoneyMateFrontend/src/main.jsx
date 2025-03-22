import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar.jsx'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import HomePage from './components/HomePage.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Crypto from './components/Crypto.jsx'
import News from './components/News.jsx'
import Contacts from './components/contacts.jsx'
import CryptoPage from './components/CryptoCoinPage.jsx'

function MainApp() {
  const location = useLocation();

  return (
    <div className="mainDiv">
      {/* Mostra la navbar solo se non sei nella rotta /login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/crypto' element={<Crypto />}></Route>
        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path='/crypto/:coinName' element={<CryptoPage />}></Route>
      </Routes>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>,
);