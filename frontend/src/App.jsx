import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
