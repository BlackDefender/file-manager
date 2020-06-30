<template>
    <div class="pop-up modal" :class="{ active: isActive }">
        <div class="window-container">
            <div class="window">
                <div class="close-button" @click="close"></div>
                <div class="heading">
                    <slot name="heading"></slot>
                </div>
                <form @submit.prevent="close">
                    <slot name="form-content"></slot>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalTemplate',
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>
