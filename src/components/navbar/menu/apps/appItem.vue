<template>
    <li class="app-item">
        <span class="icon" :style="{'background-image' : 'url('+iconURL+')'}"></span>
        <p class="app-item__title c-title">{{title}}</p>
    </li>
</template>

<script>
    export default {
        props:{
            title:String,
            iconURL: String
        }
    }
</script>

<style scoped>
    .app-item{
        display: flex;
        margin-bottom: 0.8rem;
    }
    .icon{
        width: 20px;
        height: 20px;
    }
    .app-item__title{
        margin-left: 0.5rem;
        font-size: 0.9rem;
    }
</style>