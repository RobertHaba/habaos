<template>
    <div class="bookmark-list-wrapper">
        <div class="bookmark-list">
            <bookmarkListItem />
            <bookmarkListItem />
            <bookmarkListItem />
            <bookmarkListItem />
        </div>
    </div>
</template>

<script>
import bookmarkListItem from './bookmarkListItem.vue'
    export default {
        components:{
            bookmarkListItem
        }
    }
</script>

<style scoped>
.bookmark-list-wrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 250px;
}
.bookmark-list{
    position: relative;
    height: 100%;
    overflow-y: auto;
}
</style>