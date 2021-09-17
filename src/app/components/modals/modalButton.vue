<template>
    <button>
        {{btnTitle}}
    </button>
</template>

<script>
    export default {
        props:{
            btnBgColor:String,
            btnTitle:String,
            btnFontColor:String,
        }
    }
</script>

<style scoped>
button{
    background-color: v-bind(btnBgColor);
    color:v-bind(btnFontColor);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding: 0.4rem 1.5rem;
    border-radius: 100px;
}
</style>