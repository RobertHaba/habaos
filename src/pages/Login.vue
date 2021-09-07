<template>
    <section class="container">
        <div class="login-form">
            <div class="login-form__avatar">
                <img class="img" src="http://cdn.haba.usermd.net/os/img/user.jpg" alt="">
            </div>
            <input class="login-form__input" type='text' placeholder="email" v-model="email">
            <input class="login-form__input" type="password" placeholder="Password" id="loginPassword" v-model="password"/>
            <button @click="login">Zaloguj</button>
        </div>
    </section>
</template>

<script>
import { fBase } from '@/firebaseDB';
    export default {
        name: 'login',
        data(){
            return{
                email:'',
                password:''
            }
        },

        methods:{
            login(){
                this.checkPassword()
            },
            getEmailFromLocalStorage(){
                this.email = localStorage.getItem('email')
            },
            checkPassword(){
                fBase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then((data)=>{
                    console.log(data);
                    sessionStorage.setItem('uid',data.user.uid)
                    sessionStorage.setItem('authenticated',true)
                    console.log(this.$userEmail);
                    this.$router.push({ path: '/system'})
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        },
        mounted(){
            this.getEmailFromLocalStorage()
        }

    }
</script>

<style scoped>
.container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('http://cdn.haba.usermd.net/os/background/bg.jpg');
  background-size: cover;
}
.login-form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 320px;
    height: 300px;
    background-color: rgba(243, 243, 243, 0.466);
    border-radius: 10px;
    box-shadow: 5px 5px 8px 3px rgba(53, 53, 53, 0.11);
}
.login-form__avatar{
    border-radius: 100%;
    width: 80px;
    height: 80px;
}
.login-form__avatar .img{
    border-radius: 100%;
    object-fit: cover;
}
.login-form__nick{
    font-size: 1rem;
    font-weight: bold;
    color: rgb(65, 65, 65);
    margin: 0.8rem 0;
}
.login-form__input{
    width: 180px;
    height: 35px;
    padding: 0 1rem;
    border:none;
    background-color: rgb(255, 255, 255);
    border-radius: 40px;
    color: rgb(0, 0, 0);
}
</style>