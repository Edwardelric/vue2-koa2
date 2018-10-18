# EdTab

* tab 切换组件

 
## 可选的配置项：


 配置项 | 类型 | 描述 | 默认值 
------------------|---------|-------------------------------- |-----
 labelKey         | String  | 指定item的文字部分在item对象中的key | label 
 fixBottom        | Boolean | 是否固定在视图底部                      | false
 canViewItemNum   | Number  | 初始化时候展示的tab个数并根据当前页面宽等分 | 3
 lineWidthRate    | Number  | fixBottom 为true 有效 | 1
 tabStyle         | Object  | tabItem 的具体style样式 | {}
 activeStyle      | Object  | 当前点击的tab高亮  |  {color: '#f58323'}
 additionalX      | Number  | 近似等于超出边界时最大可拖动距离 | 50px 
 sensitivity      | Number  | 惯性滑动时的灵敏度(值越小，阻力越大),可近似认为手松开后速度减为零所需时间 | 1000ms
 reBoundExponent  | Number  | 惯性回弹指数(值越大，幅度越大，惯性回弹距离越长) | 10 
 reBoundingDuration | Number| 回弹动画duration 为0时无动画效果 | 360ms   


