import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from './components/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="mainDiv">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </div>
  </BrowserRouter>,
)
