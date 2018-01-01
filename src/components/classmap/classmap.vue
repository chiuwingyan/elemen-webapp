<template>
 
    <span class="icon" :class="classmap[index]"></span>
  
</template>

<script>

export default {
  props:{
    index:{
      type:Number
    }
  },
 data(){
  return {
    classmap:['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
 }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin"
.icon
  display:inline-block
  width: 12px
  height:12px
  vertical-align:top
  margin-right:2px
  background-size: 12px 12px
  background-repeat:no-repeat
  &.decrease
    bg-image('decrease_3')
  &.discount
    bg-image('discount_3')
  &.guarantee
    bg-image('guarantee_3')
  &.invoice
    bg-image('invoice_3')
  &.special
    bg-image('special_3')

</style>
