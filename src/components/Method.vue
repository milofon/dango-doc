<template lang="html">
    <div class="method" v-if="method">

        <div class="parent">
            <h1>Method</h1>&nbsp;<h1 class="method__title">{{method.name}}</h1>
        </div>

        <p class="method__summary" v-if="method.summary">
            {{method.summary}}
        </p>
        <p class="method__description" v-if="method.description">
            {{method.description}}
        </p>

        <h3>Params:</h3>
        <table v-if="!emptyParams()">
            <tr>
                <th>Name</th>
                <th>Default</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            <!-- Required fields -->
            <tr v-for="(v, k) in method.params" :key="k" v-if="v.required">
                <td>{{k}}</td>
                <td title="No default value">&mdash;</td>
                <td><Type :type="v.type" /></td>
                <td>{{v.note}}</td>
            </tr>
            <!-- Optional fields -->
            <tr v-for="(v, k) in method.params" :key="k" v-if="!v.required">
                <td>
                    <div class="parent">
                        <div>{{k}}</div>
                        <div class ="optional">(optional)</div>
                    </div>
                </td>
                <td><div class="optional"><DefVal :def="v.defVal" /></div></td>
                <td><Type :type="v.type" /></td>
                <td>{{v.note}}</td>
            </tr>
        </table>
        <p v-else class="method__none" title="No params">&mdash;</p>

        <h3>Returns:</h3>
        <table v-if="!emptyReturns()">
            <tr>
                <th>Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><Type :type="method.retType.type" /></td>
                <td>{{method.retType.note}}</td>
            </tr>
        </table>
        <p v-else class="method__none" title="No returns">&mdash;</p>
    </div>
</template>

 
<script>
    import {apiRequest} from '../http-client'
    import Type from './core/Type.vue'
    import DefVal from './core/DefVal.vue'
  
    export default {
        props: ['name'],
        components: {
            DefVal,
            Type
        },
        data() {
            return {
                method: null,
            }
        },
        methods: {
            getMethod() {
                apiRequest("__schema.method.get", {name: this.name})
                    .then(response => this.method = response.data.result);
            },
            emptyParams() {
                if (this.method == null || this.method.params == null)
                    return true;
                for (var key in this.method.params)
                    if (this.method.params.hasOwnProperty(key))
                        return false;
                return true;
            },
            emptyReturns() {
                if (this.method == null || this.method.retType == null)
                    return true;
                return this.method.retType.type.input === "void"
                        && !this.method.retType.note;
            }
        },
        
        created() {
            this.getMethod();
        },
        watch: {
            '$route'() {
                this.getMethod();
            }
        }
    }
</script>


<style lang="scss" scoped>
    .parent {
        display: flex;
        align-items: center;
    }
    .optional {
        padding: 0px 2px;
        font-size: 75%;
        color: #666;
    }
    .method {
        position: relative;
        padding: 50px 70px 70px;

        &__title {
            padding: 0;
            margin: 0;
            font-weight: bold;
            position: relative;
        }

        &__description {
            white-space: pre-line;
            line-height: 175%;
        }

        &__none {
            position: relative;
            padding: 0px 15px;
        }
    }
</style>
