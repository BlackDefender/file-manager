<template>
    <div>
        <table class="directory-content">
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Size</th>
                <th>Last update</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(dirent, index) in directoryContent" :key="index">
                <td><component v-bind:is="resolveIcon(dirent)" class="icon"></component></td>
                <td @click="openDirectory(dirent)">
                    <span class="dirent-name">{{dirent.name}}</span>
                </td>
                <td></td>
                <td></td>
                <td><button>...</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import FileIcon from '../assets/file.svg';
import FileImageIcon from '../assets/file-image.svg';
import FileCodeIcon from '../assets/file-code.svg';
import FilePdfIcon from '../assets/file-pdf.svg';
import DirectoryIcon from '../assets/folder.svg';

export default {
    name: 'DirectoryContent',
    mounted() {
        this.$eventBus.on('refreshDirectory', this.refresh);
    },
    beforeDestroy() {
        this.$eventBus.off('refreshDirectory', this.refresh);
    },
    computed: {
        directoryContent() {
            return this.$store.state.directoryContent;
        },
    },
    methods: {
        openDirectory(dirent) {
            if (dirent.type === 'directory') {
                this.$store.dispatch('changePath', dirent.name);
            }
        },
        refresh() {
            this.$store.dispatch('loadDirectory');
        },
        resolveIcon(dirent) {
            let icon;
            if (dirent.type === 'directory') {
                icon = 'DirectoryIcon';
            } else {
                switch (dirent.ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    icon = 'FileImageIcon';
                    break;
                case 'pdf':
                    icon = 'FilePdfIcon';
                    break;
                case 'js':
                case 'php':
                    icon = 'FileCodeIcon';
                    break;
                default:
                    icon = 'FileIcon';
                    break;
                }
            }
            return icon;
        },
    },
    components: {
        FileIcon,
        DirectoryIcon,
        FileImageIcon,
        FileCodeIcon,
        FilePdfIcon,
    },
};
</script>

<style scoped lang="scss">
.directory-content{
    width: 100%;
    border-collapse: collapse;
    thead{
        tr{
            th{
                padding: 0 0 5px;
                text-align: left;
                color: #828282;
            }
        }
    }
    tbody{
        tr{
            td{
                padding: 5px 0;
                border-top: 1px solid #cccccc;
                text-align: left;
                .icon{
                    color: #393939;
                    width: 20px;
                    height: 20px;
                }
                .dirent-name{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
