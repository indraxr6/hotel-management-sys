import { useState } from 'react'
import routes from './routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserContext from './hooks/useContext'
import './App.css'
import NotFound from './pages/NotFound'

function App() {
  const [user, setUser] = useState(null)
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
            // <Route key={index} path={route.path} element={route.component} />
          ))}
          <Route element={<NotFound/>} path={"*"}/>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
