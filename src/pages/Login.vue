<template>
    <section class="container">
        <div class="login-form">
            <div class="login-form__avatar">
                <img class="img" src="http://cdn.haba.usermd.net/os/img/user.jpg" alt="">
            </div>
            <p class="login-form__nick">
                Admin - {{password}}
            </p>
            <input class="login-form__input" type="text" placeholder="Password" id="loginPassword" v-model="password"/>
            <button @click="login">Zaloguj</button>
        </div>
    </section>
</template>

<script>
import { db } from '../firebaseDB';
    export default {
        name: 'login',
        data(){
            return{
                password:''
            }
        },
        methods:{
            login(){
                this.checkPassword()
            },
            async checkPassword(){
                let status = false
                db.collection("admin").where("password", "==", this.password)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(() => {
                        status = true
                        this.$emit("authenticated", status);
                        sessionStorage.setItem('authenticated', status)
                        this.$router.replace({ name: "home" });
                    });
                        sessionStorage.setItem('authenticated', status)
                })
                .catch(() => {
                        this.$emit("authenticated", false);
                        sessionStorage.setItem('authenticated', false)
                });
            }
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