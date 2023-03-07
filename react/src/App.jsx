import { useState } from 'react'
import routes from './routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withRoleGuard from './helpers/roleGuard'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
            // <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
