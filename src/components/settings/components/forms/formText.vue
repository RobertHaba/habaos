<template>
    <div class="settings-form-wrapper" :data-account-data-get='readyToChange' @keyup="checkInput()">
            <p class="settings-form-wrapper__text"></p>
            <input type="text" class="settings-form-input" placeholder="Your name - 3-20 length" v-model="text" maxlength="20" data-account-value data-account-input-name="name">
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
                this.readyToChange = (this.text.length >= 3 && this.text.length <= 20)
            }
        },
        mounted(){
            setTimeout(()=>{
                this.text = this.formProps.name
            },50)
        }

    }
</script>