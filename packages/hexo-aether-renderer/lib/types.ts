import type { configPlugin } from './index';

interface MarkdownConfig {
  render: {
    html: boolean
    xhtmlOut: boolean
    breaks: boolean
    linkify: boolean
    typographer?: boolean
    quotes: string
  }
  plugins?: configPlugin[]
}
