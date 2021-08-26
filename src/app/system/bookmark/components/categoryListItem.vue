<template>
    <div class="category-list-item">
        <span class="icon list-item-icon" :style="{'background-image' : 'url(http://cdn.haba.usermd.net/os/icons/coding.svg)'}"></span>
        <p class="list-item-title">Programming</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.category-list-item{
    display: grid;
    grid-template-rows: 4fr 2fr;
    align-items: center;
    justify-items: center;
    width: 100px;
    min-width: 100px;
    height: 100px;
    margin-right: 1rem;
    background-color: black;
    border-radius: 20px;
}
.list-item-icon{
    position: relative;
    top: 0.5rem;
    width: 25px;
    height: 25px;
}
.list-item-icon::before{
    content: '';
    position: absolute;
    left: -12.5px;
    top: -12.5px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.20);
}
.list-item-title{
    font-weight: bold;
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.70);
}
</style>