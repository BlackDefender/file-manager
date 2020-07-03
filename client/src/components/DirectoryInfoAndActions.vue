<template>
    <aside class="directory-info">
        <button type="button" class="button" @click="createDirectory">Create directory</button>
        <button type="button" class="button" @click="uploadFile">Upload file</button>
        <button type="button" class="button" @click="remoteUpload">Remote upload</button>
    </aside>
</template>

<script>
import config from '../config';
import modalData from '../plugins/modalData';

export default {
    name: 'DirectoryInfoAndActions',
    methods: {
        async createDirectory() {
            const { directoryName } = await modalData('modalDirectoryCreate');
            if (directoryName === '') return;
            this.$store.dispatch('createDirectory', directoryName);
        },
        uploadFile() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = config.fileInputName;
            fileInput.addEventListener('input', () => {
                const formData = new FormData();
                formData.append(config.fileInputName, fileInput.files[0]);
                this.$store.dispatch('uploadFile', formData);
            }, { once: true });
            fileInput.click();
        },
        async remoteUpload() {
            const { url, fileName } = await modalData('modalRemoteUpload');
            if (url === '') return;
            this.$store.dispatch('remoteUpload', { url, fileName });
        },
    },
};
</script>

<style scoped lang="scss">
    .directory-info{
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .button{
            &:nth-child(n+2) {
                margin-top: 5px;
            }
        }
    }
</style>
