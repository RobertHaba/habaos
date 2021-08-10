<template>
    <div class="settings-form-wrapper">
        <label :for="formProps.id"></label>
        <select :id="formProps.id" :name="formProps.id" class="settings-form-select" >
            <option v-for="city in formProps.cities" :key="city.id" :value="city.name">{{city.name}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props:{
            formProps:Object
        }
    }
</script>

<style lang="scss" scoped>

</style>