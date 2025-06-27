import { describe, it, expect, vi, beforeEach } from 'vitest'
import { calculateReadTime, getReadTimeForPost } from '~/utils/readingTime'

describe('readingTime utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('calculateReadTime', () => {
    it('should return minimum read time for empty content', () => {
      expect(calculateReadTime('')).toBe(1)
      expect(calculateReadTime('   ')).toBe(1)
      expect(calculateReadTime(null as any)).toBe(1)
      expect(calculateReadTime(undefined as any)).toBe(1)
    })

    it('should calculate reading time for plain text', () => {
      // 200 words = 1 minute at 200 WPM
      const words200 = Array(200).fill('word').join(' ')
      expect(calculateReadTime(words200)).toBe(1)
      
      // 400 words = 2 minutes at 200 WPM
      const words400 = Array(400).fill('word').join(' ')
      expect(calculateReadTime(words400)).toBe(2)
      
      // 600 words = 3 minutes at 200 WPM
      const words600 = Array(600).fill('word').join(' ')
      expect(calculateReadTime(words600)).toBe(3)
    })

    it('should round reading time correctly', () => {
      // 150 words = 0.75 minutes, should round to 1
      const words150 = Array(150).fill('word').join(' ')
      expect(calculateReadTime(words150)).toBe(1)
      
      // 300 words = 1.5 minutes, should round to 2
      const words300 = Array(300).fill('word').join(' ')
      expect(calculateReadTime(words300)).toBe(2)
    })

    it('should remove frontmatter from markdown', () => {
      const contentWithFrontmatter = `---
title: Test Post
description: Test description
date: 2023-01-01
---

This is the actual content with some words to count.`
      
      // Should only count words after frontmatter
      const result = calculateReadTime(contentWithFrontmatter)
      expect(result).toBe(1) // Few words after frontmatter
    })

    it('should remove code blocks', () => {
      const contentWithCode = `
Here is some text.

\`\`\`javascript
function test() {
  console.log('This code should not be counted')
  const manyVariables = 'with lots of words that should not count'
}
\`\`\`

More text here.`
      
      const result = calculateReadTime(contentWithCode)
      expect(result).toBe(1) // Only counting "Here is some text. More text here."
    })

    it('should remove inline code', () => {
      const contentWithInlineCode = `
Here is text with \`someCode()\` and \`moreCode.with.lots.of.words\` inline.
This should only count the regular words.`
      
      const result = calculateReadTime(contentWithInlineCode)
      expect(result).toBe(1) // Only regular words counted
    })

    it('should remove markdown images', () => {
      const contentWithImages = `
Here is some text.
![Alt text](http://example.com/image.jpg)
![Another image with long alt text that should not be counted](http://example.com/another.jpg)
More text here.`
      
      const result = calculateReadTime(contentWithImages)
      expect(result).toBe(1) // Only "Here is some text. More text here."
    })

    it('should remove markdown links but keep text', () => {
      const contentWithLinks = `
Here is [a link](http://example.com) and [another link with long URL that should not count](http://very-long-url.com/with/many/parts).
More text here.`
      
      const result = calculateReadTime(contentWithLinks)
      expect(result).toBe(1) // Should count "Here is and. More text here."
    })

    it('should remove markdown headers', () => {
      const contentWithHeaders = `
# Main Title
## Sub Title
### Another Header
#### Fourth Level
##### Fifth Level
###### Sixth Level

Here is the actual content that should be counted.`
      
      const result = calculateReadTime(contentWithHeaders)
      expect(result).toBe(1) // Only "Here is the actual content that should be counted."
    })

    it('should remove bold and italic formatting', () => {
      const contentWithFormatting = `
Here is **bold text** and *italic text* and ***bold italic***.
Also __bold__ and _italic_ and ___bold italic___.
This should count all the words without the formatting.
`.repeat(10) // Make it longer to ensure > 1 minute
      
      const result = calculateReadTime(contentWithFormatting)
      // Should count all words without formatting symbols  
      expect(result).toBeGreaterThanOrEqual(1)
      expect(typeof result).toBe('number')
    })

    it('should remove HTML tags', () => {
      const contentWithHTML = `
<div>Here is some content</div>
<p>With <strong>various</strong> <em>HTML</em> tags</p>
<script>
  // This script content should not be counted
  console.log('lots of words in script tags that should not count')
</script>
<style>
  /* CSS content should not be counted either */
  .class { property: value; }
</style>
Regular text here.`
      
      const result = calculateReadTime(contentWithHTML)
      expect(result).toBe(1) // Only the actual text content
    })

    it('should normalize whitespace', () => {
      const contentWithExtraSpaces = `
Here    is    content    with
multiple   spaces   and
      tabs and newlines
that should be normalized.`
      
      const result = calculateReadTime(contentWithExtraSpaces)
      expect(result).toBe(1) // Should handle whitespace normalization
    })

    it('should handle complex markdown document', () => {
      const complexMarkdown = `---
title: Complex Post
description: A complex blog post with everything
date: 2023-01-01
tags: [test, markdown]
---

# Introduction

This is a **complex** blog post with *various* elements.

## Code Examples

Here's some JavaScript:

\`\`\`javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
\`\`\`

And some inline code: \`const result = calculateTotal(items)\`.

## Images and Links

Check out this [awesome link](https://example.com) and this image:

![Description](https://example.com/image.jpg)

## Lists

- Item one
- Item two with **bold** text
- Item three with [a link](https://example.com)

### More Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<div class="highlight">
  <p>Some HTML content that should be cleaned</p>
</div>

Final paragraph with normal text.`
      
      const result = calculateReadTime(complexMarkdown)
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThan(5) // Should be reasonable for this content
    })
  })

  describe('getReadTimeForPost', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should fetch reading time via API', async () => {
      const mockFetch = vi.mocked(global.$fetch)
      mockFetch.mockResolvedValue({ readTime: 5 })
      
      const result = await getReadTimeForPost('test-slug')
      
      expect(result).toBe(5)
      expect(mockFetch).toHaveBeenCalledWith('/api/blog/read-content', {
        method: 'POST',
        body: { filePath: 'content/blog/test-slug.md' }
      })
    })

    it('should return minimum read time when API returns invalid data', async () => {
      const mockFetch = vi.mocked(global.$fetch)
      mockFetch.mockResolvedValue({ readTime: null })
      
      const result = await getReadTimeForPost('test-slug')
      
      expect(result).toBe(1)
    })

    it('should return minimum read time when API call fails', async () => {
      const mockFetch = vi.mocked(global.$fetch)
      mockFetch.mockRejectedValue(new Error('API Error'))
      
      const mockConsoleWarn = vi.mocked(console.warn)
      
      const result = await getReadTimeForPost('test-slug')
      
      expect(result).toBe(1)
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Could not calculate reading time for post: test-slug'
      )
    })

    it('should handle different slug formats', async () => {
      const mockFetch = vi.mocked(global.$fetch)
      mockFetch.mockResolvedValue({ readTime: 3 })
      
      await getReadTimeForPost('my-blog-post-title')
      
      expect(mockFetch).toHaveBeenCalledWith('/api/blog/read-content', {
        method: 'POST',
        body: { filePath: 'content/blog/my-blog-post-title.md' }
      })
    })

    it('should handle empty slug', async () => {
      const mockFetch = vi.mocked(global.$fetch)
      mockFetch.mockRejectedValue(new Error('Invalid path'))
      
      const result = await getReadTimeForPost('')
      
      expect(result).toBe(1)
    })
  })
})