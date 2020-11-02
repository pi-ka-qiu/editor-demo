import Vue from 'vue';
import '../src/assets/global.scss';
import { Tree } from 'ant-design-vue';
import App from './App.vue';


Vue.config.productionTip = false;
Vue.component(Tree.name, Tree);
new Vue({
  render: h => h(App),
}).$mount('#app');
