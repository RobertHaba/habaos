<template>
    <div class="menu-title-container">
        <span class="menu-title-container__icon" :style="{'background-image' : 'url('+ imgURL + ')'}"></span><h2 class="menu-title-container__title">{{title}}</h2>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
            imgURL: String
        }
    }
</script>

<style scoped>
    .menu-title-container{
        display: flex;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 1rem;
    }
    .menu-title-container__icon{
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
        background-size: 100%;
    }
    .menu-title-container__title{
        font-size: 1rem;
        color: #FFF;
        font-weight: normal;
    }
</style>