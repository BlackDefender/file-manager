import Vue from 'vue';
import Vuex from 'vuex';
import http from '../plugins/http';
import modalDirectoryCreate from './modules/modalDirectoryCreate';
import modalDirentDelete from './modules/modalDirentDelete';
import modalRemoteUpload from './modules/modalRemoteUpload';
import processResponse from '../utils/processResponse';

Vue.use(Vuex);

const direntNameToPathStr = (state, direntName) => {
    const path = [...state.currentPath, direntName];
    return encodeURIComponent(path.join('/'));
};

export default new Vuex.Store({
    state: {
        currentPath: [],
        directoryContent: [],
        search: '',
    },
    modules: {
        modalDirectoryCreate,
        modalDirentDelete,
        modalRemoteUpload,
    },
    getters: {
        currentPathStr: (state) => state.currentPath.join('/'),
        directoryContentNames: (state) => state.directoryContent.map((dirent) => dirent.name),
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
                    processResponse(response, () => context.commit('directoryLoaded', response.data.data));
                })
                .catch((error) => processResponse(error));
        },
        changePath(context, directory) {
            context.commit('changePath', directory);
            context.dispatch('loadDirectory');
        },
        setCurrentPath(context, path) {
            context.commit('setCurrentPath', path);
            context.dispatch('loadDirectory');
        },
        removeDirent(context, dirent) {
            const path = [...context.state.currentPath, dirent.name];
            const pathStr = encodeURIComponent(path.join('/'));
            const url = dirent.type;
            http
                .delete(url, { data: { path: pathStr } })
                .then((response) => {
                    processResponse(response, () => context.dispatch('loadDirectory'));
                })
                .catch((error) => processResponse(error));
        },
        uploadFile(context, formData) {
            http
                .post('file/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    processResponse(response, () => context.dispatch('loadDirectory'));
                })
                .catch((error) => processResponse(error));
        },
        createDirectory(context, directoryName) {
            if (context.getters.directoryContentNames.includes(directoryName)) {
                processResponse(new Error('Directory exists'));
                return;
            }
            const path = direntNameToPathStr(context.state, directoryName);
            http.post('directory', { path })
                .then((response) => {
                    processResponse(response, () => context.dispatch('loadDirectory'));
                })
                .catch((error) => processResponse(error));
        },
        remoteUpload(context, { url, fileName }) {
            http
                .post('file/remote-upload', {
                    url: encodeURIComponent(url),
                    fileName: encodeURIComponent(fileName),
                })
                .then((response) => {
                    processResponse(response, () => context.dispatch('loadDirectory'));
                })
                .catch((error) => processResponse(error));
        },
    },
});
