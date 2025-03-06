import { setupWorker } from 'msw'
import { handlers } from './mocks'

// Create browser worker with the same handlers
export const worker = typeof window !== 'undefined' ? setupWorker(...handlers) : null