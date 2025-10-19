import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewIdea from './pages/NewIdea'
import IdeaDetails from './pages/IdeaDetails'
import Header from './components/Header'
import Container from '@mui/material/Container'

export default function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewIdea />} />
          <Route path="/ideas/:id" element={<IdeaDetails />} />
        </Routes>
      </Container>
    </div>
  )
} 