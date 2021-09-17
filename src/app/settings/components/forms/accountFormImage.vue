<template>
    <div class="settings-form-wrapper" :data-account-data-get='readyToChange' @keyup="checkInput()">
        <span class="icon" :style="{'background-image' : 'url(' + imgURL + ')'}" ></span>
        <input type="text" class="settings-form-input" v-model="imgURL" placeholder="Url to your avatar" data-account-value data-account-input-name="avatar" >
    </div>
</template>

<script>
    export default {
        name:'formImage',
        props:{
            formProps:Object
        },
        data(){
            return{
                imgURL:'',
                readyToChange:false
            }
        },
        methods:{
            checkInput(){
                let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                let regex = new RegExp(expression);
                this.readyToChange = (this.imgURL.match(regex)) ? true : false
            }
        },
        mounted(){
            setTimeout(()=>{
                this.imgURL = this.formProps.img
            },50)
        }

    }
</script>

<style scoped>
.icon{
    width: 35px;
    height: 35px;
    border-radius: 100px;
}
</style>