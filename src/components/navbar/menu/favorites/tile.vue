<template>
    <div class="favorite-item">
        <span class="icon" :style="{'background-image' : 'url('+iconURL +')'}"></span>
        <p class="favoritle-item__title c-title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            iconURL:String,
            title:String
        }
    }
</script>

<style scoped>
.favorite-item{
    position: relative;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    height: 100%;
    padding: 0.5rem;
    margin-right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius:10px;
}
.favoritle-item__title{
    margin-left: 0.5rem;
    font-size: 0.9rem;
}
.icon{
    width: 20px;
    height: 20px;
}
</style>