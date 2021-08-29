<template>
    <li class="list-item" v-for="detail in object" :key="detail.id" :class="{'list-item--right': detail.itemPosition == 'right'}">
        <div class="icon" :class='["i-"+detail.icon, "icon--" + detail.iconPosition]'></div><p class="list-item__text">{{detail.text}}</p>
    </li>
</template>

<script>
    export default {
        props:['object'],
    }
</script>

<style scoped>

.icon{
    display: block;
    width: 1.1rem;
    height: 1.1rem;
    background-size: 100%;
}
.icon--left{
    margin-right: 0.4rem;
}
.icon--right{
    margin-left: 0.4rem;
    order:1;
}
.i-wind{
    background-image: url('../../assets/icons/wind.svg');
}
.i-down-arrow{
    background-image: url('../../assets/icons/down-arrow.svg');
}
.i-water-drop{
    background-image: url('../../assets/icons/drop.svg');
}
.i-morning-sun{
    background-image: url('../../assets/icons/morning-sun.svg');
}
.i-moon{
    background-image: url('../../assets/icons/moon.svg');
}
.list-item{
    display: flex;
    align-items: center;
}
.list-item--right{
    justify-content: flex-end;
}
.list-item__text{
    font-size: 0.8rem;
    font-weight: 500;
}
</style>