// src/setupTests.ts
import { server } from '@/mocks/server' // Import the server you've set up
import '@testing-library/jest-dom' // For extended matchers like toBeInTheDocument

// Start the mock server before tests and close it after all tests
beforeAll(() => {
  globalThis.location = new URL('http://localhost') as any
  server.listen()})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())