<template>
  <div class="singer">
      <list-view :data="singerList" @selectSinger="selectItem"></list-view>
     <router-view></router-view>
  </div>
</template>

<script>
  import listView from '../../base/listView/listView.vue';
  import {getSingerList} from '../../api/recommend';
  import {mapMutations} from 'vuex';
  import Singer from '../../common/js/singer';
  import {ERR_OK} from '../../api/config';
  const HOT_NAME = '热门';
  const HOT_LENGTH = 10;
  export default {
    data () {
      return {
        singerList: []
      };
    },
    created () {
      this._getSingerList();
    },
    methods: {
      selectItem (singer) {
          this.$router.push({
            path: `/singer/${singer.id}`
          });
          this.setSinger(singer);
      },
      _getSingerList () {
        getSingerList().then((resopnse) => {
          if (resopnse.code === ERR_OK) {
            this.singerList = this._singerSorting(resopnse.data.list);
          }
        });
      },
      _singerSorting (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_LENGTH) {
              map.hot.items.push(new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              }));
          }
          let key = item.Findex;
          if (!map[key]) {
              map[key] = {
                  title: key,
                  items: []
              };
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        });
        const HOT = [];
        const other = [];
        for (let i in map) {
          let val = map[i];
          if (val.title.match(/[a-zA-Z]/)) {
            other.push(val);
          } else if (val.title === HOT_NAME) {
            HOT.push(val);
          }
        }
        other.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return HOT.concat(other);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      listView
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .singer
    position fixed
    left 0
    top 88px
    bottom 0
    width 100%
</style>
