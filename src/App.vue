<template>
   <div class="app">
     <m-header></m-header>
      <tab></tab>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
     <play></play>
   </div>
</template>

<script>
  import MHeader from './components/header/header.vue';
  import Tab from './components/tab/tab.vue';
  import Play from './components/play/play.vue';
  export default {
    components: {
      MHeader,
      Tab,
      Play
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "./common/stylus/variable.styl";
  .app
    color $color-sub-theme
</style>
