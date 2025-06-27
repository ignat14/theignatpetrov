import { vi } from 'vitest'

// Mock Nuxt composables
export const mockRoute = {
  params: { slug: 'test-slug' },
  path: '/blog/test-slug',
  query: {},
}

export const useRoute = vi.fn(() => mockRoute)
export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
}))

export const useAsyncData = vi.fn((key, handler) => ({
  data: { value: null },
  pending: { value: false },
  error: { value: null },
  refresh: vi.fn(),
}))

export const queryContent = vi.fn(() => ({
  find: vi.fn(),
  findOne: vi.fn(),
  where: vi.fn().mockReturnThis(),
}))

export const readonly = vi.fn((val) => val)

export const useHead = vi.fn()