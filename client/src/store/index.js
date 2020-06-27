import Vue from 'vue';
import Vuex from 'vuex';
import http from '../plugins/http';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPath: [],
        directoryContent: [],
        search: '',
    },
    getters: {
        currentPathStr: (state) => state.currentPath.join('/'),
    },
    mutations: {
        directoryLoaded(state, directoryContent) {
            state.directoryContent = directoryContent;
        },
        changePath(state, directory) {
            if (directory === '..') {
                state.currentPath.pop();
            } else {
                state.currentPath.push(directory);
            }
        },
        setCurrentPath(state, path) {
            state.currentPath = path;
        },
    },
    actions: {
        loadDirectory(context) {
            const path = encodeURIComponent(context.state.currentPath.join('/'));
            http
                .get(`directory?path=${path}`)
                .then((response) => {
                    context.commit('directoryLoaded', response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        changePath(context, directory) {
            context.commit('changePath', directory);
            context.dispatch('loadDirectory');
        },
        setCurrentPath(context, path) {
            context.commit('setCurrentPath', path);
            context.dispatch('loadDirectory');
        },
    },
    modules: {},
});
