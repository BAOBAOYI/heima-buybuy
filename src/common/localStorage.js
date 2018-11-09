//这里的存放的内容是增删改查

//定义id等于key,商品数量等于goods
const KEY='GOODS'
//获取商品的信息
const getLocalGoods=()=>{
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

//计算总的数量
const getTotalCount=()=>{
    const localGoods=getLocalGoods()

    let totalCount=0;
     for(var key in localGoods){
         totalCount+=localGoods[key]
     }

     return totalCount;
}

//获取商品的信息,进行本地的储存
const addLocalStorage=goods=>{
    //获取商品的信息.因为删除还有也要用到所以可以放在外边,在这里进行调用即可
    const localGoods= getLocalGoods()

    if(localGoods[goods.goodsId]){
        //如果有的话,那就累加
        localGoods[goods.goodsId]+=goods.count
    }else{
        //没有则添加
        localGoods[goods.goodsId]=goods.count
    }

    //把对象转换成字符串,保存起来
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //重新的返回数据
    return getTotalCount()
}

//本地保存修改的功能
const updataLocalStorage=goods=>{
    //1.先要获取到数据
    const localGoods= getLocalGoods()

    //2.把获取到的数据覆盖到之前的数据
    localGoods[goods.goodsId]=goods.count

    //3.保存修改之后的数据
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.要把修改完毕之后的数据返回给总的数据
    return getTotalCount()
}

//删除商品
const deleteLocalStorage=goodsId=>{
     //1.先要获取到数据
     const localGoods= getLocalGoods()

     delete localGoods[goodsId]

     //保存到本地储存
     localStorage.setItem(KEY,JSON.stringify(localGoods))

     //返回购物车的总数回去
     return getTotalCount()
}

//按需导出,default的全部的导出
export {
    addLocalStorage,
    getTotalCount,
    getLocalGoods,
    updataLocalStorage,
    deleteLocalStorage
}