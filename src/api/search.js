/**
 * Created by Administrator on 2017/8/3.
 */
import jsonp from 'common/js/jsonp';
import {commonParam, option} from './config';

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParam, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  });

  return jsonp(url, data, option);
}
export function search (query, page, zhida, perpage) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  const data = Object.assign({}, commonParam, {
    w: query,
    p: page,
    zhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  });
  return jsonp(url, data, option);
}
