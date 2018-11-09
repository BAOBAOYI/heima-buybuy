<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodsList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                      v-model="item.isSlect">
                                    </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <div data-v-2be32b7a="">
                                            <!-- {{item.buycount}} -->
                                            <inputnumber :goodsId='item.id' :count='item.buycount' @goodCountChange="getChangeCount"></inputnumber>
                                        </div>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(index)" >删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length===0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalGoods}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalMoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <!-- <router-link to="/goodslist"> -->
                                 <button class="button" @click="continueBuy">继续购物</button>
                             <!-- </router-link> -->
                            <button class="submit" @click="goToplay">提交订单</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //按需导入商品id还有数量
    import {getLocalGoods} from '../../common/localStorage.js'
    

    //导入子组件
    import inputnumber from '../subcomponents/inputnumber.vue'

    export default {
         //注册子组件
         components:{   
            inputnumber
         },
        data(){
            return {
                goodsList:[],
            }
        },
        created(){
            this.getGoodsListData()
        },
        computed:{
            //先要获取总的数量
            getTotalGoods(){
                let totalGoods=0
                this.goodsList.forEach(item=>{
                    if(item.isSlect){
                         totalGoods+=item.buycount
                    }
                })
                return totalGoods
            },
            //计算中的数目
            getTotalMoney(){
                let totalMoney=0
                this.goodsList.forEach(item=>{
                     if(item.isSlect){
                    totalMoney+=item.buycount*item.sell_price
                     }
                })
                return totalMoney
            }
        },
        methods:{
            getGoodsListData(){
                //准备api的请求site/comment/getshopcargoods/88,102    需要商品id，多个用,分割
                //先要准备好id
                const getGoods=getLocalGoods();

                //获取getGoods中的key
                const keys=Object.keys(getGoods)

                if(keys.length===0){
                    return
                }

                const url = `site/comment/getshopcargoods/${keys.join(',')}`
                console.log(url)

                this.$axios.get(url).then(response=>{

                    console.log(response.data.message)

                    console.log('1111')
                    response.data.message.forEach(item=>{
                        item.buycount=getGoods[item.id]
                        item.isSlect=true
                    })
                    this.goodsList=response.data.message
                })
            },
            //子组件中goodid和count通过参数传递进来
            getChangeCount(changeCount){
                // console.log(changeCount)
                this.goodsList.forEach(item=>{
                    if(item.id===changeCount.goodsId){
                       item.buycount=changeCount.count
                    }
                })

                //以上是准备好载荷的数据.要把它保存在本地的储存中
                this.$store.commit('updataGoods',changeCount)
            },
            //删除功能
            deleteGoods(index){
                  this.$confirm('确定要删除此商品吗? 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      //点击确定之后,来到删除页面
                     this.$store.commit('deleteLocalGoods',this.goodsList[index].id)
                     //并且要删除数组中的这一条数据
                     this.goodsList.splice(index,1)
                  }).catch(() => {});                
            },

            //继续购买页面
            continueBuy(){
                this.$router.push({path:'/goodslist'})
            },

            //下单页面
            goToplay(){
                //声明一个空的id
                const ids=[]
                this.goodsList.forEach(item=>{
                    if(item.isSlect){
                        ids.push(item.id)
                    }                   
                })
                //如果数组为空的时候,需要提示一下
                if(ids.length===0){
                     this.$message({
                       message: '至少要选择一项哦!',
                       type: 'warning'
                     });
                     return
                }
                this.$router.push({path:'/order',query:{ids:ids.join(',')}})
            }
        }
    }
</script>