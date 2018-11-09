//因为是基于vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//按需的导入
import {addLocalStorage,getTotalCount,updataLocalStorage,deleteLocalStorage} from '../common/localStorage.js'

const store = new Vuex.Store({
    //创建一仓库
    state:{
        buyCount:0
    },
    //获取数据
    getters:{
        getAddGoods(state){
            return state.buyCount===0 ?getTotalCount() : state.buyCount
        }
    },
    //
     mutations:{
         //state是固定的,还要一个载荷
         addGoods(state,goods){
            state.buyCount = addLocalStorage(goods)
         },
         //数据库中的修改功能
         updataGoods(state,goods){
             state.buyCount=updataLocalStorage(goods)
         },
         //删除页面功能
         deleteLocalGoods(state,goodsId){
             state.buyCount=deleteLocalStorage(goodsId)
         }
     }
})

//导出仓库
export default store