<template>
    <aside class="directory-info">
        <button type="button" class="button" @click="createDirectory">Create directory</button>
        <button type="button" class="button" @click="uploadFile">Upload file</button>
        <button type="button" class="button" @click="remoteUpload">Remote upload</button>
    </aside>
</template>

<script>
import http from '../plugins/http';
import config from '../config';
import processResponse from '../utils/processResponse';

import modalData from '../plugins/modalData';

export default {
    name: 'DirectoryInfoAndActions',
    computed: {
        currentPathStr() {
            return this.$store.getters.currentPathStr;
        },
    },
    methods: {
        async createDirectory() {
            const { directoryName } = await modalData('modalDirectoryCreate');
            if (directoryName === '') return;
            const currentPath = [...this.$store.state.currentPath];
            currentPath.push(directoryName);
            http.post('directory', { path: currentPath.join('/') })
                .then((response) => {
                    processResponse(response, () => this.$eventBus.emit('refreshDirectory'));
                })
                .catch((error) => {
                    processResponse(error);
                });
        },
        uploadFile() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = config.fileInputName;
            fileInput.addEventListener('input', () => {
                const formData = new FormData();
                formData.append(config.fileInputName, fileInput.files[0]);
                http
                    .post('file/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })
                    .then((response) => {
                        processResponse(response, () => this.$eventBus.emit('refreshDirectory'));
                    })
                    .catch((error) => {
                        processResponse(error);
                    });
            });
            fileInput.click();
        },
        remoteUpload() {
            // const url = prompt('Url');
            const url = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*';
            // if (url === null) return;
            http
                .post('file/remote-upload', { url: encodeURIComponent(url) })
                .then((response) => {
                    processResponse(response, () => this.$eventBus.emit('refreshDirectory'));
                })
                .catch((error) => processResponse(error));
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
