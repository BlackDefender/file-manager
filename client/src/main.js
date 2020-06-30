import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './plugins/http';
import eventBus from './plugins/eventBus';
import modalData from './plugins/modalData';
import setupAsVuePlugin from './utils/setupAsVuePlugin';

Vue.config.productionTip = false;

setupAsVuePlugin('$http', http);
setupAsVuePlugin('$eventBus', eventBus);
setupAsVuePlugin('$modalData', modalData);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
