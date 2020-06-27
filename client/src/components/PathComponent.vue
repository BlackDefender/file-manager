<template>
    <div class="path-component">
        <button class="step-back" @click="stepBack" title="Step back" aria-label="Step back">
            <ArrowLeft class="arrow"></ArrowLeft>
        </button>
        <div class="directory" @click="setCurrentPath(step.path)"
             v-for="(step, index) in pathSteps" :key="index">{{ step.name }}
        </div>
    </div>
</template>

<script>
import ArrowLeft from '../assets/arrow-left.svg';

export default {
    name: 'PathComponent',
    computed: {
        pathSteps() {
            const steps = [{
                name: 'root',
                path: [],
            }];
            this.$store.state.currentPath.forEach((name, index, array) => {
                steps.push({
                    name,
                    path: array.slice(0, index + 1),
                });
            });
            return steps;
        },
    },
    methods: {
        stepBack() {
            this.$store.dispatch('changePath', '..');
        },
        setCurrentPath(path) {
            this.$store.dispatch('setCurrentPath', path);
        },
    },
    components: {
        ArrowLeft,
    },
};
</script>

<style scoped lang="scss">
    @import "../scss/base/config";

    .path-component {
        display: flex;
        align-items: center;
        margin-bottom: 17px;

        .step-back {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $colorDarkBlue;
            cursor: pointer;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin-right: 10px;

            .arrow {
                color: $colorDarkBlue;
                width: 15px;
                height: 15px;
            }
        }

        .directory {
            position: relative;
            cursor: pointer;

            &:nth-child(n+3) {
                margin-left: 10px;

                &::before {
                    content: '/';
                    position: absolute;
                    top: 0;
                    left: -7px;
                    pointer-events: none;
                }
            }
        }
    }
</style>
