<template>
    <div class="music container" :class="'container--' + theme">
        <div class="app-container">
            <section class="music-container" :class="'music-container--' + theme" >
            <header class="music-container-header">
                <h2 class="header-title">Hi, {{user}}!</h2>
                <ul class="header-nav-actions">
                    <li class="header-nav-actions__item header-nav-actions__item--avatar">
                        <button class="btn"><span class="icon icon--default i-user"></span></button>
                    </li>
                </ul>
            </header>
            <div class="music-wrapper">
                <Recommended :getMusic="getMusicFromChild"/>
                <Favorite :getMusic="getMusicFromChild"/>
            </div>
            <footer>
            </footer>
            </section>
            <MusicPlayer v-if="playerView" :songObject="musicToPlay" :playLists="playLists" :themeColor="theme" :dbPlaylistsName="dbPlaylistsName"/>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import Favorite from '../components/home/Favorite.vue'
import Recommended from '../components/home/Recommended.vue'
import MusicPlayer from '../components/musicPlayer.vue'
    export default {
        name:'Music Home',
        data(){
            return{
                theme: 'dark',
                playerView: false,
                musicToPlay:'',
                playLists:'',
                fireBase:'',
                dbPlaylistsName:'',
                user:'admin'
            }
        },
        components:{
            Recommended,
            Favorite,
            MusicPlayer,
        },
        methods:{
            getMusicFromChild(name, songs, dbName){
                this.playerView = false
                setTimeout(()=>{
                    this.playerView = true
                },50)
                this.musicToPlay = name
                this.playLists = songs
                this.dbPlaylistsName = dbName
            },
            getDataFromFireBase(){
                this.firebase = db

            }
        },
        mounted() {
            this.getDataFromFireBase()
        },
    }
</script>
<style scoped>

.btn{
    border:none;
    border-radius: 100px;
    font-weight: bold;
    background-color: unset;
    transition: 0.5s ease background-color;
}
.icon{
    display: block;
    width: 1rem;
    height: 1rem;
    background-size: 100%;
}
.i-search{
    background-image: url('../assets/icons/search.svg');
}
.i-user{
    background-image: url('../assets/icons/user.svg');
}
.container--dark .icon{
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
          filter: invert(100%);
}
.container--dark .icon--default{
    -webkit-filter: invert(0%); /* safari 6.0 - 9.0 */
          filter: invert(0%);
}
.container{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: 0.5s ease all;
  color: #445b77;
  border-radius: 20px;
}
.container--dark{
    background-color: #373b49;
}
.app-container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
}
.music-container{
    position: relative;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem;
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.music-container--dark{
    background-color: #22252D;
    color: #FFF;
}
.music-container-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-bottom: 2rem;
}
.header-nav-actions{
    display: flex;
}
.header-nav-actions__item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 1rem;
    border:1px solid rgba(255, 255, 255, 0.493);
    border-radius: 100px;
}
.header-nav-actions__item--avatar{
    background-color: rgba(230, 230, 230, 0.068);
    border:1px solid rgba(230, 230, 230, 0);
}
.music-wrapper{
    height: calc(100% - 100px);
    padding-right: 0.5rem;
    overflow-y:auto;
}
</style>