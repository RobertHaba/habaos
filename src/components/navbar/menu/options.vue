<template>
    <div class="menu-options bg-dark">
            <optionButton class="menu-options-user" imgURL="http://cdn.haba.usermd.net/os/img/admin.png" itemTitle="Account"/>
        <hr class="vertical-line">
        <ul class="options-list">
            <optionButton imgURL="http://cdn.haba.usermd.net/os/icons/setting.svg" itemTitle="Settings"/>
            <optionButton imgURL="http://cdn.haba.usermd.net/os/icons/power.svg" itemTitle="Power"/>
        </ul>
    </div>
</template>
<script>
    import optionButton from '../workListItem.vue'
    export default {
        components:{
            optionButton
        }
        
    }
</script>

<style scoped>
.menu-options{
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: calc(100% - 2rem);
    height: 50px;
    border-radius: 10px;
}
.menu-options-user{
    width: 50px;
    height: 100%;
}
.menu-options-user__img{
    width: 35px;
    height: 35px;
}
.options-list{
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: calc(100% - 50px);
}
</style>