<template>
    <nav class="os-navbar">
      <ul class="os-container-navbar" v-if="allAppData">
        <navbarListItem class="os-navbar-item os-navbar-item--menu-start bg-theme" imgURL="http://cdn.haba.usermd.net/os/icons/rocket.svg" itemTitle="Start" @click="openStart = !openStart" app=""/>
        
        <menuStart v-show="openStart" :allAppData="allAppData"/>
        <li class="os-navbar-item bg-theme">
          <ul class="work-navbar work-navbar--pinned">
            <template v-for="app in allAppData" :key="app.id" >
              <navbarListItem :imgURL="app.iconURL" :itemTitle="app.title" :app="app.appName" :data-navbar-os-app="app.name" v-if="app.pinned == true"/>
            </template>
          </ul>
          <hr class="vertical-line">
          <ul class="work-navbar" id="navbarOpenApps">
          </ul>
        </li>
      </ul>
    </nav>
</template>

<script>
import navbarListItem from './navbarListItem'
import menuStart from './menu/menuStart'
    export default {
        props:['allAppData'],
        components:{
            navbarListItem,
            menuStart,
        },
        data(){
          return{
            openStart: false,
          }
        },
        
    }
</script>

<style scoped>

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
  background-image: url('http://cdn.haba.usermd.net/os/icons/rocket.svg');
}
.work-navbar{
  display: flex;
  height: 100%;
  padding: 0 10px;
}
</style>