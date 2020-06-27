<template>
    <div class="file-manager">
        <div class="file-manager__main">
            <PathComponent></PathComponent>
            <DirectoryContent></DirectoryContent>
        </div>
        <DirectoryInfoAndActions></DirectoryInfoAndActions>
        <Logger></Logger>
    </div>
</template>

<script>
import PathComponent from '../components/PathComponent.vue';
import DirectoryContent from '../components/DirectoryContent.vue';
import DirectoryInfoAndActions from '../components/DirectoryInfoAndActions.vue';
import Logger from '../components/Logger.vue';

export default {
    name: 'FileManager',
    mounted() {
        this.$store.dispatch('loadDirectory');
    },
    components: {
        PathComponent,
        DirectoryContent,
        DirectoryInfoAndActions,
        Logger,
    },
};
</script>

<style scoped lang="scss">
.file-manager{
    display: flex;
    align-items: flex-start;
    &__main{
        flex-grow: 1;
    }
}
</style>
