import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
//引入懒加载
import VueLazyLoad from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css';
//导入css样式
import './statics/site/css/style.css'

Vue.use(ElementUI);

// //使用懒加载
Vue.use(VueLazyLoad,{
    loading:require('./statics/site/images/01.gif')
})

Vue.config.productionTip = false

//导入时间组件,因为只是打包的时候用,所以不用from来导入
import './filters/index.js'

//导入router的路径
import router from './router/index.js'

//导入仓库
import store from './store/index.js'

new Vue({
  render: h => h(App),
  router:router,
  //注入仓库
  store:store
}).$mount('#app')



