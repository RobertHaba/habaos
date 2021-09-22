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
import getUserData from '@/components/system/settings/systemGetUserData.vue'
import validations from '@/app/components/validation.vue'
import bottomNavbar from '@/components/system/navbar/navbar.vue'

export default {
    name: 'App',
    data() {
        return {
            allAppData: [],
            showStartMenu: false,
            account: '',
            userThemeID:'',
            userData:''
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
            this.userData = res.data()
            this.userThemeID = (res.data().theme == 'light')?1:0
            this.checkIfUserExistInLocalStorage()
          })
        },
        checkIfBrowserIsSetToDarkMode() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark'
            }
        },
        checkIfUserExistInLocalStorage(){
            let membersStorage = JSON.parse(localStorage.getItem('memberUsers'))
            let activeSessionEmail = sessionStorage.getItem('email')
            let activeMember
            if(Array.isArray(membersStorage)){
                activeMember = membersStorage.find(member => member.email.toLowerCase() == activeSessionEmail.toLowerCase())
            }
            else if(membersStorage !== null){
                activeMember = (membersStorage.email.toLowerCase() == activeSessionEmail.toLowerCase())?true:undefined
            }
            else if(membersStorage == null){
                membersStorage = []
            }
            if(activeMember == undefined){
                    this.addUserToMemberStorage(activeSessionEmail,membersStorage)
                }
        },
        addUserToMemberStorage(activeSessionEmail,membersStorage){
            let memberObject = {
                email:activeSessionEmail,
                avatarSrc:this.userData.avatar,
                name:this.userData.name
            }
            if(!Array.isArray(membersStorage)){
                membersStorage = [membersStorage]
            }
            membersStorage.unshift(memberObject)
            localStorage.setItem('memberUsers',JSON.stringify(membersStorage))
        }
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
    background-image: url('https://cdn.haba.usermd.net/os/background/bg.jpg');
    background-size: cover;
    display: grid;
    grid-template-rows: 1fr 60px;
}
</style>
