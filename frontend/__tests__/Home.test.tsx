import { render, screen } from '@testing-library/react'
import Home from '../src/pages/Home'
import * as api from '../src/api/api'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

vi.mock('../src/api/api', () => ({
  getIdeas: vi.fn().mockResolvedValue([]),
  voteIdea: vi.fn().mockResolvedValue({})
}))

test('Home renders', async () => {
  render(<BrowserRouter><Home /></BrowserRouter>)
  expect(await screen.findByText('Ideias')).toBeTruthy()
})
