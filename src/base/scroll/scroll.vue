<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
          type: Boolean,
          default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probeType
        });
        if (this.listenScroll) {
           let _self = this;
           this.scroll.on('scroll', (pox) => {
              _self.$emit('scroll', pox);
           });
        }
        if (this.pullUp) {
            this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    this.$emit('scrollToEnd');
                }
            });
        }
      },
      enable () {
        this.scroll && this.scroll.enable();
      },
      disable () {
        this.scroll && this.scroll.disable();
      },
      refresh () {
        this.scroll && this.scroll.refresh();
      },
      scroll () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement () {
         this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh();
        }, 20);
      }
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
