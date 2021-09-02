<template>
    <div class="widget-tile">
        <p class="widget-title c-title">Kedam</p>
        <p class="widget-subtitle c-subtitle">Shy Girl</p>
        <div class="widget-options">
            <button class="widget-button widget-button--previous"></button>
            <button class="widget-button widget-button--play icon--reverse-white"></button>
            <button class="widget-button widget-button--next"></button>
        </div>
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
    .widget-title{
        font-weight: bold;
        font-size: 0.9rem;
    }
    .widget-subtitle{
        font-size: 0.7rem;
    }
    .widget-options{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        margin-top: 0.3rem;
    }
    .widget-button{
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        background-size: 100%;
    }
    .widget-button--play{
        margin: 0 0.8rem;
        background-image: url('http://cdn.haba.usermd.net/os/icons/play.svg');
    }
    .widget-button--next{
        background-image: url('http://cdn.haba.usermd.net/os/icons/next-white.svg');
    }
    .widget-button--previous{
        background-image: url('http://cdn.haba.usermd.net/os/icons/previous-white.svg');
    }
</style>