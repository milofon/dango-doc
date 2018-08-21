import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Hello from './components/Hello.vue'
import Enum from './components/Enum.vue'
import Model from './components/Model.vue'
import Method from './components/Method.vue'

Vue.use(Router)
Vue.config.productionTip = false

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Hello,
        },
        {
            path: '/enum/:name',
            name: 'enum',
            component: Enum,
            props: true,
        },
        {
            path: '/model/:name',
            name: 'model',
            component: Model,
            props: true,
        },
        {
            path: '/method/:name',
            name: 'method',
            component: Method,
            props: true,
        },
    ]
})

new Vue({
    el: 'entry-component',
    render(h) {
        return h(App, {
            props: {
                apiURI: this.$el.attributes['apiURI'].value,
                appName: this.$el.attributes['appName'].value,
                appVersion: this.$el.attributes['appVersion'].value
            }
        })
    },
    router
})
