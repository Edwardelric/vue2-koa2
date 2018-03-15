# poi

## poi 简介:
   * poi 为 webpack 的再次封装
   * 省略了webpack繁重的配置文件，提供了诸多默认的设置
   
## poi 安装:
   * yarn add poi global
   
## poi 使用:
   * poi 运行
   * poi build 打包
   
## poi 配置:
   * options.mode 是当前的运行环境: develop, production, watch, test
   * req 是 node-module 里面的依赖包
   * jsx 默认是 vue， 并可以通过 jsx: react 转换为 react, 目前只支持 react,vue
   * vender: false => code 不用 split
   * html: false => 不需要生成html页面
   * extractCSS: false => 不需要生成公用的css
   * env: 运行环境，可以在配置文件中 env: keyName value 形式设置全局变量,或者在启动的时候 --env.keyName value 形式设置
   
## poi 优势:
   * 配置文件简介易懂    