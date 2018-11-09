//先要导入vue
import Vue from 'vue'
import moment from 'moment'

//创建时间
Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    return  moment(input).format(formatStr);
})