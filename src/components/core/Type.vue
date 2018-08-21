<template>
    <div class="parent">
        {{type.input}}
        <div class="original gray">&nbsp;(</div>
        <div v-if="type.input === 'object'" class="original">
            <AtomType :detail="type.details[0]"/>
            <div class="gray">&nbsp;[</div>
            <AtomType :detail="type.details[1]"/>
            <div class="gray">]</div>
        </div>
        <div v-else-if="type.input === 'array'" class="original">
            <AtomType :detail="type.details[0]"/><div class="gray">[&nbsp;]</div>
        </div>
        <div v-else>
            <AtomType :detail="type.details[0]" class="original"/>
        </div>
        <div class="original gray">)</div>
    </div>

</template>


<script>
import AtomType from "./AtomType.vue"

export default {
    name: 'Type',
    props: {
        type: Object
    },
    components: {
        AtomType
    },
    data() {
        return { }
    },
    created() { },
}
</script>


<style lang="scss" scoped>
div {
    padding: 0px;
    margin: 0px;
}
.gray {
    color: #666;
}
.parent {
    display: flex;
    align-items: center;
}
.original {
    display: flex;
    align-items: center;
    padding: 0px 2px;
    font-size: 75%;
}
.type {
    padding: 0px;
    margin: 0px;
}
</style>
