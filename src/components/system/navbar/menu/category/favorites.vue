<template>
    <div class="menu-favorites">
        <categoryTitle title="Favorites Apps" imgURL="http://cdn.haba.usermd.net/os/icons/favorites.svg"/>
        <div class="menu-favorites__container">
            <tile title="Muzyka" iconURL="http://cdn.haba.usermd.net/os/icons/favorites/music.svg" />
            <tile title="Kalkulator" iconURL="http://cdn.haba.usermd.net/os/icons/favorites/calculator.svg" />
        </div>
    </div>
</template>

<script>
import categoryTitle  from '../categoryTitle.vue'
import tile  from '../favorites/tile.vue'
    export default {
        components:{
            categoryTitle,
            tile
        }
    }
</script>

<style scoped>
.menu-favorites__container{
    display: flex;
    justify-content: flex-start;
}
</style>