<template>
 <div>
   <h1 class="name">{{seller.name}}</h1>
   <div class="star-wrapper">
   <v-star :size="48" :score="seller.score"></v-star>
      </div>
   <div class="title">
     <div class="line"></div>
     <div class="text">优惠信息</div>
     <div class="line"></div>
   </div>
  <ul v-if="seller.supports" class="supports">
      <li v-for="(item,index) in seller.supports" class="supports-item">
        <span class="icon" :class="classmap[item.type]">
        </span>
        <span class="text">
          {{item.description}}
        </span>
      </li>
    </ul> 
    <div class="title">
     <div class="line"></div>
     <div class="text">商家公告</div>
     <div class="line"></div>
   </div>
   <div class="bulletin">
     <p class="content">
       {{seller.bulletin}}
     </p>
   </div>
 </div>
</template>

<script>
import VStar from '../star/star.vue'
export default {
  components:{
    VStar
  },
  
  props:{
    seller:{
      type:Object
    },
    classmap:{
      type:Array
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin";
.name
  line-height: 16px
  text-align: center
  font-size: 16px
  font-weight: 700
.star-wrapper
  margin-top: 18px
  padding: 2px 0
  text-align: center
.title
  display:flex
  width:80%
  margin:28px auto 24px auto
  .line
    flex:1
    position:relative
    top:-19px
    border-bottom:1px solid rgba(255,255,255,0.2)
  .text
    font-size: 14px
    padding: 0 12px
    font-weight: 700
.supports
  width:80%
  margin:0 auto
  .supports-item
    padding:0 12px
    margin-bottom:12px
    font-size:0
    &:last-child
      margin-bottom:0
    .icon
      display:inline-block
      width:16px
      height:16px
      vertical-align:top
      margin-right:6px
      background-size:16px 16px
      background-repeat:no-repeat
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.guarantee
        bg-image('guarantee_2')
      &.invoice
        bg-image('invoice_2')
      &.special
        bg-image('special_2')
    .text
      font-size:12px
      font-weight:200
      color:rgb(255,255,255)
      line-height:12px
.bulletin
  width:80%
  margin:0 auto
  .content
    padding:0 12px
    font-size:12px
    font-weight:200
    color:rgb(255,255,255)
    line-height:24px
</style>
