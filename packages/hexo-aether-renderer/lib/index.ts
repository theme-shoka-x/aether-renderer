import MdIt from 'markdown-it'
import type Hexo from 'hexo'
import { MarkdownConfig } from './types'

type prePlugin = {
  name: string
  enable: boolean
  options?: unknown
}

export type configPlugin = {
  plugin: {
    options?: unknown
  } & prePlugin
}

type RenderData = {
  path?: string
  text: string
}

interface DefaultPluginList {
  [index:string]: prePlugin
}

const defaultPlugins = [
  'markdown-it-abbr',
  'markdown-it-bracketed-spans',
  'markdown-it-attrs',
  'markdown-it-deflist',
  'markdown-it-emoji',
  'markdown-it-footnote',
  'markdown-it-ins',
  'markdown-it-mark',
  'markdown-it-multimd-table',
  'markdown-it-sub',
  'markdown-it-sup',
  'markdown-it-task-checkbox',
  'markdown-it-toc-and-anchor',
  'markdown-it-pangu',
  './markdown-it-container',
  './markdown-it-excerpt',
  './markdown-it-prism'
]

function preprocessPlugins (plugins:configPlugin[]) {
  const defaultPluginsList:DefaultPluginList = {}
  defaultPlugins.forEach((plugin) => {
    defaultPluginsList[plugin] = { name: plugin, enable: true }
  })

  const resPlugins:prePlugin[] = []

  if (plugins) {
    for (const plugin of plugins) {
      if (!(plugin instanceof Object)) {
        continue
      }
      const pluginName = plugin.plugin.name
      if (!pluginName) {
        continue
      }
      plugin.plugin.enable = !!plugin.plugin.enable
      if (defaultPluginsList[pluginName]) {
        defaultPluginsList[pluginName] = plugin.plugin
      } else {
        resPlugins.push(plugin.plugin)
      }
    }
  }
  for (const defaultPlugin of defaultPlugins) {
    resPlugins.unshift(defaultPluginsList[defaultPlugin])
  }

  return resPlugins
}

export default function (this: Hexo, data:RenderData) {
  const cfg = this.config.markdown as MarkdownConfig
  let parser = new MdIt(cfg.render)

  const plugins = preprocessPlugins(cfg.plugins)
  parser = plugins.reduce((parser, plugins) => {
    if (plugins.enable) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      let plugin = require(plugins.name)

      if (typeof plugin !== 'function' && typeof plugin.default === 'function') {
        plugin = plugin.default
      }

      if (plugins.options) {
        return parser.use(plugin, plugins.options)
      } else {
        return parser.use(plugin)
      }
    } else return parser
  }, parser)

  return parser.render(data.text)
}
