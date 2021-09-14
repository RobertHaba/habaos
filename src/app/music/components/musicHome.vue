<template>
<section class="music app-container">
    <div class="music-container" draggable="true" ondragstart="event.preventDefault(); event.stopPropagation();">
        <headerComponent />
        <div class="music-wrapper scroll-hidden">
            <Recommended :getMusic="getMusicFromChild" :recommendedMusicDB="recommendedMusicFromDB" v-if="recommendedMusicFromDB.length" />
            <Favorite :getMusic="getMusicFromChild" :favoriteMusicDB="favoriteMusicFromDB" />
        </div>
        <MusicPlayer v-if="playerView" :songObject="musicToPlay" :playLists="playLists" :dbPlaylistsName="dbPlaylistsName" />

        <footer>
        </footer>
    </div>

</section>
</template>

<script>
import {
    db
} from '@/firebaseDB'
import headerComponent from '../../components/header.vue'
import Favorite from '../components/home/Favorite.vue'
import Recommended from '../components/home/Recommended.vue'
import MusicPlayer from '../components/musicPlayer.vue'
export default {
    name: 'Music Home',
    data() {
        return {
            playerView: false,
            musicToPlay: '',
            playLists: '',
            dbPlaylistsName: '',
            user: 'admin',
            recommendedMusicFromDB: [],
            favoriteMusicFromDB: []
        }
    },
    inject: ['account'],
    components: {
        Recommended,
        Favorite,
        MusicPlayer,
        headerComponent
    },
    methods: {
        getMusicFromChild(name, songs, dbName) {
            this.playerView = false
            setTimeout(() => {
                this.playerView = true
            }, 50)
            this.musicToPlay = name
            this.playLists = songs
            this.dbPlaylistsName = dbName
        },
        getMusicFromDB() {
            let musicDB = db.collection(this.account).doc('musicPlayer')
            musicDB.collection('dailyRecommended')
                .onSnapshot((querySnapshot) => {
                    this.recommendedMusicFromDB.length = 0
                    querySnapshot.forEach((doc) => {
                        this.recommendedMusicFromDB.push(doc.data())
                    })
                    console.log(this.recommendedMusicFromDB);
                })
            musicDB.collection('favorite')
                .onSnapshot((querySnapshot) => {
                    this.favoriteMusicFromDB.length = 0
                    querySnapshot.forEach((doc) => {
                        this.favoriteMusicFromDB.push(doc.data())
                    })
                })
        }
    },
    mounted() {
        this.getMusicFromDB()
    }

}
</script>

<style scoped>
.btn {
    border: none;
    border-radius: 100px;
    font-weight: bold;
    background-color: unset;
    transition: 0.5s ease background-color;
}

.icon {
    display: block;
    width: 1rem;
    height: 1rem;
    background-size: 100%;
}

.i-search {
    background-image: url('../assets/icons/search.svg');
}

.i-user {
    background-image: url('../assets/icons/user.svg');
}

.app-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding-top: 3rem;
    background-color: var(--bg-theme--app);
    color: var(--font-main-color);
    border-radius: 20px;
    transition: 0.5s ease all;
}

.music-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 1.5rem;
    padding-bottom: 2rem;
    width: 100%;
    height: 100%;
}

.music-container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-bottom: 2rem;
}

.header-nav-actions {
    display: flex;
}

.header-nav-actions__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 1rem;
    border-radius: 100px;
    background-color: var(--bg-theme--app-second);
}

.music-wrapper {
    height: calc(100% - 100px);
    overflow-y: auto;
}
</style>
