<template>
    <div class="settings-form-wrapper" :data-account-data-get='readyToChange' >
        <label :for="formProps.id"></label>
        <select :id="formProps.id" :name="formProps.id" class="settings-form-select" v-model="option" @click="checkInput()" data-account-value data-account-input-name="location">
            <option v-for="city in formProps.cities" :key="city.id" :value="city.name">{{city.name}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props:{
            formProps:Object
        },
        data(){
            return{
                option:'',
                readyToChange:false
            }
        },
        methods:{
            checkInput(){
                this.readyToChange = (this.option != this.formProps.city)
            }
        },
        mounted(){
            setTimeout(()=>{
                this.option = this.formProps.city
            },50)
        }
    }
</script>

<style lang="scss" scoped>

</style>