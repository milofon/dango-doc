<template lang="html">
    <div class="denum" v-if="denum">
        <div class="parent">
            <h1>Enum</h1>&nbsp;<h1 class="denum__title">{{denum.name}}</h1>
        </div>
        <div class="parent">  
            <div class="denum__type">{{denum.type.input}}</div>
            <div class="denum__type__original">({{denum.type.original}})</div>
        </div>
        <br />
        <p class="denum__note" v-if="denum.note">{{denum.note}}</p>
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
            <tr class="denum__value" v-for="(v, k) in denum.values" :key="k">
                <td>{{k}}</td>
                <td>{{v}}</td>
            </tr>
        </table>
    </div>
</template>

 
<script>
    import {apiRequest} from '../http-client'

    export default {
        props: ['name'],
        data() {
            return {
                denum: null,
            }
        },
        methods: {
            getEnum() {
                apiRequest("__schema.enum.get", {name: this.name})
                    .then(response => this.denum = response.data.result);
          }
        },
        created() {
            this.getEnum();
        },
        watch: {
            '$route'() {
                this.getEnum();
            }
        }
    }
</script>


<style lang="scss" scoped>
    .parent {
        display: flex;
        align-items: center;
    }
    .denum {
        position: relative;
        max-width: 500px;
        padding: 50px 70px 70px;

        &__title {
            margin: 0;
            font-weight: bold;
            position: relative;
        }

        &__type {
            position: relative;
            padding: 3px;
            &__original {
                padding: 3px;
                font-weight: bold;
                color: #666;
            }
        }

        &__note {
            white-space: pre-line;
            line-height: 175%;
        }
    }
</style>
