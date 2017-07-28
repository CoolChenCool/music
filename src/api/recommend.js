/**
 * Created by Administrator on 2017/7/20.
 */
import myJsonp from '../common/js/jsonp';
import {commonParam, option} from './config';
import axios from 'axios';
export function getRecommend () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return myJsonp(url, data, option);
}
export function getDiscList () {
  let url = '/api/getDiscList';
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
export function getSingerList () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    uin: 0,
    needNewCode: 0,
    pagenum: 1,
    pagesize: 100,
    key: 'all_all_all',
    page: 'list',
    channel: 'singer'
  });
  return myJsonp(url, data, option);
}
export function getSingerDetail (singerId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, commonParam, {
    num: 100,
    songstatus: 1,
    begin: 0,
    order: 'listen',
    singermid: singerId,
    needNewCode: 0,
    platform: 'yqq',
    hostUin: 0
  });
  return myJsonp(url, data, option);
}
