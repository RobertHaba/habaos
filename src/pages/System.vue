<template>
  <main class='os-container'>
    <section class="os-main-window" @click="openStart = false">
    </section>
    <nav class="os-navbar">
      <ul class="os-container-navbar">
            <workListItem class="os-navbar-item os-navbar-item--menu-start bg-theme" imgURL="http://cdn.haba.usermd.net/os/icons/rocket.svg" itemTitle="Start" @click="openStart = !openStart" app=""/>
        
          <menuStart :class="{'menu-hidden': !openStart}"/>
        <li class="os-navbar-item bg-theme">
          <ul class="work-navbar work-navbar--pinned">
            <workListItem imgURL="http://cdn.haba.usermd.net/os/icons/calculator.svg" itemTitle="Kalkulator" app="calculator"/>
            <workListItem imgURL="http://cdn.haba.usermd.net/os/icons/music.svg" itemTitle="Muzyka" app="music"/>
          </ul>
          <hr class="vertical-line">
          <ul class="work-navbar">
            <workListItem imgURL="http://cdn.haba.usermd.net/os/icons/weather.svg" itemTitle="Pogoda" app="weather"/>
            <workListItem imgURL="http://cdn.haba.usermd.net/os/icons/calendar.svg" itemTitle="Kalendarz" app="calendar"/>
            <workListItem imgURL="http://cdn.haba.usermd.net/os/icons/apps/bookmark.svg" itemTitle="Menadżer zakładek" app="bookmark"/>
          </ul>
        </li>
      </ul>
    </nav>
    <getUserData />
    <validations />
  </main>
</template>

<script>
import getUserData from '@/components/system/getUserData.vue'
import validations from '@/components/system/validation.vue'
import workListItem from '../components/navbar/workListItem'
import menuStart from '../components/navbar/menuStart'

export default {
  name: 'App',
  components: {
    getUserData,
    workListItem,
    menuStart,
    validations
  },
  data(){
    return{
      openStart: false,
      
    }
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
.os-navbar{
  position: relative;
  width: calc(100% - 20px);
  height: 50px;
  margin: 0 auto;
  z-index: 9999;
}
.os-container-navbar{
  display: flex;
  width: 100%;
  height: 100%;
}
.os-navbar-item{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.os-navbar-item--menu-start{
  justify-content: center;
  width: 50px;
  margin-right: 10px;
}
.os-navbar-icon-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  border-radius: 10px;
}
.os-navbar-icon{
  display: block;
  height: 25px;
  width: 25px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
} 
.os-navbar-icon--menu-start{
  background-image: url('../assets/icons/os/rocket.svg');
}
.work-navbar{
  display: flex;
  height: 100%;
  padding: 0 10px;
}
.menu-hidden{
  display: none;
}
</style>
