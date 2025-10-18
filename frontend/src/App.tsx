import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import NewIdea from './pages/NewIdea'
import IdeaDetails from './pages/IdeaDetails'

export default function App(){
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/new">Nova Ideia</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/new" element={<NewIdea/>} />
        <Route path="/ideas/:id" element={<IdeaDetails/>} />
      </Routes>
    </div>
  )
}
