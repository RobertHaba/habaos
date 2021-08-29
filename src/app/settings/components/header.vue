<template>
    <div class="header">
        <span class="icon" :style="{'background-image' : 'url(' + imgURL + ')'}"></span>
        <h2 class="header-title">{{title}}</h2>
    </div>  
</template>

<script>
    export default {
        props:{
            imgURL:String,
            title:String
        }
    }
</script>

<style scoped>
.header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 70px;
    background-color: rgba(134, 134, 134, 0.164);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
}
.icon{
    width: 1.1rem;
    height: 1.1rem;
}
.header-title{
    margin-top: 0.2rem;
    font-weight: bold;
    font-size: 1.2rem;
}
</style>