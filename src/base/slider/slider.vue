<template>
   <div class="slider" ref="slider">
     <div class="slider-group" ref="sliderGroup">
      <slot></slot>
     </div>
     <div class="dots">
       <span class="dot" v-for="(item, index) in dots" :class="{'active':pageCurrentIndex===index}"></span>
     </div>
   </div>
</template>

<script>
   import {addClass} from '../../common/js/dom';
   import BScroll from 'better-scroll';
    export default {
      data () {
        return {
            dots: [],
            pageCurrentIndex: 0
        };
      },
      props: {
          loop: {
            type: Boolean,
            default: true
          },
          autoPlay: {
            type: Boolean,
            default: true
          },
          interTime: {
              type: Number,
              default: 4000
          }
      },
      mounted () {
        setTimeout(() => {
          this._sliderWidth();
          this._dot();
          this._initSlider();
          if (this.autoPlay) {
              this._play();
          }
        }, 20);
        window.addEventListener('resize', () => {
           if (!this.scroll) {
               return;
           }
           this._sliderWidth(true);
           this.scroll.refresh();
        });
      },
      methods: {
          _sliderWidth (flag) {
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
              let sliderWidth = this.$refs.slider.clientWidth;
              for (let i = 0; i < this.children.length; i++) {
                  let child = this.children[i];
                  addClass(child, 'slider-item');
                  child.style.width = sliderWidth + 'px';
                   width += sliderWidth;
              }
              if (this.loop && !flag) {
                  width += sliderWidth * 2;
              }
            this.$refs.sliderGroup.style.width = width + 'px';
          },
        _dot () {
            this.dots = new Array(this.children.length);
        },
        _play () {
            let pageIndex = this.pageCurrentIndex + 1;
            if (this.loop) {
              pageIndex += 1;
            }
            this.timer = setTimeout(() => {
                this.scroll.goToPage(pageIndex, 0, 400);
            }, this.interTime);
        },
        _initSlider () {
            this.scroll = new BScroll(this.$refs.slider, {
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: true,
              snapLoop: this.loop,
              snapThreshold: 0.3,
              snapSpeed: 400
            });
          this.scroll.on('scrollEnd', () => {
            let pageIndex = this.scroll.getCurrentPage().pageX;
            if (this.loop) {
              pageIndex -= 1;
            }
            this.pageCurrentIndex = pageIndex;
            if (this.autoPlay) {
                clearTimeout(this.timer);
               this._play();
            }
          });
          this.scroll.on('beforeScrollStart', () => {
             if (this.autoPlay) {
               clearTimeout(this.timer);
             }
          });
        }
      },
      destroyed () {
          clearInterval(this.timer);
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/variable.styl";
  .slider
    min-height 1px
    position relative
    .slider-group
      position relative
      width 100%
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        overflow hidden
        text-align center
        box-sizing border-box
        a
          display: block
          width: 100%
          text-decoration: none
          img
            display: block
            width: 100%

    .dots
      position absolute
      left 40%
      bottom 12px
      text-align center
      font-size 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width 20px
          border-radius: 5px
          background: $color-text-ll
</style>
