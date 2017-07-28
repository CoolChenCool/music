<template>
   <div class="header">
      <div class="icon"></div>
      <h1 class="txt">Chicken Music</h1>
   </div>
</template>

<script>
    export default {};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/variable.styl";
  .header
    position relative
    height 44px
    text-align center
    font-size 0
    color $color-theme
    .icon
      display inline-block
      vertical-align top
      width 30px
      height 32px
      margin-top 6px
      margin-right 9px
      bg-image('logo')
      background-size 30px 32px
    .txt
      display inline-block
      vertical-align top
      font-size $font-size-large
      line-height 44px
</style>
