<template>
  <div id="app">
        <main>
            <aside class="sidebar">
                <header>
                    <router-link class="header_link" :to="{ name: 'home'}">
                        <h1 class="header">{{appName}}</h1>
                        <h3 class="version">{{appVersion}}</h3>
                    </router-link>
                </header>
                <menu>
                    <!-- Enums list -->
                    <h3 v-if="enums.length">Enums</h3>
                    <router-link
                        v-for="e in enums"
                        :key="e"
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'enum', params: { name: e } }"
                    >
                    {{e}}
                    </router-link>

                    <!-- Models list -->
                    <h3 v-if="models.length">Models</h3>
                    <router-link
                        v-for="m in models"
                        :key="m"
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'model', params: { name: m } }"
                    >
                    {{m}}
                    </router-link>

                    <!-- Methods list -->
                    <h3 v-if="methods.length">Methods</h3>
                    <router-link
                        v-for="m in methods"
                        :key="m"
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'method', params: { name: m } }"
                    >
                    {{m}}
                    </router-link>
                </menu>
            </aside>
            <div class="full">
                <div class="content">
                    <router-view></router-view> 
                </div>
            </div>
        </main>
  </div>
</template>

<script>
import {initHTTPClient, apiRequest} from './http-client'

export default {
    name: 'app',
    props: ['apiURI', 'appName', 'appVersion'],

    data () {
        return {
            enums: [],
            models: [],
            methods: [],
        }
    },

    created() {
        initHTTPClient(this.apiURI);
        this.getAllEnums();
        this.getAllModels();
        this.getAllMethods();
    },

    methods: {
        getAllEnums() {
            apiRequest("__schema.enum.names", {})
                .then(response => this.enums = response.data.result);
        },
        getAllModels() {
            apiRequest("__schema.model.names", {})
                .then(response => this.models = response.data.result);
        },
        getAllMethods() {
            apiRequest("__schema.method.names", {})
                .then(response => this.methods = response.data.result);
        }
    }
}
</script>

<style lang="scss">
    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
    }
    entry-component {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    h1, h2 {
        font-weight: normal;
        margin: 0;

        &.header {
            margin: 0;
            font-weight: bold;
            color: #fff;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    h3 {
        &.version {
            font-weight: bold;
            margin: 5px;
            color: #bbb;
        }
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    main {
        display: flex;
        height: 100vh;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }
    aside {
        height: 100%;
        width: 300px;
        box-sizing: border-box;
        padding: 0;
        background: #ffffff;
    }
    header {
        box-sizing: border-box;
        height: 80px;
        width: 100%;
        min-height: 10px;
        padding: 15px;
        text-align: center;
        background: #4a819e;
    }
    menu {
        height: calc(100vh - 80px);
        width: 100%;
        margin: 0;
        padding: 10px 40px;
        box-sizing: border-box;
        overflow-y: auto;
        background: #f0f0f0;
    }
    .full {
        width: calc(100% - 300px);
        overflow-y: auto;
    }
    .content {
        max-width: 1000px;
    }
    .header_link {
        display: block;
        text-decoration: none;
    }
    .link {
        display: block;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        padding: 8px;
        color: #2c3e50;

        &--home {
            text-transform: uppercase;
            margin-bottom: 30px;
        }

        &.is-active {
            color: #fff;
            font-weight: bold;
            background: #62a1c1;
        }
    }
    table {
    }
    tr {
        &:hover {
            background: #f1f1f1;
        }
    }
    th {
          color: #252525;
          background: #eee;
          text-transform: uppercase;
    }
    th, td {
          padding: 7px 10px 7px 10px;
    }
</style>
