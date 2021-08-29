<template>
  <main class='os-container'>
    <section class="os-main-window">
    </section>
    <bottomNavbar />
    <getUserData />
    <validations />
  </main>
</template>

<script>
import getUserData from '@/components/system/getUserData.vue'
import validations from '@/app/components/validation.vue'
import bottomNavbar from '@/components/system/navbar/navbar.vue'

export default {
  name: 'App',
  components: {
    getUserData,
    bottomNavbar,
    validations
  },
  mounted(){
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
