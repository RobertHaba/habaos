<template>
<div class="login-form-container">
    <div class="login-avatar box-shadow-dark">
        <img class="img" :src="newAvatarSrc" alt="">
    </div>
    <div class="login-form box-shadow-dark">
        <template v-for="item in formItems" :key="item.id">
            <formInput :inputProps="item" v-model="item.value" />
        </template>
        <p class="login-from__error-message">{{validationMessage}}</p>
        <button class="login-form__button" @click="login">Login</button>
    </div>
    <ul class="login-member-users">
        <li class="login-member-users__item login-member-user" :class="{'login-member-users__item--active':((formItems[0].value && user.email) && formItems[0].value.toLowerCase() == user.email.toLowerCase())}" v-for="user in memberUsers" :key="user.name">
            <button class="login-member-user__button"  @click="loadMemberUserToForm(user), activeUser=user.email"><img class="img img--member" :src="user.avatarSrc" alt="">{{user.name}}</button>
        </li>
    </ul>
</div>
</template>

<script>
import {
    fBase
} from '@/firebaseDB';
import formInput from "@/components/assets/form/form-input.vue"
export default {
    data() {
        return {
            formItems: [{
                    id: 'login-email',
                    tag: 'input',
                    label: 'Email',
                    placeholder: 'ex. tommy@mail.com',
                    minLght: 2,
                    maxLght: 999,
                    type: 'text',
                    value: '',
                    validation: '',
                    validationStatus: false,
                    validationMessage: '',

                },
                {
                    id: 'login-password',
                    tag: 'input',
                    label: 'Password',
                    placeholder: 'Password',
                    minLght: 6,
                    maxLght: 12,
                    type: 'password',
                    value: '',
                    validation: '',
                    validationStatus: false,
                    validationMessage: '',
                },
            ],
            validationMessage: '',
            avatarSrc:'https://cdn.haba.usermd.net/os/icons/user-white.svg',
            activeUser:'',
            memberUsers: ''
        }
    },
    components: {
        formInput
    },
    computed:{
        newAvatarSrc(){
            let newSrc = '' 
            let inputEmail = this.formItems[0].value
            if(inputEmail.length > 0 && this.memberUsers != ''){
            let activeUser = this.memberUsers.find(user => user.email.toLowerCase() == inputEmail.toLowerCase())
                if(activeUser && activeUser.email.toLowerCase() == inputEmail.toLowerCase()){
                    newSrc = (!activeUser)? this.avatarSrc : activeUser.avatarSrc
                }
                else{
                    newSrc = 'https://cdn.haba.usermd.net/os/icons/user-white.svg'
                }
            }
            else{
                newSrc = 'https://cdn.haba.usermd.net/os/icons/user-white.svg'
            }
            return newSrc
        }
    },
    methods: {
        login() {
            this.checkPassword()
        },
        getMemberUsersFromStorage() {
            let memberUsersFromStorage = localStorage.getItem('memberUsers')
            memberUsersFromStorage = JSON.parse(memberUsersFromStorage)
            if(memberUsersFromStorage != null){
                this.memberUsers = (!Array.isArray(memberUsersFromStorage))? [memberUsersFromStorage]:memberUsersFromStorage
            }
        },
        checkPassword() {
            fBase.auth().signInWithEmailAndPassword(this.formItems[0].value, this.formItems[1].value)
                .then((data) => {
                    sessionStorage.setItem('email', this.formItems[0].value)
                    sessionStorage.setItem('uid', data.user.uid)
                    sessionStorage.setItem('authenticated', true)
                    this.$router.push({
                        path: '/system'
                    })
                })
                .catch((err) => {
                    if (err.code == 'auth/invalid-email') {
                        this.validationMessage = "Bad email address"
                    } else if (err.code == 'auth/wrong-password') {
                        this.validationMessage = "Incorret password or email address"
                    } else {
                        this.validationMessage = 'Error, try again'
                    }
                })
        },
        loadMemberUserToForm(user){
            this.formItems[0].value = user.email
            this.avatarSrc = user.avatarSrc
        }
    },
    mounted() {
        this.getMemberUsersFromStorage()
    }
}
</script>

<style scoped>
.login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: #FFF;
}

.login-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 330px;
    padding: 2rem;
    margin: 3rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
}

.login-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 100%;
}

.login-avatar .img {
    width: 70%;
    height: 70%;
    border-radius: 100%;
    object-fit: cover;
}

.form-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
}

.login-from__error-message {
    margin-bottom: 1rem;
    font-size: 0.8rem;
    color: var(--subpage-second-color);
}

.login-form__button {
    position: relative;
    padding: 0.3rem 1.5rem;
    background-color: #FFF;
    color: var(--subpage-main-color);
    font-weight: bold;
    border-radius: 30px;
}

.login-form__button:hover {
    border-radius: 3px;
    transition: 0.5s ease all;
}

.login-member-users {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 330px;
    padding-bottom: 1rem;
    overflow-x: auto;
}

.login-member-users__item {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
}

.login-member-users__item--active{
    transition: 0.3s ease all;
    background-color: var(--subpage-second-color--opacity);
    border-radius: 5px;
}
.login-member-user__button {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 1.5rem 0 0.5rem;
    color: #FFF;
    font-weight: bold;
}
.img--member {
    width: 35px;
    height: 35px;
    margin-right: 1rem;
    border-radius: 100%;
}
</style><style>
.form-item__label,
.form-item__title {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-item__input,
.form-item__select {
    padding-bottom: 0.4rem;
    color: #FFF;
    background-color: unset;
    border: none;
    border-bottom: 2px solid var(--subpage-second-color);
}

.form-item-wrapper {
    display: none;
    justify-content: space-between;
    margin-top: 0.2rem;
}
</style>
