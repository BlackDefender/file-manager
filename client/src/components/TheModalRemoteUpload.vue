<template>
    <ModalTemplate :is-active="isActive" v-on:close="onClose">
        <template v-slot:heading>
            Remote upload
        </template>
        <template v-slot:form-content>
            <label>
                <input type="text" v-model="url" placeholder="Url" aria-label="Url">
            </label>
            <label>
                <input type="text" v-model="fileName" placeholder="File name"
                       aria-label="File name">
            </label>
            <div class="submit-container">
                <button type="submit" class="button button-green">Create</button>
            </div>
        </template>
    </ModalTemplate>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';

export default {
    name: 'TheModalRemoteUpload',
    computed: {
        isActive() {
            return this.$store.state.modalRemoteUpload.isActive;
        },
        url: {
            get() {
                return this.$store.state.modalRemoteUpload.url;
            },
            set(value) {
                this.$store.commit('modalRemoteUpload/url', value);
            },
        },
        fileName: {
            get() {
                return this.$store.state.modalRemoteUpload.fileName;
            },
            set(value) {
                this.$store.commit('modalRemoteUpload/fileName', value);
            },
        },
    },
    methods: {
        onClose() {
            this.$store.commit('modalRemoteUpload/hide');
        },
    },
    components: {
        ModalTemplate,
    },
};
</script>
