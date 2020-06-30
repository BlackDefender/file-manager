const modalStoreModule = (formData = {}, mutations = {}) => ({
    namespaced: true,
    state: () => ({
        isActive: false,
        formData: { ...formData },
    }),
    mutations: {
        ...mutations,
        show(state) {
            state.formData = { ...formData };
            state.isActive = true;
        },
        hide(state) {
            state.isActive = false;
        },
    },
});

export default modalStoreModule;
