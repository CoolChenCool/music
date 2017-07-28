/**
 * Created by Administrator on 2017/7/24.
 */
import * as types from './mutation-type';
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SEQUENCE_LIST, list);
  commit(types.PLAY_LIST, list);
  commit(types.CURRENT_INDEX, index);
  commit(types.FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
