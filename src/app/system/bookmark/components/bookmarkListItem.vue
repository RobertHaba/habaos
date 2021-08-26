<template>
    <div class="bookmark-list-item">
        <div class="list-item-icon-wrapper">
            <span class="icon list-item-icon"></span>
        </div>
        <div class="list-item-content">
            <p class="list-item-content__title">OhMyDev</p>
            <p class="list-item-content__description">Nowości programistyczne w IT</p>
        </div>
        <span class="list-item-favorite list-item-favorite--active">
        </span>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.bookmark-list-item{
    display: grid;
    grid-template-columns: 50px 1fr 30px;
    grid-column-gap: 10px;
    height: 70px;
    width: 100%;
    padding: 10px;
    background-color: #393939;
    border-radius: 10px;
    margin-bottom: 1rem;
}
.list-item-icon-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 10px;
}
.list-item-icon{
    position: relative;
    width: 16px;
    height: 16px;
}
.list-item-icon::before{
    content: '';
    position: absolute;
    left: -7px;
    top:-7px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.2);
}
.list-item-content__title{
    font-size: 0.8rem;
    font-weight: bold;
}
.list-item-content__description{
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
}
.list-item-favorite{
    align-self: center;
    justify-self: center;
    width:20px;
    height: 20px;
    background-image: url('http://cdn.haba.usermd.net/os/icons/heart.svg');
    filter: invert(0.5) sepia(1) saturate(35) hue-rotate(-51deg);
}
.list-item-favorite--active{
    filter: invert(0.5) sepia(1) saturate(35) hue-rotate(-51deg);
}
</style>