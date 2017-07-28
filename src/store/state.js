/**
 * Created by Administrator on 2017/7/24.
 */
import {mode} from 'common/js/config';
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  model: mode.sequence,
  currentIndex: -1
};
export default state;
