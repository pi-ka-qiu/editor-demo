import Vue from 'vue';
import './assets/global.scss';
import md from './mdRender';
import IStandaloneCodeEditor from './monaco';
import App from './App.vue';
import 'highlight.js/styles/vs2015.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');


function setHtml() {
  const value = IStandaloneCodeEditor.getValue();
  const result = md.render(value);
  const div = document.getElementById('md-render');
  div.innerHTML = result;
}

IStandaloneCodeEditor.onDidBlurEditorText(() => {
  setHtml();
});
setHtml();
