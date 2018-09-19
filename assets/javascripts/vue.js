/*!
 * Vue
 * create: 2018/09/19
 * since: 0.0.1
 */
'use strict';

import './common';
import '../stylesheets/vue.scss';
import App from './common/app.vue';
import Foo from './components/foo.vue';
import Bar from './components/bar.vue';

new App({}, [
  { path: '/', redirect: '/foo' },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar, alias: '/bar/alias' },
]);
