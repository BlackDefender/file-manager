<template>
    <div class="logger" :class="{ active: isActive }">
        <div v-for="(item, index) in messages" :key="index" class="message" :class="item.status">
            {{ item.text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Logger',
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        this.$eventBus.on('log', this.log);
    },
    methods: {
        log(status, text) {
            this.messages.push({
                text,
                status,
            });
            setTimeout(() => { this.messages.shift(); }, 3000);
        },
    },
    computed: {
        isActive() {
            return this.messages.length > 0;
        },
        classes() {
            return `${this.status} ${this.active ? 'active' : ''}`;
        },
    },
};
</script>

<style scoped lang="scss">
.logger{
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    opacity: 0;
    visibility: hidden;
    transition-property: visibility, opacity;
    transition-duration: 0.3s;
    &.active{
        visibility: visible;
        opacity: 1;
    }
    .message{
        color: #ffffff;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        &.success{
            background-color: #008000;
        }
        &.error{
            background-color: #d71818;
        }
    }
}
</style>
