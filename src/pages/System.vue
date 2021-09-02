<template>
  <main class='os-container'>
    <section class="os-main-window">
    </section>
    <bottomNavbar :allAppData="allAppData" v-if="allAppData.length"/>
    <getUserData />
    <validations />
  </main>
</template>

<script>
import { db } from '@/firebaseDB';
import getUserData from '@/components/system/getUserData.vue'
import validations from '@/app/components/validation.vue'
import bottomNavbar from '@/components/system/navbar/navbar.vue'
import {createUserData} from '@/components/system/createUserData.js'

export default {
  name: 'App',
  data(){
    return{
      allAppData:[]
    }
  },
  components: {
    getUserData,
    bottomNavbar,
    validations
  },
  methods:{
    getSystemAppDataFromDB(){
      let dbPathToSystem = db.collection('admin').doc('system')
      dbPathToSystem.collection('allApp').onSnapshot((snap)=>{
        this.allAppData = snap.docs.map(item => item.data())
      })
      
    },
    
        checkIfBrowserIsSetToDarkMode(){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark'
            }
        },
  },
  mounted(){
    createUserData.methods.createTreeData('admin')
    this.getSystemAppDataFromDB()
    this.emitter.emit('getUserData')
  }
}
</script>

<style scoped>
.os-container{
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('http://cdn.haba.usermd.net/os/background/bg.jpg');
  background-size: cover;
  display: grid;
  grid-template-rows:1fr 60px;
}
</style>
