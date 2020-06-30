<template>
    <ModalTemplate :is-active="isActive" v-on:close="onClose">
        <template v-slot:heading>
            Create directory
        </template>
        <template v-slot:form-content>
            <label>
                <input type="text" v-model="directoryName" ref="directoryNameInput"
                       placeholder="Directory name" aria-label="Directory name">
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
    name: 'TheModalDirectoryCreate',
    computed: {
        isActive() {
            return this.$store.state.modalDirectoryCreate.isActive;
        },
        directoryName: {
            get() {
                return this.$store.state.modalDirectoryCreate.directoryName;
            },
            set(value) {
                this.$store.commit('modalDirectoryCreate/directoryName', value);
            },
        },
    },
    methods: {
        onClose() {
            this.$store.commit('modalDirectoryCreate/hide');
        },
    },
    components: {
        ModalTemplate,
    },
};
</script>
