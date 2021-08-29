<template>
    <div class="os-menu-start bg-theme">
        <div class="os-menu-start__section">
            <categoryTitle title="Widgets" imgURL="http://cdn.haba.usermd.net/os/icons/widgets.svg"/>
            <widgets />
        </div>
        <favorites />
        <allApps />
        <options />
    </div>
</template>

<script>
import categoryTitle  from './categoryTitle.vue'
import widgets from './category/widgets.vue'
import favorites from './category/favorites.vue'
import allApps from './category/allApps.vue'
import options from './options.vue'
    export default {
        components:{
            categoryTitle,
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
        width: 330px;
        height: 500px;
        bottom: 60px;
        padding: 1rem;
        border-radius: 10px;
        z-index: 999;
    }
    .os-menu-start div{
        margin-bottom: 1rem;
    }
    .os-menu-start__section{
    }
</style>