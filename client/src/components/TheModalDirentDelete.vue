<template>
    <ModalTemplate :is-active="isActive" v-on:close="onClose">
        <template v-slot:heading>
            Sure?
        </template>
        <template v-slot:form-content>
            <button type="button" @click="onClose" class="button button-green">Skip</button>
            <button type="submit" @click="onApprove" class="button button-red">Delete</button>
        </template>
    </ModalTemplate>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';

export default {
    name: 'TheModalDirentDelete',
    computed: {
        isActive() {
            return this.$store.state.modalDirentDelete.isActive;
        },
    },
    methods: {
        onClose() {
            this.$store.commit('modalDirentDelete/hide');
        },
        onApprove() {
            this.$store.commit('modalDirentDelete/approve');
        },
    },
    components: {
        ModalTemplate,
    },
};
</script>

<style scoped>

</style>
