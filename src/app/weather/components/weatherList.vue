<template>
    <li class="list-item" :class="['list-item--' + orientation]" v-for="weather in object" :key="weather.id" >
        <p class="list-item__text">{{weather.text}}</p>
        <div class="icon" :style="'background-image: url('+weather.icon+')'"></div>
        <p class="list-item__temperature">{{weather.mainTemperature}}<span class="temperature-dot"></span></p>
        <p class="list-item__temperature list-item__temperature--night" v-if="weather.nightTemperature">{{weather.nightTemperature}}<span class="temperature-dot"></span></p>
    </li>
</template>

<script>
    export default {
        props:['object', 'orientation'],
    }
</script>

<style scoped>

.icon{
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-size: 100%;
}
.list-item--vertical .icon{
    margin: 0.5rem 0;
}
.i-cloud-with-sun{
    background-image: url('https://cdn.haba.usermd.net/os/icons/cloud-with-sun.svg');
}
.list-item{
    display: flex;
    align-items: center;
}
.list-item--horizontal{
    display: grid;
    grid-template-columns:4fr 2fr 1fr 1fr;
    margin-bottom: 1rem;
}
.list-item--vertical{
    flex-direction: column;
    width: 60px
}
.list-item__temperature{
    width: 40px;
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.9;
}
.list-item__temperature--night{
    opacity: 0.5;

}
.list-item--vertical .list-item__temperature{
    width: unset;
    font-size: 1rem;
}
.list-item--right{
    justify-content: flex-end;
}
.list-item__text{
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.9;
    text-transform: capitalize;
}
.temperature-dot{
    position: absolute;
    margin-left: -0.2rem;
    width: 6px;
    height: 6px;
    transform: translateX(100%);
    border:1px solid #273a52;
    border-radius: 100px;
}
.list-item--dark .temperature-dot{
    border-color: #FFF;
}
</style>