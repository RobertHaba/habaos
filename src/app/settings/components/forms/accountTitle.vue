<template>
    <div class="list-header">
        <span class="icon icon--reverse-color" :style="{'background-image' : 'url('+ imgURL +')'}"> </span>
        <p class="list-header__title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            imgURL: String,
            title: String
        }
    }
</script>

<style scoped>
.list-header{
    display: flex;
    align-items: center;
}
.icon{
    width: 1rem;
    height: 1rem;
}
.list-header__title{
    margin-left: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
}
</style>