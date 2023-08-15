import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// Make raw-content render as markdown formatting content
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
