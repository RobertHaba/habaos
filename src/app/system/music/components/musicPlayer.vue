<template>
        <div class="music-player-wrapper" :class="{'music-player-wrapper--small':expand,'music-player-wrapper--dark':theme}" >
            <section class="music-player-container" :class="{'music-player-container--dark': theme == 'dark', 'animation-open':expand == false, 'animation-close': expand}">
            <header class="music-player-container-header">
                <div class="player-header-wrapper player-header-wrapper--info">
                    <h2 class="music-player-header-title">{{song.title}}</h2>
                    <h3 class="music-player-header-author">{{song.author}}</h3>
                </div>
                <div class="player-header-wrapper" >
                    <button class="music-player-button" @click="expandPlayer">
                        <span class="icon icon--arrow-down"></span>
                    </button>
                </div>
            </header>
            <div class="music-player-content">
                <div class="music-player-image">
                    <img :src="song.img" alt="">
                </div>
                <div class="music-player-timer">
                    <audio :src="song.url" type="audio/mpeg" id="audioPlayer"> </audio>

                    <input type="range" class="music-player-line" :style="'background-size: '+progressTime +'% 100%'" value='0'>
                    <div class="music-player-time-wrapper" >
                        <span class="music-player-time music-player-time--left">{{audioCurrentTime}}</span>
                        <span class="music-player-time music-player-time--song">{{audioDuration}}</span>
                    </div>
                </div>
                <div class="music-player-options">
                    <button @click="previousAudio()"><span class="icon icon--next icon--previous" ></span></button>
                    <PlayMusic ref="play"/>
                    <button @click="nextAudio()"><span class="icon icon--next"></span></button>
                </div>
                <div class="music-player-options music-player-options--others" >
                    <button @click="repeatAudio()"><span class="icon icon--repeat" :class="{'icon--circle icon--repeat-on': repeat == true}"></span></button>
                    <button @click="addToFavorites()"><span class="icon icon--heart" :class="{'icon--heart-full': favorite == true}"></span></button>
                    <button @click="shuffleAudio()"><span class="icon icon--shuffle" :class="{'icon--circle icon--shuffle-on': shuffle == true}"></span></button>
                </div>
                </div>
                <div class="music-player-lists-wrapper" >
                    <ul class="music-player-lists" >
                        <li class="player-list" v-for="music in playListSongs" :key="music.id" :class="{'player-list--active':song.id == music.id}" @click="getMusicFromList(music)">
                            <div class="player-list__img-container">
                                <img :src="music.img" :alt="'Okładka piosenki - ' + music.title + ' ' + music.author">
                            </div>
                            <div class="list-music-info">
                                <h3 class="list-music-info__title">{{music.title}}</h3>
                                <a class="list-music-info__author">{{music.author}}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <SmallMusicPlayer :music="song" :class="{'hidden':expand == false}"/> 
        </div>
</template>

<script>

import { db } from '../firebaseDB';
import SmallMusicPlayer from './player/SmallMusicPlayer'
import PlayMusic from './player/PlayMusic'
    export default {
        name:'player',
        data(){
            return{
                theme: this.themeColor,
                audioCurrentTime: '00:00',
                audioDuration:'',
                changeTime: false,
                repeat: false,
                favorite: false,
                favoriteSongs: '',
                shuffle: false,
                usedShuffle: undefined,
                song: this.songObject,
                playListSongs: this.playLists,
                expand:false,
                progressTime:0,
                playListBeforeShuffle: []
            }
        },
        components:{
            SmallMusicPlayer,
            PlayMusic,
        },
        props:{
            songObject:Object,
            themeColor: String,
            playLists: Array,
            dbPlaylistsName: String, 
        },
        methods:{
            musicEnded(audioPlayer){
                if(parseInt(this.song.id) + 1 !== this.playListSongs.length){
                    audioPlayer.addEventListener('ended', this.watchWhenMusicIsFinished)
                }
                else{
                    audioPlayer.removeEventListener('ended', this.watchWhenMusicIsFinished)
                }
            },
            watchWhenMusicIsFinished(){
                console.log('Obecna piosenka się skończyła, przełączanie na następną');
                if(!this.repeat){
                            this.nextAudio();
                }
            },
            getAudioCurrentTime(audioPlayer){
                audioPlayer.addEventListener('timeupdate',()=>{
                    let minutes = Math.floor(audioPlayer.currentTime / 60)
                    let seconds = Math.floor(audioPlayer.currentTime - minutes * 60)
                    let minuteValue = (minutes < 10)? '0' + minutes : minutes;
                    let secondValue = (seconds < 10)? '0' + seconds : seconds;
                    this.audioCurrentTime = minuteValue + ':' + secondValue
                    if(!this.changeTime){
                        this.updateTimeBar(audioPlayer)
                    }
                    
                })

            },
            updateTimeBar(audioPlayer){
                let timeBar = document.querySelector('.music-player-line')
                if(timeBar !== null && audioPlayer.duration !== 0 && audioPlayer.currentTime >= 1){
                    timeBar.value = 100 * (audioPlayer.currentTime/audioPlayer.duration)
                    this.progressTime = (100 * (audioPlayer.currentTime/audioPlayer.duration))
                }
                else{
                    if(timeBar !== null){
                        timeBar.value =0
                    }
                    this.progressTime = 0
                }
            },
            userChangeTime(){
                let audioPlayer = document.querySelector('#audioPlayer')
                let timeBar = document.querySelector('.music-player-line')
                let startEventType = 'mousedown'
                let endEventType = 'mouseup'
                if('ontouchstart' in document.documentElement){
                    startEventType = 'touchstart',
                    endEventType = 'touchend'
                }
                timeBar.addEventListener(startEventType,()=>{
                    this.changeTime = true
                })
                timeBar.addEventListener(endEventType,()=>{
                    audioPlayer.currentTime = (audioPlayer.duration/100) * timeBar.value
                    this.changeTime = false
                })
            },
            getAudioDuration(){
                let audioPlayer = document.querySelector('#audioPlayer')
                let time
                let watchChange = setInterval(()=>{
                    if(audioPlayer.src !== '' && !isNaN(audioPlayer.duration)){
                        time = audioPlayer.duration
                        clearInterval(watchChange)
                        let minutes = Math.floor(time/60)
                        let seconds = time - minutes * 60
                        let ret = minutes + ':' + (seconds < 10? "0": '');
                        ret+= ""+parseInt(seconds)
                        this.audioDuration = ret
                    }
                },50)
            },
            nextAudio(){
                console.log('Next song');
                this.repeat = false
                let lastSong = this.song
                this.song = ((parseInt(this.playListSongs.indexOf(this.song)) + 1) < this.playListSongs.length )?this.playListSongs[parseInt(this.playListSongs.indexOf(this.song)) + 1] : this.playListSongs[0]
                if(this.song.id == this.playLists[0].id && this.playLists[0].id==this.playListSongs[0].id  && this.usedShuffle){
                    console.log('test');
                    if(this.shuffle || lastSong.id !== this.song.id){
                        this.resetCurrentTime()
                    }
                }
                else{
                    this.resetCurrentTime()
                }
                this.playerOptions(true)
                    
            },
            previousAudio(){
                this.repeat = false
                this.song = ((parseInt(this.playListSongs.indexOf(this.song)) - 1) >= 0)? this.playListSongs[parseInt(this.playListSongs.indexOf(this.song)) - 1] : this.playListSongs[0]
                this.resetCurrentTime()
                this.playerOptions(true)
            },
            resetCurrentTime(){
                    let audioPlayer = document.querySelector('#audioPlayer')
                    audioPlayer.currentTime = 0
            },
            getMusicFromList(music){
                this.song = music
                this.resetCurrentTime()
                this.playerOptions(true)
            },
            repeatOption(){
                let audioPlayer = document.querySelector('#audioPlayer')
                        audioPlayer.currentTime = 0
                        setTimeout(()=>{
                            audioPlayer.play()
                        },150)
            },
            repeatAudio(){
                this.repeat = !this.repeat
                let audioPlayer = document.querySelector('#audioPlayer')
                
                if(this.repeat){
                    audioPlayer.addEventListener('ended',this.repeatOption,true)
                    console.log('On Repeat');
                }
                else{
                    audioPlayer.removeEventListener('ended', this.repeatOption,true)
                    console.log('Off Repeat');
                }
            },
            async addToFavorites(){
                this.song.favorite = true
                this.favorite = true
                let dbSong = db.collection('admin').doc('musicPlayer').collection(this.dbPlaylistsName)
                let dbFavorite = db.collection('admin').doc('musicPlayer').collection('favorite')
                console.log(dbSong);
                if(await this.seeIfItExistsFavorites(dbFavorite) == false){
                    let songObject = Object.assign(this.song, {'timestamp':+new Date}, {'mainPlaylist':this.dbPlaylistsName})
                    dbFavorite.doc().set(songObject)
                    console.log('Test');
                    await dbSong.doc(this.song.id).update({favorite:true})
                }
                else{
                    console.log('jest');
                    if(this.dbPlaylistsName != 'favorite'){
                        db.collection('admin').doc('musicPlayer').collection(this.dbPlaylistsName).doc(this.song.id).update({favorite:false})
                    }
                    else{
                        db.collection('admin').doc('musicPlayer').collection(this.song.mainPlaylist).doc(this.song.id).update({favorite:false})
                    }
                }
                
                
            },
            async seeIfItExistsFavorites(dbFavorite){
                console.log(dbFavorite);
                let snapshot = await dbFavorite.get()
                let status = false
                await snapshot.docs.map(doc => { 
                    console.log(doc.data().id);
                    console.log(this.song.id);
                    if(doc.data().id == this.song.id){
                        console.log('Jest taka piosenka');
                        status = true
                        doc.ref.delete()
                        this.song.favorite = false
                        this.favorite = false
                    }
                })
                return status
                
            },

            removeFromFavorites(){

            },
            shuffleAudio(){
                //Zmieniają się dwie tablice na random sort - zrobić fix
                this.shuffle = !this.shuffle
                this.usedShuffle = true
                let array = JSON.parse(JSON.stringify(this.playLists))
                this.playListBeforeShuffle = JSON.parse(JSON.stringify(this.playLists))
                if(this.shuffle){
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    array = array.filter(item => item.id !== this.song.id)
                    array.push(this.song)
                    this.playListSongs = array
                    
                }
                else{
                    this.usedShuffle = false
                    this.playListSongs = this.playListBeforeShuffle
                }
                // COŚ jest zbugowane przy przełączeniu piosenki czas zostaje z poprzedniej 
            },
            playerOptions(status){
                let audioPlayer = document.querySelector('#audioPlayer')
                this.favorite = this.song.favorite
                this.$refs.play.playAudio(status)
                this.userChangeTime()
                this.getAudioDuration()
                this.getAudioCurrentTime(audioPlayer)
                this.musicEnded(audioPlayer)
                this.scrollToActiveMusic()
            },
            expandPlayer(){
                let musicContainer = document.querySelector('.music-player-container')
                musicContainer.classList.add('animation-close')
                
                        setTimeout(()=>{
                            this.expand = !this.expand
                        },300)

            },
            scrollToActiveMusic(){
                setTimeout(()=>{
                let activeMusic = document.querySelector('.player-list--active')
                let previewMusicsContainer = document.querySelector('.music-player-lists')
                    previewMusicsContainer.scrollLeft = activeMusic.offsetLeft - (activeMusic.offsetWidth / 4) 
                },160)
            }


        },
        mounted() {
            this.playerOptions(true)
        },
    }
</script>

<style scoped>

.music-player-wrapper--dark .icon{
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
          filter: invert(100%);
}
.music-player-wrapper--dark .icon--default{
    -webkit-filter: invert(0%); /* safari 6.0 - 9.0 */
          filter: invert(0%);
}
.icon{
    display: block;
    width: 40px;
    height: 40px;
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;

}
.icon--circle{
    background-color: rgb(0, 0, 0);
    border-radius: 100px;
}
.icon--play{
    background-image: url('../assets/icons/play.svg');
}
.icon--pause{
    background-image: url('../assets/icons/pause.svg');
}
.icon--next{
    background-image: url('../assets/icons/next.svg');
}
.icon--previous{
    transform: rotate(180deg);
}
.icon--repeat{    
    background-image: url('../assets/icons/repeat.svg');
}
.icon--repeat-on{    
    background-image: url('../assets/icons/repeat-on.svg');
}
.icon--shuffle{    
    background-image: url('../assets/icons/random.svg');
}
.icon--shuffle-on{    
    background-image: url('../assets/icons/random-on.svg');
}
.icon--heart{    
    background-image: url('../assets/icons/heart.svg');
}
.icon--heart-full{    
    background-image: url('../assets/icons/heart-full.svg');
}
.icon--arrow-down{    
    background-image: url('../assets/icons/arrow-down.svg');
}
@keyframes openFromRightToLeft {
    0%{
        display: none;
        opacity: 0;
        left: 100%;
    }
    1%{
        display: block;
    }
    100%{
        opacity: 1;
        left:0;
    }
}
@keyframes openFromLeftToRight {
    0%{
        opacity: 1;
        left: 0%;
    }
    99%{
        opacity: 0;
        position: absolute;
        display: block;
        left:100%;
    }
    100%{
        opacity: 0;
        display: none;
        left:100%;
    }
}

.music-player-wrapper{
    position: absolute;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem;
    border-radius: 20px;
    overflow-x: hidden;
}
.music-player-wrapper--small{
    position: absolute;
    height: 50px;
    bottom: 0;
    padding: 0;
    border-radius: 0;
}
.music-player-container{
    position: relative;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #FFF;
    transition: 0.5s ease all;
}
.music-player-container--dark{
    z-index: 1;
    background-color: #22252D;
    color: #FFF;
}
.music-player-container-header{
    display: flex;
    justify-content: space-between;

}
.player-header-wrapper{
    height: 100%;
}
.player-header-wrapper--info{
    width: 100%;
}
.music-player-header-title{
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}
.music-player-header-author{
    opacity: 0.8;
    font-weight: 500;
    font-size: 0.9rem;
}
.music-player-content{
    padding-top: 2rem;
}
.music-player-image{
    width: 100%;
    height: 220px;
    box-shadow: 8px 8px 16px -2px rgba(163, 163, 163, 0.192);
    border-radius: 15px;
}
.music-player-image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}


.music-player-progress-bar{
    position: relative;
    width: 100%;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.603);
    border-radius: 10px;
}
.music-player-progress-bar-wrapper{
    overflow: hidden;
    border-radius: 10px;
}
.music-progress-bar-line{
    height: 6px;
    width: 100%;
    transform: translate(-95%);
    background-color: rgb(6, 104, 196);
    border-radius: 10px;
}
.music-player-progress-bar__button{
    position: absolute;
    width: 12px;
    height: 12px;
    margin-top: -9px;
    margin-left: -9px;
    background-color: rgb(6, 104, 196);
    border-radius: 100px;
}
.music-player-time-wrapper{
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
}
.music-player-time{
    font-size: 0.7rem;
    opacity: 0.8;
    
}
.music-player-options{
    display: flex;
    justify-content: space-around;
}
.music-player-options--others{
    margin: 1rem 0;
}
.music-player-options--others{
    opacity: 0.8;
}
.music-player-lists-wrapper{
    width: 100%;
}
.music-player-lists{
    display: flex;
    position: relative;
    align-items: flex-end;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 0.5rem 0;
}
.player-list{
    display: flex;
    align-items: center;
    min-width: 180px;
    width: 180px;
    height: 60px;
    padding: 0.5rem;
    margin-right: 0.5rem;
    background-color: rgba(214, 214, 214, 0.082);
    border-radius: 5px;
    cursor: pointer;
}

.player-list--active, .player-list:hover{
    border-radius: 15px;
    background-color: rgba(214, 214, 214, 0.158);
    transition: 0.3s ease all;
}
.player-list__img-container{
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
}
.player-list__img-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}
.player-list--active img{
    border-radius: 100px;
}
.list-music-info{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.list-music-info__title{
    font-size: 0.7rem;
    margin-bottom: 0.1rem;
}
.list-music-info__author{
    font-size: 0.6rem;
}
.hidden{
    display: none;
}

.animation-open{
    animation: 0.3s cubic-bezier(.42,0,1,1) openFromRightToLeft forwards;
}
.animation-close{
    animation: 0.2s cubic-bezier(.42,0,1,1) openFromLeftToRight forwards;
}

.music-player-line{
    position: relative;
    width: 100%;
    margin-top: 2rem;
    border-radius: 10px;
    
}
 
</style>