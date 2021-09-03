<template>
    <main class="register">
        <section class="register__layout">
            <div class="register-header">
                <h1 class="register-header__title">
                    Let's configurate your system account
                </h1>
                <div class="register-header__logo-container">
                    <div class="logo-column">
                        <h2 class="logo-title">Rocket<span class="logo-red">OS</span></h2>
                        <h3 class="logo-version">Falcon<span class="logo-red">One</span></h3>
                    </div>
                    <div class="logo-column logo-column--icon">
                        <span class="icon icon--logo">

                        </span>
                    </div>
                </div>
            </div>
            <div class="register-content">
                <componentForm />
                <div class="register-content__news">

                </div>
            </div>
            <label>Login</label><input type="text" v-model="userData.login">
<label>Password</label><input type="text" v-model="userData.password" @keyup="validatePassword">
<button @click="checkIfLoginExists"> SEND </button>
        </section>
    </main>
</template>

<script>
import { db } from '@/firebaseDB';
import componentForm from '@/components/register/componentForm';
    export default {
        name:'Login',
        components:{
            componentForm
        },
        data(){
            return{
                userData:{
                    login:'',
                    password:''
                },
            }
        },
        methods:{
            checkIfLoginExists(){
                db.collection(this.userData.login).get()
                .then((res)=>{
                    console.log(res);
                })
            },
            validatePassword(){
                let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                console.log(regularExpression.test(this.userData.password));
            }
        }
    }
</script>

<style scoped>
.register{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    color:#FFF;
    background-color: var(--register-main-color);
}
.register__layout{
    max-width: 1400px;
    padding: 6rem;
}
.register-header{
    display: grid;
    grid-template-columns: 8fr 4fr;
    margin-bottom: 6rem;

}
.register-header__title{
    font-size: 3rem;
}
.register-header__logo-container{
    display: flex;
    justify-content: flex-end;
    height: 60px;
}
.logo-column{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-right: 0.5rem;
}
.logo-column--icon{
    align-items: center;
    justify-content: center;
    margin: 0;
}
.logo-title{
    font-size: 1.8rem;
}
.logo-version{
    width: 120px;
    padding: 0.1rem 0;
    text-align: center;
    color:var(--register-main-color);
    background-color: #FFF;
    border-radius: 100px;
}
.logo-red{
    color: var(--register-second-color);
}
.icon--logo{
    width: 45px;
    height: 45px;
}
.register-content{
    display: grid;
    grid-template-columns: 330px 1fr;
    grid-gap: 6rem;
}
</style>