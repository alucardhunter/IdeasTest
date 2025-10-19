import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../src/pages/Home'
import { UserProvider } from '../src/context/UserContext'

vi.mock('../src/api/api', () => ({
  getIdeas: vi.fn().mockResolvedValue([]),
  voteIdea: vi.fn().mockResolvedValue({})
}))

test('Home renders', async () => {
  render(<BrowserRouter><UserProvider><Home /></UserProvider></BrowserRouter>)
  expect(await screen.findByLabelText('add')).toBeTruthy()
})
