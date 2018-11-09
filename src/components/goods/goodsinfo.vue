<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if='goods.goodsinfo' class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path"/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
 }
                                            <em id="commoditySellPrice" class="price">¥ {{goods.goodsinfo.market_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number size="small" :min='1' :max='goods.goodsinfo.stock_quantity'  v-model='buyCount'></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addShopCarRef" @click="addShopCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                  <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                      <ul>
                                          <li>
                                              <a href="javascript:;" :class="isShow?'':'selected'" @click="isShow=false">商品介绍</a>
                                          </li>
                                          <li>
                                              <a href="javascript:;" :class="isShow?'selected':''" @click="isShow=true">商品评论</a>
                                          </li>
                                      </ul>
                                  </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShow"  class="tab-content entry" style="display: block;">
                                <div style="padding:5px" v-html="goods.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShow"  class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref='textareRef' name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment"  id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                              @size-change="handleSizeChange"
                                              @current-change="handleCurrentChange"
                                              :current-page="pageSize"
                                              :page-sizes="[2, 10, 20, 30]"
                                              :page-size="pageIndex"
                                              layout="total, sizes, prev, pager, next, jumper"
                                              :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goods.hotgoodslist' :key='item.id'>
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
        >
            <div id='imgShopCar' v-if="goods.imglist" ref="AimShowCar" v-show="isAddShow">
                <img :src="goods.imglist[0].original_path">
            </div>
        </transition>
    </div>
</template>

<style>
@import "../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css";
#imgShopCar{
    width:50px;
    height:50px;
    position: absolute;
    left: 0;
    top: 0;
}
#imgShopCar img{
    width:100%;
    height: 100%;
}
</style>

 <script>
//先要导入获取数据请求

import "../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js";

//按需求导入Affix
import { Affix } from "iview";

//固定的导出
export default {
  //局部的创建组件
  components: {
    Affix
  },
  data() {
    //必须返回一个对象
    return {
      goods: {},
      buyCount: 1,
      isShow: false,
      commentList: [],
      total: 0,
      pageSize: 3,
      pageIndex: 1,
      //加入购物车的偏移量
      addShopCarOffset:null,
      shopCarOffset:null,//获取到购物车的位置
      isAddShow:false,
    };
  },
  //还有一个生命勾子
  created() {
    //勾子会触发这个方法的面的函数
    this.getGoodsInfo();
    this.getGoodComment();
    console.log(this)
  },
  //js代码的导出需要初始化代码, 因为这个图片是不断变化的,推荐的时候也是要重新的渲染的,所以只能用生命勾子中的更新
  updated() {
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
  },
  //监控路由的变化
  watch: {
    $route() {
      this.getGoodsInfo();
      this.getGoodComment();
    }
  },
  //这里是写方法的
  methods: {
    //商品的详情页面的详细的信息
    //获取商品信息的api
    getGoodsInfo() {
      //id是在router中的js获取的.在path中的goodsId
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
      this.$axios.get(url).then(response => {
        console.log(response.data);

        this.goods = response.data.message;


        setTimeout(()=>{
            //获取购物车的偏移量
            this.addShopCarOffset=$(this.$refs.addShopCarRef).offset();
            console.log(this.addShopCarOffset);
            $(this.$refs.AimShowCar).css({
                top:this.addShopCarOffset.top,
                left:this.addShopCarOffset.left
            })

            //获取结束位置的值
            this.shopCarOffset=$('#shoppingCartCount').offset();
            console.log(this.shopCarOffset)
        },200)
      });
    },

    getGoodComment() {
      const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}
                  ?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(response => {
        console.log(response.data);
        this.total = response.data.totalcount;
        this.commentList = response.data.message;
      });
    },
    //页码的改变函数:页容量的改变
    handleSizeChange(pageSize) {
      console.log(this.pageSize);
      //要更新页面显示当前的页面
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getGoodComment();
    },
    //一个页面显示多少条信息的改变
    handleCurrentChange(pageIndex) {
      console.log(this.pageIndex);
      this.pageIndex = pageIndex;
      this.getGoodComment();
    },
    submitComment() {
      //获取input中的值
      const comment = this.$refs.textareRef.value;
      console.log(comment);
      if (comment.trim().length === 0) {
        this.$message({
          message: "评论的内容不容为空窝.....",
          type: "warning"
        });
      }

      //获取到数据,请求API
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      } `;
      this.$axios.post(url, { commenttxt: comment }).then(response => {
        this.$message({
          message: "评论成功",
          type: "success"
        });
        this.$refs.textareRef.value = "";

        //显示在页面的第一页
        this.pageIndex = 1;

        //重新的渲染内容
        this.getGoodComment();
      });
    },

    //加入购物车的函数false
    addShopCar(){
         this.isAddShow=true;

         //在这类获取购物车的数量
         //准备好载荷
         const goods ={
             goodsId:this.$route.params.goodsId,
             count:this.buyCount
         }

         this.$store.commit('addGoods',goods)
    },
    beforeEnter: function (el) {
        //获取到购物车的位置
        el.style.top=this.addShopCarOffset.top+'px'
        el.style.left=this.addShopCarOffset.left+'px'
        el.style.transform='scale(0.5)'
        //再赋值给图片
    // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // 动画时长
      el.style.transition='all 1s'
      //刷新动画帧
      el.offsetWidth
      //过度的动画
      el.style.top=this.shopCarOffset.top -15+'px'
      el.style.left=this.shopCarOffset.left+'px'
      el.style.transform='scale(0.3)'
      //调用函数
      done()
    },
    afterEnter: function (el) {
      // ...
      this.isAddShow=false;
    },
  }
};
</script>

