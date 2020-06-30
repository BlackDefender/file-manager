<template>
    <div class="file-manager">
        <div class="file-manager__main">
            <PathComponent/>
            <DirectoryContent/>
        </div>
        <DirectoryInfoAndActions/>
        <Logger/>
        <TheModalDirectoryCreate/>
        <TheModalDirentDelete/>
    </div>
</template>

<script>
import PathComponent from '../components/PathComponent.vue';
import DirectoryContent from '../components/DirectoryContent.vue';
import DirectoryInfoAndActions from '../components/DirectoryInfoAndActions.vue';
import Logger from '../components/Logger.vue';
import TheModalDirectoryCreate from '../components/TheModalDirectoryCreate.vue';
import TheModalDirentDelete from '../components/TheModalDirentDelete.vue';

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
        TheModalDirectoryCreate,
        TheModalDirentDelete,
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
