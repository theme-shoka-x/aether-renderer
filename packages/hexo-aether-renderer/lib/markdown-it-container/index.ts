import type MarkdownIt from 'markdown-it'

import plugin = require('markdown-it-container')

/*
  截取第一个空格前后的字符串，并分割为[原始字符串, 空格前, 空格后] <br>
  例如: tab1 someText -> ['tab1 someText', 'tab1', 'someText']
*/
function divideTokens (tokenInfo:string) {
  return [tokenInfo, tokenInfo.substring(0, tokenInfo.indexOf(' ')).trim(), tokenInfo.substring(tokenInfo.indexOf(' ')).trim()]
}

export default function (md:MarkdownIt) {
  md.use(plugin, 'note', {
    validate: function (params:string) {
      return params.trim().match(/^(default|primary|success|info|warning|danger)(.*)$/)
    },
    render: function (tokens:MarkdownIt.Token[], idx:number) {
      const m = tokens[idx].info.trim().match(/^(.*)$/)

      if (tokens[idx].nesting === 1) {
        return '<div class="note ' + m[1].trim() + '">\n'
      } else {
        return '</div>\n'
      }
    }
  })

  md.use(plugin, 'tab', {
    marker: ';',

    validate: function (params:string) {
      const paramsTrim = params.trim()
      return divideTokens(paramsTrim)
    },

    render: function (tokens:MarkdownIt.Token[], idx:number) {
      const tokenInfo = tokens[idx].info.trim()
      const m = divideTokens(tokenInfo)
      if (tokens[idx].nesting === 1) {
        return '<div class="tab" data-id="' + m[1].trim() + '" data-title="' + m[2].trim() + '">\n'
      } else {
        return '</div>\n'
      }
    }
  })

  md.use(plugin, 'collapse', {
    marker: '+',

    validate: function (params:string) {
      return params.match(/^(primary|success|info|warning|danger|\s)(.*)$/)
    },

    render: function (tokens:MarkdownIt.Token[], idx:number) {
      const m = tokens[idx].info.match(/^(primary|success|info|warning|danger|\s)(.*)$/)

      if (tokens[idx].nesting === 1) {
        const style = m[1].trim()
        return '<details' + (style ? ' class="' + style + '"' : '') + '><summary>' + m[2].trim() + '</summary><div>\n'
      } else {
        return '</div></details>\n'
      }
    }
  })
}
