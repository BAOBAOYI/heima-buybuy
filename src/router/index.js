import Vue from 'vue'
import VueRouter from 'vue-router'

//如果使用模块化的方式来开发,必须要写下面的代码
Vue.use(VueRouter)

//导入axios
import axios from 'axios'
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true
Vue.prototype.$axios=axios

//导入组件
// import goodslist from '../components/goods/goodslist.vue';

//导入商品详情组件
// import goodsinfo from '../components/goods/goodsinfo.vue'

//导入购物车组件
// import shopCart from  '../components/shopCart/shopCart.vue'

//导入提交订单组件
// import order from '../components/order/order.vue'

//导入登录页面组件
// import login from '../components/account/login.vue'

//导入下单的详情页面
// import payorder from '../components/pay/payorder.vue'

//导入支付完毕之后的页面
// import paySuccess from '../components/pay/paySuccess.vue'

//导入会员中心中的订单详情页面
// import vipCenter from '../components/vip/vipCenter.vue'

//交易订单页面导入
// import myOrder from '../components/vip/myOrder.vue'

//导入订单详情页面
// import orderInfo from '../components/vip/orderInfo.vue'

const goodslist = () => import(/* webpackChunkName: "group-foo" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "group-foo" */ '../components/goods/goodsinfo.vue')
const shopCart = () => import(/* webpackChunkName: "group-foo" */ '../components/shopCart/shopCart.vue')
const order = () => import(/* webpackChunkName: "group-foo" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "group-foo" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "group-foo" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "group-foo" */ '../components/pay/paySuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "group-foo" */ '../components/vip/vipCenter.vue')
const myOrder = () => import(/* webpackChunkName: "group-foo" */ '../components/vip/myOrder.vue')
const orderInfo = () => import(/* webpackChunkName: "group-foo" */ '../components/vip/orderInfo.vue')

//新建路由对象
const router=new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsId',component:goodsinfo}, //创建商品详情页面的跳转路径
        {path:'/shopCart',component:shopCart},//设置购物车的路由规则
        {path:'/login',component:login},//登录页面的路由规则

        {path:'/order',component:order, meta: { checkoutLogin: true }},//提交订单的路由规则
        {path:'/pay',component:payorder,meta: { checkoutLogin: true }},//支付页面的路由规则
        {path:'/paySuccess',component:paySuccess,meta: { checkoutLogin: true }},//扫二维码后跳转成功后的页面
        {path:'/vipCenter',component:vipCenter,meta: { checkoutLogin: true }},//会员中的页面详情
        {path:'/myOrder',component:myOrder,meta: { checkoutLogin: true }},//交易订单页面
        {path:'/orderInfo',component:orderInfo,meta: { checkoutLogin: true }},//交易订单的详情
    ]
})

/**
 * 导航守卫:
 * to:是指去到那里
 * from:是指重那里来.一般可以不写
 * next:是指允许通过
 */
router.beforeEach((to, from, next) => {
    console.log(to)
    //记录想到去的地方
    if(to.path !=='/login'){
        localStorage.setItem('wantVisitPath',to.fullPath)
    }
    //来到这里代表需要拦截
    if(to.meta.checkoutLogin){
        //如果登录了,就跳转到下单页面
        //如果没有登录需要跳转到登录页面==>通过 编程式路由老跳转

        axios.get('site/account/islogin').then(response=>{
            console.log(response.data)
            if(response.data.code==='logined'){
                //已经登录过
                next()
            }else{
                router.push({path:'/login'})
            }
        })
    }else{
        next()
    }
    
  })


//导出路由
export default router;
