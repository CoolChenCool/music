<template>
  <scroll
    :data="data"
    class="listView"
    ref="listView"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
            <img v-lazy="item.avatar" alt="图像" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="singercut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in singercut"
            class="itemcut"
            :class="{'current':currentIndex===index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="title-fix" v-show="titleFixed" ref="titleFixed">
      <div class="fixed-title">{{titleFixed}}</div>
    </div>
    <div v-show="!data.length" class="container-loading">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../scroll/scroll.vue';
  import {getData} from '../../common/js/dom';
  import loading from '../../base/loading/loading.vue';
  const ANCHOR_HEIGHT = 20;
  const TITLE_HEIGHT = 30;
  export default {
    created () {
      this.touch = {};
      this.listenScroll = true;
      this.listHeight = [];
      this.probeType = 3;
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        toIndex: 0,
        diff: -1
      };
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      singercut () {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        });
      },
      titleFixed () {
        if (this.scrollY > 0) {
          return '';
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('selectSinger', item);
      },
      onShortcutTouchStart (e) {
        const cutIndex = getData(e.target, 'index');
        let firstIndex = e.touches[0];
        this.touch.y1 = firstIndex.pageY;
        this.touch.anchorindex = cutIndex;
        this._scrollTo(cutIndex);
      },
      onShortcutTouchMove (e) {
        let firstIndex = e.touches[0];
        this.touch.y2 = firstIndex.pageY;
        let deltar = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
        let anchorindex = parseInt(this.touch.anchorindex) + deltar;
        this._scrollTo(anchorindex);
      },
      scroll (pox) {
        this.scrollY = pox.y;
      },
      _scrollTo (index) {
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
      },
      _calculateHeight () {
        this.listHeight = [];
        let height = 0;
        let listGroup = this.$refs.listGroup;
        this.listHeight.push(height);
        for (let i = 0; i < listGroup.length; i++) {
          height += listGroup[i].clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._calculateHeight();
        }, 20);
      },
      scrollY (newY) {
        let listHeight = this.listHeight;
        // 滚动到最顶端newY>0
        if (newY >= 0) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (-newY > height1 && -newY < height2) {
            this.currentIndex = i;
            this.diff = newY + height2;
            return;
          }
        }
        // 滚动到最底端
        this.currentIndex = listHeight.length - 2;
      },
      diff (newDiff) {
        let fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
            return;
        }
       // console.log(this.fixedTop);
        this.fixedTop === fixedTop;
      //  this.$refs.titleFixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    },
    components: {
      Scroll,
      loading
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/variable.styl";

  .listView
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium

    .title-fix
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        width 100%
        position fixed
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .singercut
      position absolute
      right 10px
      top 55%
      transform translateY(-55%)
      .itemcut
        line-height 20px
        font-size 12px
        text-align center
        color #fff
        &.current, &toIndex
          color sandybrown
  .container-loading
    position absolute
    left 40%
    top 50%
    transform translateX(-40%)
    transform translateY(-50%)
</style>
