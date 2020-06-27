import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './plugins/http';
import eventBus from './plugins/eventBus';

Vue.config.productionTip = false;

Vue.use({
    install(VueConstructor) {
        VueConstructor.prototype.$http = http;
    },
});

Vue.use({
    install(VueConstrucor) {
        VueConstrucor.prototype.$eventBus = eventBus;
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
