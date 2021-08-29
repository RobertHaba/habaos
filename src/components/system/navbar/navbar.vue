<template>
    <nav class="os-navbar">
      <ul class="os-container-navbar">
        <navbarListItem class="os-navbar-item os-navbar-item--menu-start bg-theme" imgURL="http://cdn.haba.usermd.net/os/icons/rocket.svg" itemTitle="Start" @click="openStart = !openStart" app=""/>
        
        <menuStart v-show="openStart"/>
        <li class="os-navbar-item bg-theme">
          <ul class="work-navbar work-navbar--pinned">
            <template v-for="app in navbarListPinedApps" :key="app.id">
              <navbarListItem :imgURL="app.iconURL" :itemTitle="app.title" :app="app.name" :data-navbar-os-app="app.name"/>
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
import menuStart from './menuStart'
    export default {
        components:{
            navbarListItem,
            menuStart,
        },
        data(){
          return{
            openStart: false,
            navbarListPinedApps:[
              {
                id:0,
                title:'Calcualtor',
                name:'calculator',
                iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calculator.svg"
              },
              {
                id:1,
                title:'Music',
                name:'music',
                iconURL:"http://cdn.haba.usermd.net/os/icons/apps/music.svg"
              },
              {
                id:2,
                title:'Weather',
                name:'weather',
                iconURL:"http://cdn.haba.usermd.net/os/icons/apps/weather.svg"
              },
              {
                id:3,
                title:'Calendar',
                name:'calendar',
                iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calendar.svg"
              },
              {
                id:4,
                title:'Bookmarks',
                name:'bookmark',
                iconURL:"http://cdn.haba.usermd.net/os/icons/apps/bookmark.svg"
              },
            ],
            navbarListOpenApps:[]
          }
        },
        methods:{
          moveToOpenNavbarList(){
          }
        }
        
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