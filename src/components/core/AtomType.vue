<template>
    <div v-if="detail.kind === 'primitive'" class="gray">
        {{ detail.name }}
    </div>
    
    <div v-else-if="detail.kind === 'model'">
        <router-link
            class="link"
            :to="{ name: 'model', params: { name: detail.name } }"
        >
        {{ detail.name }}
        </router-link>
    </div>
    
    <div v-else-if="detail.kind === 'enum'">
        <router-link
            class="link"
            :to="{ name: 'enum', params: { name: detail.name } }"
        >
        {{ detail.name }}
        </router-link>
    </div>
</template>


<script>
export default {
    name: 'AtomType',
    props: {
        detail: Object
    },
    data() {
        return { }
    },
    created() { },
}
</script>


<style lang="scss" scoped>
.gray {
    color: #666;
}
.link {
    padding: 0px;
    margin: 0px;
    color: #2359a2;
}
</style>
