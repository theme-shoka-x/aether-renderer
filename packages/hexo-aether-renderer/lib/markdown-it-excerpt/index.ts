import type MarkdownIt from 'markdown-it'

export default function (md:MarkdownIt) {
  const defaultRenderer = md.renderer.rules.text.bind(md.renderer.rules)

  const rExcerpt = /<!--+\s*more\s*--+>/i

  md.renderer.rules.text = (tokens, index, options, env, self) => {
    const content = tokens[index].content
    if (rExcerpt.test(content)) {
      return content
    } else {
      return defaultRenderer(tokens, index, options, env, self)
    }
  }
}
