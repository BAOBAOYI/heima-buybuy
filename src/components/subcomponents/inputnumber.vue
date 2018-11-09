<template>
   <div>
       <!-- 这回忆你不懂{{goodId}}-{{count}} -->
       <div @click="lessCount" class='left'>- </div>
       <div class='middle'>{{initCount}}</div>
       <div @click="addCount" class='right'>+ </div>
    </div>
</template>

<style>
  .left,.middle,.right{
      width: 25px;
      height: 30px;
      border: 1px solid rgba(92, 92, 92,0.3);
      line-height: 30px;
      display: inline-block;
      text-align: center;
  }
  .middle{
      margin: 0px 2px;
      width: 30px;
  }
</style>

<script>
    export default {
        //接收父组件传送过来的数据
        props:['goodsId','count'],
        data(){
            return {
                initCount:0
            }
        },
        created(){
            this.initCount=this.count
        },
        methods:{
            lessCount(){
                //因为减数不能为负数或者是0 所以最小值为1 否则不执行下列的代码
                if(this.initCount===1) return
                this.initCount--
                this.notify()
            },
            addCount(){
                this.initCount++
                this.notify()
            },
            //自执行函数,当点击的时候触发的事件,可以将这个自执行的函数,传送给父组件,从而达到计算到总件数,金额
            notify(){
                // console.log(111)
                //子组件,点击触发,作为载荷传递给父组件
                this.$emit('goodCountChange',{                   
                goodsId:this.goodsId,
                count:this.initCount
                })
            }
        }
    }
</script>