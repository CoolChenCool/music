<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="slider.length">
          <slider>
            <div class="slider-item" v-for="item in slider">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="slider图片" @load="loadImage" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li v-for="item in discList" class="itemPic">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-content" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {getRecommend} from '../../api/recommend';
  import {musicData} from '../../api/data';
  import {ERR_OK} from '../../api/config';
  import Slider from '../../base/slider/slider.vue';
  import Scroll from '../../base/scroll/scroll.vue';
  import loading from '../../base/loading/loading.vue';
  export default {
    data () {
      return {
        slider: [],
        discList: []
      };
    },
    created () {
      this._getRecommend();
      setTimeout(() => {
         this.discList = musicData;
      }, 2000);
    },
    methods: {
      _getRecommend () {
        getRecommend().then((resopnse) => {
          if (resopnse.code === ERR_OK) {
            console.log(resopnse.data);
            this.slider = resopnse.data.slider;
          }
        });
      },
      loadImage () {
       if (!this.flag) {
           this.$refs.scroll.refresh();
           this.flag = true;
       }
      }
    },
    components: {
      Slider,
      Scroll,
      loading
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/variable.styl";
  .recommend
    position fixed
    top 88px
    width 100%
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .itemPic
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d

    .loading-content
      position absolute
      left 50%
      top 50%
      transform translateX(-50%)
</style>
