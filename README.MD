# aether-renderer
**WIP** \
aether-renderer（下称"以太渲染器"）是 [HRMNMI](https://github.com/theme-shoka-x/hexo-renderer-multi-next-markdown-it) 的继任者，旨在于使用更现代化的代码重构前者

目前以太渲染器对旧有模块进行了拆分：
- `hexo-aether-renderer`：
  - `hexo-aether-renderer`：包含代码高亮、容器、文章摘要和文字特效等功能，渲染器本体
  - `hexo-aether-renderer-math`：基于 KaTeX 的数学渲染模块
  - `hexo-aether-renderer-spoiler`：文字黑幕特效
  - `hexo-aether-renderer-furigana`：文字注音
  - `hexo-aether-renderer-graphviz`：graphviz 绘图
  - `hexo-aether-renderer-mermaid`：mermaid 绘图
- [hexo-lightning-minify](https://github.com/theme-shoka-x/hexo-lightning-minify)：新一代静态文件压缩插件，支持 WebP 转换等功能。

