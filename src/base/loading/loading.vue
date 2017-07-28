<template>
   <div class="loading">
     <img src="./loading.gif" alt="loading" width="35" height="35">
     <p class="des">{{title}}</p>
   </div>
</template>

<script>
    export default {
        props: {
          title: {
              type: String,
              default: '正在载入.......'
          }
        }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .loading
    width 100%;
    text-align center
    .des
      line-height 20px
      color #fff
      font-size 14px
</style>
