import Vue from 'vue';
import Router from 'vue-router';
import rank from '../components/rank/rank.vue';
import recommend from '../components/recommend/recommend.vue';
import search from '../components/search/search.vue';
import singer from '../components/singer/singer.vue';
import singerDetail from '../components/singer-detail/singer-detail.vue';
Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  base: __dirname,
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: rank
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/search',
      component: search,
      children: [
        {path: ':id', component: singerDetail}
      ]
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {path: ':id', component: singerDetail}
      ]
    }
  ]
});
