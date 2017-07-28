<template>
  <transition name="slider">
   <music-list :songs="songs" :title="title" :bgImg="bgImage"></music-list>
  </transition>
</template>

<script>
   import {mapGetters} from 'vuex';
   import {getSingerDetail} from '../../api/recommend';
   import {ERR_OK} from '../../api/config';
   import {createSong} from '../../common/js/song';
   import musicList from '../music-list/music-list.vue';
    export default {
       data () {
         return {
            songs: []
         };
       },
      computed: {
        title () {
            return this.singer.name;
        },
        bgImage () {
            return this.singer.avatar;
        },
        ...mapGetters([
          'singer'
        ])
      },
      created () {
          this._singerDetail(this.singer.id);
      },
      methods: {
         _singerDetail (id) {
             if (!id) {
               this.$router.push({
                 path: './singer'
               });
               return;
             }
           getSingerDetail(id).then((res) => {
               if (res.code === ERR_OK) {
                   this.songs = this._normSong(res.data.list);
               }
           });
         },
        _normSong (list) {
           let ret = [];
           list.forEach((item) => {
             let {musicData} = item;
             if (musicData.songid && musicData.albummid) {
               ret.push(createSong(musicData));
             }
           });
           return ret;
        }
      },
      components: {
        musicList
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .slider-enter-active,.slider-leave-active
    transition all .5s
  .slider-enter,.slider-leave-to
    transform translate3d(100%,0,0)
</style>
