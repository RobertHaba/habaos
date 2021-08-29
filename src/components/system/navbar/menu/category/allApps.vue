<template>
    <div class="menu-all-apps">
        <categoryTitle title="All Apps" imgURL="http://cdn.haba.usermd.net/os/icons/apps.svg"/>
        <ul class="menu-all-apps-list">
            <appItem title="Spotify" iconURL="http://cdn.haba.usermd.net/os/icons/apps/spotify.svg"/>
            <appItem title="Google Chrome" iconURL="http://cdn.haba.usermd.net/os/icons/apps/chrome.svg"/>
        </ul>
    </div>
</template>

<script>
import categoryTitle from '../categoryTitle.vue'
import appItem from '../apps/appItem.vue'
    export default {
        components:{
            categoryTitle,
            appItem
        }
    }
</script>

<style scoped>
.menu-all-apps-list{

}
</style>