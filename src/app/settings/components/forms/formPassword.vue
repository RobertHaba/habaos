<template>
    <div class="settings-form-wrapper settings-form-wrapper--column" :data-account-data-get='this.readyToChange' @keyup="checkPassword()">
        <div class="settings-form-column">
                <label class="settings-form-label">{{formProps.label1}}</label>
                <input type="text" class="settings-form-input" placeholder="Old password" v-model="oldPassword">
        </div>
        <div class="settings-form-column">
                <label class="settings-form-label">{{formProps.label2}}</label>
                <input type="text" class="settings-form-input" placeholder="New password 3-20 length" v-model="newPassword" minlength="3" maxlength="20" data-account-value data-account-input-name="password">
        </div>
    </div>
</template>
<script>
export default {
    name:'formPassword',
    props:{
        formProps:Object,
    },
    data(){
        return{
            oldPassword:'',
            newPassword:'',
            oldPasswordCheck:false,
            newPasswordValidStatus: false,
            readyToChange: false,
        }
    },
    methods:{
        checkPassword(){
            this.checkOldPassword()
            if(this.oldPasswordCheck == true){
                this.validNewPassword()
            }
            this.readyToChange = (this.oldPasswordCheck == true && this.newPasswordValidStatus == true)? true : false

        },
        checkOldPassword(){
            this.oldPasswordCheck = (this.oldPassword == this.formProps.oldPassword) ? true : false
        },
        validNewPassword(){
            this.newPasswordValidStatus = (this.formProps.oldPassword !== this.newPassword && this.newPassword.length >= 3)? true : false
        }

    },
    
}
</script>