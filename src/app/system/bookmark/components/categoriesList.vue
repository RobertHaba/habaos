<template>
    <div class="category-list-wrapper">
        <div class="category-list">
            <categoryItem />
            <categoryItem />
            <categoryItem />
            <categoryItem />
        </div>
    </div>
</template>

<script>
import categoryItem from './categoryListItem.vue'
    export default {
        components:{
            categoryItem
        }
    }
</script>

<style lscoped>
.category-list{
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100px + 1rem);
    overflow-x: auto;
    padding-bottom: 1rem;
}
.category-list{
    position: relative;
    display: flex;
    width: 100%;
}
</style>