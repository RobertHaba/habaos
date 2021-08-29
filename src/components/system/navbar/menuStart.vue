<template>
    <div class="os-menu-start bg-theme">
        <widgets />
        <favorites />
        <allApps />
        <options />
    </div>
</template>

<script>
import widgets from './menu/widgets.vue'
import favorites from './menu/favorites.vue'
import allApps from './menu/allApps.vue'
import options from './menu/options.vue'
    export default {
        components:{
            widgets,
            favorites,
            allApps,
            options
        }
    }
</script>

<style scoped>
    .os-menu-start{
        position: absolute;
        min-width: 320px;
        height: 500px;
        bottom: 60px;
        padding: 1rem;
        border-radius: 10px;
        z-index: 999;
    }
    .os-menu-start div{
        margin-bottom: 1rem;
    }
</style>