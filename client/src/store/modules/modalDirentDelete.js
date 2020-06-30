import modalStoreModule from '../../utils/modalStoreModule';

const modalDirentDelete = modalStoreModule({
    approve: false,
},
{
    approve(state) {
        state.formData.approve = true;
    },
});

export default modalDirentDelete;
