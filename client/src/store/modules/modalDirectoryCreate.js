import modalStoreModule from '../../utils/modalStoreModule';

const modalDirectoryCreate = modalStoreModule({
    directoryName: '',
},
{
    directoryName(state, name) {
        state.formData.directoryName = name;
    },
});

/* const modalDirectoryCreate = {
    namespaced: true,
    state: () => ({
        isActive: false,
        formData: {
            directoryName: '',
        },
    }),
    mutations: {
        show(state) {
            state.formData.directoryName = '';
            state.isActive = true;
        },
        hide(state) {
            state.isActive = false;
        },
        directoryName(state, name) {
            state.formData.directoryName = name;
        },
    },
}; */

export default modalDirectoryCreate;
