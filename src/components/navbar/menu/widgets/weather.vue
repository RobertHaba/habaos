<template>
    <div class="widget-tile">
        <div class="widget-column">
            <span class="widget-icon"><img src="http://cdn.haba.usermd.net/os/icons/cloud-white.svg" alt=""></span>
            <p class="widget-degrees c-title">22°</p>
        </div>
        <p class="widget-weather-text c-subtitle">Cloudy</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .widget-tile{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .widget-weather-text{
        font-size: 0.9rem;
    }
    .widget-degrees{
        font-size: 1.5rem;
    }
    .widget-column{
        display: flex;
        justify-content: space-between;
    }
    .widget-icon{
        width: 2rem;
        height: 2rem;
    }
</style>