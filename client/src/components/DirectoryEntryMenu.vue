<template>
    <ul class="dirent-menu" :class="{ active: isOpened }" @click.stop>
        <li class="dirent-menu__item">Rename</li>
        <li class="dirent-menu__item">Get link</li>
        <li class="dirent-menu__item">Move</li>
        <li class="dirent-menu__item">Remove</li>
    </ul>
</template>

<script>
export default {
    name: 'DirectoryEntryMenu',
    props: {
        dirent: Object,
        index: Number,
    },
    data() {
        return {
            isOpened: false,
        };
    },
    mounted() {
        this.$eventBus.on('openDirectoryEntryMenu', this.openMenu);
        this.$eventBus.on('closeDirectoryEntryMenu', this.closeMenu);
        document.addEventListener('click', this.closeMenu);
    },
    beforeDestroy() {
        this.$eventBus.off('openDirectoryEntryMenu', this.openMenu);
        this.$eventBus.off('closeDirectoryEntryMenu', this.closeMenu);
        document.removeEventListener('click', this.closeMenu);
    },
    methods: {
        openMenu(index) {
            if (index === this.index) this.isOpened = true;
        },
        closeMenu() {
            this.isOpened = false;
        },
    },
};
</script>

<style scoped lang="scss">
.dirent-menu{
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.3s;
    &.active{
        opacity: 1;
        visibility: visible;
    }
    &__item{
        padding: 7px 12px;
        cursor: pointer;
        &:hover{
            background-color: #cccccc;
        }
        &:nth-child(n+2) {
            border-top: 1px solid #c5c5c5;
        }
    }
}
</style>
