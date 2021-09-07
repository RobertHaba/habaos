<template>
<main class='os-container'>
    <section class="os-main-window" @click="closeStartMenu()">
    </section>
    <bottomNavbar :allAppData="allAppData" v-if="allAppData.length" :showStartMenu="showStartMenu" />
    <getUserData />
    <validations />
</main>
</template>

<script>
import {db} from '@/firebaseDB';
import getUserData from '@/components/system/getUserData.vue'
import validations from '@/app/components/validation.vue'
import bottomNavbar from '@/components/system/navbar/navbar.vue'

export default {
    name: 'App',
    data() {
        return {
            allAppData: [],
            showStartMenu: false,
            account: '',
            userThemeID:''
        }
    },
    components: {
        getUserData,
        bottomNavbar,
        validations
    },
    methods: {
        getSystemAppDataFromDB() {
            this.account = sessionStorage.getItem('uid')
            let dbPathToSystem = db.collection(this.account).doc('system')
            dbPathToSystem.collection('allApp').onSnapshot((snap) => {
                this.allAppData = snap.docs.map(item => item.data())
            })

        },
        closeStartMenu() {
            this.showStartMenu = !this.showStartMenu
        },
        getUserTheme(){
          db.collection(this.account).doc('user').get()
          .then((res)=>{
            console.log(this.themeID);
            console.log(res.data().theme);
            this.userThemeID = (res.data().theme == 'light')?1:0
          })
        },
        checkIfBrowserIsSetToDarkMode() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark'
            }
        },
    },
    provide(){
      let themeID = {}
      Object.defineProperty(themeID,'userThemeID',{
        enumerable:true,
        get:()=>this.userThemeID
      })
      return{
        account: sessionStorage.getItem('uid'),
        themeID
      }
    },
    mounted() {
        this.getSystemAppDataFromDB()
        this.getUserTheme()
        this.emitter.emit('getUserData')
    }
}
</script>

<style scoped>
.os-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('http://cdn.haba.usermd.net/os/background/bg.jpg');
    background-size: cover;
    display: grid;
    grid-template-rows: 1fr 60px;
}
</style>
