import { useState } from 'react'
// import { routes } from './routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          {/* {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))} */}
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App
