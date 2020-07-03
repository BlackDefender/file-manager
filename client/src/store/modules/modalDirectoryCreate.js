import modalStoreModule from '../../utils/modalStoreModule';

const modalDirectoryCreate = modalStoreModule({
    directoryName: '',
},
{
    directoryName(state, name) {
        state.formData.directoryName = name;
    },
});

export default modalDirectoryCreate;
