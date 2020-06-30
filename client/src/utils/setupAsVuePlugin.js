import Vue from 'vue';

const setupAsVuePlugin = (pluginName, plugin) => {
    Vue.use({
        install(VueConstructor) {
            VueConstructor.prototype[pluginName] = plugin;
        },
    });
};

export default setupAsVuePlugin;
