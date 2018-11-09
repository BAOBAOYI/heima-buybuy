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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="order" :rules="rules" status-icon ref="orderRef" label-width="150px" >
                                      <el-form-item label="收件人姓名" prop="accept_name">
                                        <el-input style="width:500px" v-model="order.accept_name"></el-input>
                                      </el-form-item>
                                      <el-form-item label="所属地域" prop="area">
                                        <v-distpicker :province="order.area.province.value" 
                                                      :city="order.area.city.value"
                                                      :area="order.area.area.value"
                                                       @selected="onSelected"
                                        ></v-distpicker>
                                      </el-form-item>
                                       <el-form-item label="详细地址" prop="address">
                                        <el-input style="width:500px" v-model="order.address"></el-input>
                                      </el-form-item>
                                      <el-form-item label="收件人手机号" prop="mobile">
                                        <el-input style="width:500px" v-model="order.mobile"></el-input>
                                      </el-form-item>
                                       <el-form-item label="电子邮箱" prop=" email">
                                        <el-input style="width:300px" v-model="order.email"></el-input>
                                      </el-form-item>
                                       <el-form-item label="邮政编码" prop="post_code">
                                        <el-input style="width:300px" v-model="order.post_code"></el-input>
                                      </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                          <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                      <el-radio-group v-model="order.express_id" @change="expressChange">
                                         <el-radio label="1">顺丰快递<em>费用：20.00元</em></el-radio>
                                         <el-radio label="2">圆通快递<em>费用：10.00元</em></el-radio>
                                         <el-radio label="3">韵达快递<em>费用：8.00元</em></el-radio>
                                      </el-radio-group>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodslist " :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.buycount*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">>{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click='goback'>返回购物车</a>
                                        <a id="btnSubmit" class="btn submit" @click="GoToPay">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

   //导入局部的省市联动
   import VDistpicker from 'v-distpicker'

   //导入要下单的总数量
   import {getLocalGoods} from '../../common/localStorage.js'
    export default {
        //注册局部的省市联动的组件
        components: { VDistpicker },
        data(){
            //手机号的验证
            var checkMobile =(rules,value,callback)=>{
                if(!value){
                    return callback(new Error('手机号不能为空'))
                }
               
                    if(/^1[3,4,5,6,7,8][0-9]{9}$/.test(value)){
                        //如果符合以上的标准就正确
                        callback()
                    }else{
                        //来到这里表示手机号码不符
                         callback(new Error('请输入合法的手机号'))
                    }
                
            }
            return{
                goodslist:[],//获取中的数量
                totalCount:0,//总的数量
                totalPrice:0,
                order:{//下面这些是要交给后台进行下单的
                    accept_name:'张三',//收件人姓名
                    area:{
                        province:{
                             code: '440000',
                             value: '广东省'
                        },
                        city:{
                              code: '440300',
                              value: '深圳市'
                        },
                        area:{
                             code: '440306',
                             value: '宝安区'
                        }
                    },
                    address:'庭威402',//收件人详细地址
                    mobile:'13812345678',//收件人电话
                    email:'2597045858@qq.com',//邮箱
                    post_code:'725435',//邮编
                    payment_id:'6',//选择的支付方式
                    express_id:'1',//配送方式的选择
                    expressMoment:20,//默认的快递费是20元
                    message:'请快点发货',//把文本域的内容发送到后台
                },
                rules:{
                    accept_name:[
                        { required: true, message: '请输入收件人的姓名', trigger: 'blur' },
                    ],
                    //所属区域的验证
                    area:[
                        { required: true, message: '请输入所属地区', trigger: 'blur' },
                    ],
                    address:[
                         { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ],
                    mobile:[
                         { validator: checkMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.getGoodsListData()
        },
        computed:{
            getTotalAmount(){
                return this.totalPrice+this.order.expressMoment
            }
        },
        methods:{
            //求下订单有哪些,金额的计算,数量的计算
            getGoodsListData(){
                //1.先要获取到要下单的id.可以在本地储存中获取,先要导入
                const localGoods= getLocalGoods();

                //获取到ids
                this.order.goodsids=this.$route.query.ids

                //获取要下单的id和数量 {'98':2,'97':1,'104':3}
                const tempObj={}

                const url=`site/validate/order/getgoodslist/${this.$route.query.ids}`

                this.$axios.get(url).then(response=>{
                    response.data.message.forEach(item=>{
                        item.buycount=localGoods[item.id]

                        this.totalCount+=item.buycount
                        this.totalPrice+=item.buycount*item.sell_price

                        tempObj[item.id]=item.buycount
                    })
                    //把tempobj中的数值赋值给 cargoodsobj
                    this.order.cargoodsobj=tempObj
                    this.order.goodsAmount=this.totalPrice
                    this.goodslist=response.data.message
                })
            },
            //区域的重新选择,就会触发
            onSelected(data){
                // console.log(data)
                this.order.area=data
            },
            //切换配送方式的时候,更改的价格数,函数
            expressChange(label){
                switch(label){
                    case '1':
                    this.order.expressMoment=20
                    break

                    case '2':
                    this.order.expressMoment=10
                    break

                    case '3':
                    this.order.expressMoment=8
                    break

                    default:
                    break
                }
                console.log(this.order.expressMoment)
            },
            //返回购物车页面
            goback(){
                // this.$router.push({path:'/shopCart'})
                this.$router.go(-1)
            },
            //下单的操作
            GoToPay(){
                this.$refs.orderRef.validate((valid) => {
                 if (!valid) {
                  console.log('error submit!!');
                   return
                 }
                 this.$axios.post('site/validate/order/setorder',this.order).then(response=>{
                   
                    console.log(this.order)
                    console.log(111)
                    
                     if(response.data.status === 0){
                        
                        
                         //并且把购物车上面购买的商品删除掉
                         const idsArray=this.$route.query.ids.split(',')
                         idsArray.forEach(id=>{
                              this.$store.commit('deleteLocalGoods',id)

                         
                         //验证成功,跳转到订单的详情页面
                         this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})
                         })
                        
                     }
                 })
               });
            }
        }
    }
</script>