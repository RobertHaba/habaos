<template>
    <div class="settings-form-wrapper">
        <span class="icon" :style="{'background-image' : 'url(' + formProps.img + ')'}"></span>
        <input type="text" class="settings-form-input" placeholder="Url to your avatar">
    </div>
</template>

<script>
    export default {
        name:'formImage',
        props:{
            formProps:Object
        }

    }
</script>

<style scoped>
.icon{
    width: 35px;
    height: 35px;
}
</style>