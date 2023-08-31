import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

/**
 * Converts the given text to Markdown format using MarkdownIt library.
 *
 * @param {string} text - The input text to be converted to Markdown.
 * @returns {string} The Markdown formatted text.
 */
export const toMarkdown = (text: string) => {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang))
        return hljs.highlight(str, { language: lang }).value
      return ''
    },
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })
  return md.render(text)
}
