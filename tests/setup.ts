import { vi } from 'vitest'

// Mock global window object for SSR compatibility tests
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Mock fetch globally
global.fetch = vi.fn()

// Mock $fetch for Nuxt
global.$fetch = vi.fn()

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}