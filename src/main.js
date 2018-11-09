import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
//引入懒加载
import VueLazyload from 'vue-lazyload'

// import 'element-ui/lib/theme-chalk/index.css';
//导入css样式
import './statics/site/css/style.css'

// //使用懒加载
Vue.use(VueLazyload,{
  loading:require('./statics/site/images/01.gif')
})

// Vue.use(ElementUI);
//按需导入
//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui'

//按需使用
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm



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



