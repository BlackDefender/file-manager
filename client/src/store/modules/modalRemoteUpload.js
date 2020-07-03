import modalStoreModule from '../../utils/modalStoreModule';

const modalRemoteUpload = modalStoreModule({
    url: '',
    fileName: '',
},
{
    url(state, url) {
        state.formData.url = url;
    },
    fileName(state, fileName) {
        state.formData.fileName = fileName;
    },
});

export default modalRemoteUpload;
