<template lang="html">
  <div class="model" v-if="model">
      <div class="parent">
          <h1>Model</h1>&nbsp;<h1 class="model__title">{{model.name}}</h1>
      </div>
        <br />
    <p class="model__note" v-if="model.note">{{model.note}}</p>
    <table>
        <tr>
            <th>Field name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>

        <tr class="model__member_req" v-for="(v, k) in model.members" :key="k" v-if="v.required">
            <td>{{k}}</td>
            <td>
                <Type :type="v.type" />
            </td>
            <td>{{v.note}}</td>
        </tr>
        <tr class="model__member_opt" v-for="(v, k) in model.members" :key="k" v-if="!v.required">
            <td>
                <div class="parent">
                    <div>{{k}}</div>
                    <div class="optional">(optional)</div>
                </div>
            </td>
            <td>
                <Type :type="v.type" />
            </td>
            <td>{{v.note}}</td>
        </tr>
    </table>
  </div>
</template>
 
<script>
  import Type from './core/Type.vue'
  import {apiRequest} from '../http-client'
  export default {
    props: ['name'],
    components: {
        Type
    },
    data() {
      return {
        model: null,
      }
    },
    methods: {
      getModel() {
            apiRequest("__schema.model.get", {name: this.name})
                .then(response => this.model = response.data.result);
      }
    },
    
    created() {
      this.getModel();
    },
    watch: {
      '$route'() {
        this.getModel();
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
  .model {
    position: relative;
    padding: 50px 70px 70px;
    &__title {
      margin: 0;
      font-weight: bold;
      position: relative;
      z-index: 1;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
    &__id {
      position: absolute;
      font-size: 280px;
      bottom: -50px;
      margin: 0;
      color: #eeeeee;
      right: -20px;
      line-height: 1;
      font-weight: 900;
      z-index: 0;
    }
    &__note {
      white-space: pre-line;
    }
  }
</style>
