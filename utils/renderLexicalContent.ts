import type { Incident } from '@/payload-types'

/**
 * Extract text content from Payload's Lexical rich text format
 * @param content - The Lexical content from an incident update
 * @returns Plain text string extracted from the Lexical structure
 */
export function renderLexicalContent(
  content: NonNullable<NonNullable<Incident['updates']>[number]>['content']
): string {
  if (!content?.root?.children) {
    return ''
  }

  return content.root.children
    .map(node => {
      // Extract text from Lexical paragraph nodes
      if ('children' in node && Array.isArray(node.children)) {
        return node.children
          .map(child => ('text' in child ? child.text : ''))
          .filter(Boolean)
          .join(' ')
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')
}
