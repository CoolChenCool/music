<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, index) in songs" class="item" @click="selectItem(song, index)">
        <div class="content">
          <div class="name">{{song.name}}</div>
          <p class="desc">{{des(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      des (song) {
          return `${song.singer}。${song.album}`;
      },
      selectItem (item, index) {
          this.$emit('selectItem', item, index);
      }
    }
  };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d

</style>
