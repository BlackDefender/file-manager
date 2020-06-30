<template>
    <div id="app">
        <!--div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div-->
        <aside class="side-menu">
            FILE MANAGER
        </aside>
        <div class="route">
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss">
    @import "scss/base/config";
    @import "scss/base/mixins";
    @import "scss/base/reset";
    @import "scss/modules/button";
    @import "scss/modules/forms";
    @import "scss/modules/pop-up";
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    #app {
        display: flex;
        margin: 20px auto 0;
        width: 1440px;
        background-color: #18204e;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        .side-menu{
            width: 260px;
            padding: 20px;
            color: #ffffff;
            font-weight: 700;
            font-size: 20px;
            text-align: center;
        }
        .route{
            width: 1180px;
            background-color: #f0f1f5;
            padding: 30px;
        }
    }
</style>
