<template>
    <button>
        {{btnTitle}}
    </button>
</template>

<script>
    export default {
        props:{
            btnBgColor:String,
            btnTitle:String
        }
    }
</script>

<style scoped>
button{
    background-color: v-bind(btnBgColor);
}
</style>