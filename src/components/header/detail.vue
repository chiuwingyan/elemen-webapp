<template>
<transition name="fade">
  <div class="detail" v-show="isShow">
   <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <slot></slot>
      </div>
    </div>
    <div class="detail-close">
          <i class="icon-close" @click="close"></i>
        </div>
  </div>
  </transition>
</template>

<script>
export default {
props:{
  isShow:{
    type: Boolean,
    default: false
  }
},
methods:{
  close(){
    this.$emit('on-close')
  }
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">


.detail
    position:fixed
    z-index:100
    top: 0
    left: 0
    width:100%
    height:100%
    overflow:auto
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.8)
    .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
    .detail-close
      position:relative
      margin:-64px auto 0 auto
      width:32px
      height:32px
      clear:both
      font-size:32px
    &.fade-enter-active,&.fade-leave-active
      transition:all 0.5s
    &.fade-enter,&.fade-leave-active
      opacity:0
</style>
