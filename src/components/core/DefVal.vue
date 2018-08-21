<template>
    <div class="parent">
        <div class="def" :title="JSON.stringify(def)">
            {{def}}
        </div>
        &nbsp;
        <button title="Copy to clipboard" class="btn_copy" v-on:click="copyDefault()"></button>
    </div>
</template>


<script>
export default {
    name: 'DefVal',
    props: ['def'],
    data() {
        return { }
    },
    methods: {
        copyDefault() {
            var text = JSON.stringify(this.def);
            var dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', text);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        },
    },
    created() {
    },
}
</script>


<style lang="scss" scoped>
.def {
    text-overflow:ellipsis;
    overflow:hidden;
    display:inline-block;
    white-space:nowrap;
    width:50px;
}
.btn_copy {
  display: block;
  width: 16px;
  height: 16px;
  
  cursor: pointer;
  
  background-color: transparent;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYklEQVQ4y9WTUQ7AIAhDW8Mh2Q295fzaYoggC/6siR+kr2ggEr5uU3MFMRl2eQbBlNcWQJ/q+VgPACDmlg7gCubyeOo1sOBWDUVJdQuSBasv4NcG/M8Mjq9RExnNfqZIb24AbBASN6LfEloAAAAASUVORK5CYII=");
  opacity: 0.45;
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;

  border: 0px;
}
</style>
