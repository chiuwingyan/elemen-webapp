<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
   <div class="tab border-1px">
  <div class="tab-item">
        <router-link to="/goods/">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
     <div class="content">
       <keep-alive>
       <router-view></router-view>
       </keep-alive>
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
const err_ok=0
export default {
  name: 'app',
  data(){
    return {
      seller:{}
    }
  },
  components:{
    VHeader:header
  },
  created(){
    //var date=new Date()
    //var timer=date.getTime().toString()
   this.$http.get('/api/seller').then((res)=>{
      res=res.body
      if(res.errno===err_ok){
        this.seller=res.data
         evenBus.$emit('seller',this.seller) 
      }
    })
  },
  beforeDestory(){
    //evenBus.$emit('seller',this.seller) 
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  //border-bottom:1px solid rgba(7, 17, 27, 0.1)
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
