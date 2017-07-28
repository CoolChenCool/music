/**
 * Created by Administrator on 2017/7/24.
 */
import * as types from './mutation-type';
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag;
  },
  [types.FULL_SCREEN] (state, flag) {
    state.fullScreen = flag;
  },
  [types.PLAY_LIST] (state, list) {
    state.playList = list;
  },
  [types.SEQUENCE_LIST] (state, list) {
    state.sequenceList = list;
  },
  [types.Model] (state, model) {
    state.model = model;
  },
  [types.CURRENT_INDEX] (state, number) {
    state.currentIndex = number;
  }
};
export default mutations;
