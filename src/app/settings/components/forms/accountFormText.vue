<template>
    <div class="settings-form-wrapper" :data-account-data-get='readyToChange' @keyup="checkInput()">
            <p class="settings-form-wrapper__text"></p>
            <input type="text" class="settings-form-input" placeholder="Your name - 2-12 length" v-model="text" maxlength="12" data-account-value data-account-input-name="name">
    </div>
</template>
<script>
    export default {
        name:'formText',
        props:{
            formProps:Object
        },
        data(){
            return{
                text:'',
                readyToChange:false
            }
        },
        methods:{
            checkInput(){
                this.readyToChange = (this.text.length >= 2 && this.text.length <= 12)
            }
        },
        mounted(){
            setTimeout(()=>{
                this.text = this.formProps.name
            },50)
        }

    }
</script>