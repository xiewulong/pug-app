/*!
 * App
 * create: 2018/09/19
 * since: 0.0.1
 */
'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '../components/app.vue';
import store from '../store';

Vue.use(Vuex);
Vue.use(VueRouter);

export default class {

  constructor(components = {}, state = {}, routes = [], el = '#app') {
    this.el = el;
    this.components = {
      App,
      ...components,
    };

    store.state = { ...store.state, ...state };
    this.store = new Vuex.Store(store);
    this.router = new VueRouter({routes});

    this.mount();
  }

  mount() {
    new Vue({
      el: this.el,
      components: this.components,
      store: this.store,
      router: this.router,
    });
  }

}
