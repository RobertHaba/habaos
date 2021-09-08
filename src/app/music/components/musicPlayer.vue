<template>
<div class="music-player-wrapper" :class="{'music-player-wrapper--small':expand}">
    <section class="music-player-container" :class="{'animation-open':expand == false, 'animation-close': expand}">
        <header class="music-player-container-header">
            <div class="player-header-wrapper player-header-wrapper--info">
                <h2 class="music-player-header-title">{{song.title}}</h2>
                <h3 class="music-player-header-author">{{song.author}}</h3>
            </div>
            <div class="player-header-wrapper">
                <button class="music-player-button" @click="expandPlayer">
                    <span class="icon icon--reverse-color icon--arrow-down"></span>
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
                <div class="music-player-time-wrapper">
                    <span class="music-player-time music-player-time--left">{{audioCurrentTime}}</span>
                    <span class="music-player-time music-player-time--song">{{audioDuration}}</span>
                </div>
            </div>
            <div class="music-player-options">
                <button @click="previousAudio()"><span class="icon icon--reverse-color icon--next icon--previous"></span></button>
                <PlayMusic ref="play" />
                <button @click="nextAudio()"><span class="icon icon--reverse-color icon--next"></span></button>
            </div>
            <div class="music-player-options music-player-options--others">
                <button @click="repeatAudio()"><span class="icon icon--reverse-color icon--repeat" :class="{'icon--circle icon--repeat-on': repeat == true}"></span></button>
                <button @click="addToFavorites()"><span class="icon icon--reverse-color icon--heart" :class="{'icon--heart-full': favorite == true}"></span></button>
                <button @click="shuffleAudio()"><span class="icon icon--reverse-color icon--shuffle" :class="{'icon--circle icon--shuffle-on': shuffle == true}"></span></button>
            </div>
        </div>
        <div class="music-player-lists-wrapper">
            <ul class="music-player-lists scroll">
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
    <SmallMusicPlayer :music="song" :class="{'hidden':expand == false}" />
</div>
</template>

<script>
import {
    db
} from '@/firebaseDB';
import SmallMusicPlayer from './player/SmallMusicPlayer'
import PlayMusic from './player/PlayMusic'
export default {
    name: 'player',
    data() {
        return {
            audioCurrentTime: '00:00',
            audioDuration: '',
            changeTime: false,
            repeat: false,
            favorite: false,
            favoriteSongs: '',
            shuffle: false,
            usedShuffle: undefined,
            song: this.songObject,
            playListSongs: this.playLists,
            expand: false,
            progressTime: 0,
            playListBeforeShuffle: []
        }
    },
    components: {
        SmallMusicPlayer,
        PlayMusic,
    },
    props: {
        songObject: Object,
        playLists: Array,
        dbPlaylistsName: String,
    },
    inject: ['account'],
    methods: {
        musicEnded(audioPlayer) {
            if (parseInt(this.song.id) + 1 !== this.playListSongs.length) {
                audioPlayer.addEventListener('ended', this.watchWhenMusicIsFinished)
            } else {
                audioPlayer.removeEventListener('ended', this.watchWhenMusicIsFinished)
            }
        },
        watchWhenMusicIsFinished() {
            if (!this.repeat) {
                this.nextAudio();
            }
        },
        getAudioCurrentTime(audioPlayer) {
            audioPlayer.addEventListener('timeupdate', () => {
                let minutes = Math.floor(audioPlayer.currentTime / 60)
                let seconds = Math.floor(audioPlayer.currentTime - minutes * 60)
                let minuteValue = (minutes < 10) ? '0' + minutes : minutes;
                let secondValue = (seconds < 10) ? '0' + seconds : seconds;
                this.audioCurrentTime = minuteValue + ':' + secondValue
                if (!this.changeTime) {
                    this.updateTimeBar(audioPlayer)
                }

            })

        },
        updateTimeBar(audioPlayer) {
            let timeBar = document.querySelector('.music-player-line')
            if (timeBar !== null && audioPlayer.duration !== 0 && audioPlayer.currentTime >= 1) {
                timeBar.value = 100 * (audioPlayer.currentTime / audioPlayer.duration)
                this.progressTime = (100 * (audioPlayer.currentTime / audioPlayer.duration))
            } else {
                if (timeBar !== null) {
                    timeBar.value = 0
                }
                this.progressTime = 0
            }
        },
        userChangeTime() {
            let audioPlayer = document.querySelector('#audioPlayer')
            let timeBar = document.querySelector('.music-player-line')
            let startEventType = 'mousedown'
            let endEventType = 'mouseup'
            if ('ontouchstart' in document.documentElement) {
                startEventType = 'touchstart',
                    endEventType = 'touchend'
            }
            timeBar.addEventListener(startEventType, () => {
                this.changeTime = true
            })
            timeBar.addEventListener(endEventType, () => {
                audioPlayer.currentTime = (audioPlayer.duration / 100) * timeBar.value
                this.changeTime = false
            })
        },
        getAudioDuration() {
            let audioPlayer = document.querySelector('#audioPlayer')
            let time
            let watchChange = setInterval(() => {
                if (audioPlayer.src !== '' && !isNaN(audioPlayer.duration)) {
                    time = audioPlayer.duration
                    clearInterval(watchChange)
                    let minutes = Math.floor(time / 60)
                    let seconds = time - minutes * 60
                    let ret = minutes + ':' + (seconds < 10 ? "0" : '');
                    ret += "" + parseInt(seconds)
                    this.audioDuration = ret
                }
            }, 50)
        },
        nextAudio() {
            this.repeat = false
            let lastSong = this.song
            this.song = ((parseInt(this.playListSongs.indexOf(this.song)) + 1) < this.playListSongs.length) ? this.playListSongs[parseInt(this.playListSongs.indexOf(this.song)) + 1] : this.playListSongs[0]
            if (this.song.id == this.playLists[0].id && this.playLists[0].id == this.playListSongs[0].id && this.usedShuffle) {
                if (this.shuffle || lastSong.id !== this.song.id) {
                    this.resetCurrentTime()
                }
            } else {
                this.resetCurrentTime()
            }
            this.playerOptions(true)

        },
        previousAudio() {
            this.repeat = false
            this.song = ((parseInt(this.playListSongs.indexOf(this.song)) - 1) >= 0) ? this.playListSongs[parseInt(this.playListSongs.indexOf(this.song)) - 1] : this.playListSongs[0]
            this.resetCurrentTime()
            this.playerOptions(true)
        },
        resetCurrentTime() {
            let audioPlayer = document.querySelector('#audioPlayer')
            audioPlayer.currentTime = 0
        },
        getMusicFromList(music) {
            this.song = music
            this.resetCurrentTime()
            this.playerOptions(true)
        },
        repeatOption() {
            let audioPlayer = document.querySelector('#audioPlayer')
            audioPlayer.currentTime = 0
            setTimeout(() => {
                audioPlayer.play()
            }, 150)
        },
        repeatAudio() {
            this.repeat = !this.repeat
            let audioPlayer = document.querySelector('#audioPlayer')

            if (this.repeat) {
                audioPlayer.addEventListener('ended', this.repeatOption, true)
            } else {
                audioPlayer.removeEventListener('ended', this.repeatOption, true)
            }
        },
        async addToFavorites() {
            let dbRecommended = db.collection(this.account).doc('musicPlayer').collection('dailyRecommended')
            let dbFavorite = db.collection(this.account).doc('musicPlayer').collection('favorite')
            if (await this.seeIfItExistsFavorites(dbFavorite) == false) {
                    this.song.favorite = true
                    this.favorite = true
                    let songObject = Object.assign(this.song, {
                        'timestamp': +new Date
                    }, {
                        'mainPlaylist': this.dbPlaylistsName
                    })
                    dbFavorite.doc(this.song.id).set(songObject)
                    await dbRecommended.doc(this.song.id).update({
                        favorite: true
                    })
            } else {
                   dbRecommended.doc(this.song.id).update({
                        favorite: false
                    })
                    dbFavorite.doc(this.song.id).delete()
                this.song.favorite = false
                this.favorite = false
            }// naprawić wysyłanie ulubionych

        },
        async seeIfItExistsFavorites(dbFavorite) {
            let snap = await dbFavorite.doc(this.song.id).get()
            let status = await snap.exists
            return await status
        },
        shuffleAudio() {
            this.shuffle = !this.shuffle
            this.usedShuffle = true
            let array = JSON.parse(JSON.stringify(this.playLists))
            this.playListBeforeShuffle = JSON.parse(JSON.stringify(this.playLists))
            if (this.shuffle) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                array = array.filter(item => item.id !== this.song.id)
                array.push(this.song)
                this.playListSongs = array

            } else {
                this.usedShuffle = false
                this.playListSongs = this.playListBeforeShuffle
            }
        },
        playerOptions(status) {
            let audioPlayer = document.querySelector('#audioPlayer')
            this.favorite = this.song.favorite
            this.$refs.play.playAudio(status)
            this.userChangeTime()
            this.getAudioDuration()
            this.getAudioCurrentTime(audioPlayer)
            this.musicEnded(audioPlayer)
            this.scrollToActiveMusic()
        },
        expandPlayer() {
            let musicContainer = document.querySelector('.music-player-container')
            musicContainer.classList.add('animation-close')

            setTimeout(() => {
                this.expand = !this.expand
            }, 300)

        },
        scrollToActiveMusic() {
            setTimeout(() => {
                let activeMusic = document.querySelector('.player-list--active')
                let previewMusicsContainer = document.querySelector('.music-player-lists')
                previewMusicsContainer.scrollLeft = activeMusic.offsetLeft - (activeMusic.offsetWidth / 4)
            }, 160)
        }

    },
    mounted() {
        document.querySelector('audio').volume = localStorage.getItem('audioVolume')
        this.playerOptions(true)
    },
}
</script>

<style scoped>
.icon {
    display: block;
    width: 40px;
    height: 40px;
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;

}

.icon--circle {
    background-color: var(--bg-theme--app-second);
    border-radius: 100px;
}

.icon--play {
    background-image: url('../assets/icons/play.svg');
}

.icon--pause {
    background-image: url('../assets/icons/pause.svg');
}

.icon--next {
    background-image: url('../assets/icons/next.svg');
}

.icon--previous {
    transform: rotate(180deg);
}

.icon--repeat {
    background-image: url('../assets/icons/repeat.svg');
}

.icon--repeat-on {
    background-image: url('../assets/icons/repeat-on.svg');
}

.icon--shuffle {
    background-image: url('../assets/icons/random.svg');
}

.icon--shuffle-on {
    background-image: url('../assets/icons/random-on.svg');
}

.icon--heart {
    background-image: url('../assets/icons/heart.svg');
}

.icon--heart-full {
    background-image: url('../assets/icons/heart-full.svg');
}

.icon--arrow-down {
    background-image: url('../assets/icons/arrow-down.svg');
}

@keyframes openFromRightToLeft {
    0% {
        display: none;
        opacity: 0;
        left: 100%;
    }

    1% {
        display: block;
    }

    100% {
        opacity: 1;
        left: 0;
    }
}

@keyframes openFromLeftToRight {
    0% {
        opacity: 1;
        left: 0%;
    }

    99% {
        opacity: 0;
        position: absolute;
        display: block;
        left: 100%;
    }

    100% {
        opacity: 0;
        display: none;
        left: 100%;
    }
}

.music-player-wrapper {
    position: absolute;
    top: -3rem;
    left: 0;
    width: 100%;
    max-width: 330px;
    height: 650px;
    padding: 3rem 1.5rem;
    border-radius: 20px;
    overflow-x: hidden;
}

.music-player-wrapper--small {
    position: absolute;
    height: 50px;
    top: inherit;
    bottom: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.music-player-container {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: var(--bg-theme--app);
    color: var(--font-main-color);
    transition: 0.5s ease all;
}

.music-player-container-header {
    display: flex;
    justify-content: space-between;

}

.player-header-wrapper {
    height: 100%;
}

.player-header-wrapper--info {
    width: 100%;
}

.music-player-header-title {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

.music-player-header-author {
    opacity: 0.8;
    font-weight: 500;
    font-size: 0.9rem;
}

.music-player-content {
    padding-top: 2rem;
}

.music-player-image {
    width: 100%;
    height: 220px;
    box-shadow: 8px 8px 16px -2px rgba(163, 163, 163, 0.192);
    border-radius: 15px;
}

.music-player-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.music-player-progress-bar {
    position: relative;
    width: 100%;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.603);
    border-radius: 10px;
}

.music-player-progress-bar-wrapper {
    overflow: hidden;
    border-radius: 10px;
}

.music-player-progress-bar__button {
    position: absolute;
    width: 12px;
    height: 12px;
    margin-top: -9px;
    margin-left: -9px;
    background-color: rgb(6, 104, 196);
    border-radius: 100px;
}

.music-player-time-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
}

.music-player-time {
    font-size: 0.7rem;
    opacity: 0.8;

}

.music-player-options {
    display: flex;
    justify-content: space-around;
}

.music-player-options--others {
    margin: 1rem 0;
}

.music-player-options--others {
    opacity: 0.8;
}

.music-player-lists-wrapper {
    width: 100%;
}

.music-player-lists {
    display: flex;
    position: relative;
    align-items: flex-end;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 0.5rem 0;
}

.player-list {
    display: flex;
    align-items: center;
    min-width: 180px;
    width: 180px;
    height: 60px;
    padding: 0.5rem;
    margin-right: 0.5rem;
    background-color: var(--bg-theme--app-second);
    border-radius: 5px;
    cursor: pointer;
}

.player-list--active,
.player-list:hover {
    border-radius: 15px;
    background-color: var(--bg-theme--app-hover);
    transition: 0.3s ease all;
}

.player-list__img-container {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
}

.player-list__img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

.player-list--active img {
    border-radius: 100px;
}

.list-music-info {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.list-music-info__title {
    font-size: 0.7rem;
    margin-bottom: 0.1rem;
}

.list-music-info__author {
    font-size: 0.6rem;
}

.hidden {
    display: none;
}

.animation-open {
    animation: 0.3s cubic-bezier(.42, 0, 1, 1) openFromRightToLeft forwards;
}

.animation-close {
    animation: 0.2s cubic-bezier(.42, 0, 1, 1) openFromLeftToRight forwards;
}

.music-player-line {
    position: relative;
    width: 100%;
    margin-top: 2rem;
    border-radius: 10px;

}
</style>
