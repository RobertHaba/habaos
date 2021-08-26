<template>
    <div class="search-bar bg-theme--no-gradient">
        <span class="icon"></span>
        <input class="search-bar__input bg-theme--no-gradient" type="text" placeholder="Let's search!"/>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.search-bar{
    display: grid;
    grid-template-columns: 40px 1fr;
    width: 100%;
    height: 30px;
    border-radius: 50px;
}
.icon{
    justify-self: center;
    width: 30px;
    background-size: 15px;
    background-image: url('https://cdn.haba.usermd.net/os/icons/search-white.svg');
}
.search-bar__input{
    width: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 0 0.5rem;
    color: #FFF;
}
</style>