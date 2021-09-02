<template>
    <div class="favorite" v-if="favoriteSongs !== ''">
        <div class="favorite-header">
            <h3 class="favorite-header__title">Favorite</h3>
            <button class="favorite-header__button">See all</button>
        </div>
        <ul class="favorite-list">
            <li class="favorite-list__item" v-on:click="getMusic(song,favoriteSongs, 'favorite')" aria-label="" v-for="song in favoriteSongs.slice(0,3)" :key="song.id" >
                <div class="music-disc-icon">
                    <img :src="song.img" :alt="'Okładka piosenki - ' + song.title + ' ' + song.author">
                </div>
                <div class="music-info">
                    <h4 class="music-info__title">{{song.title}}</h4>
                    <p class="music-info__author">{{song.author}}</p>
                </div>
            </li>
            <p class="favorite-text" v-if="favoriteSongs == ''">
                Aktualnie nie posiadasz ulubionych kawałków, dodaj piosenki do ulubionych i słuchaj ich kiedy chcesz!
            </p>
        </ul>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
    export default {
        name:'Favorite',
        data(){
            return{
                favoriteSongs:''
            }
        },
        props:{
            getMusic: Function,
        },
        methods:{
            async getDataFromFireBase(){
                let snapshot = await db.collection('admin').doc('musicPlayer').collection('favorite').orderBy('timestamp').get()
                this.favoriteSongs = snapshot.docs.map(doc => doc.data())
            }
        },
        mounted() {
            this.getDataFromFireBase()
        },
    }
</script>

<style scoped>
.favorite{
    padding: 2rem 0;
}
.favorite-header{
    display: flex;
    justify-content: space-between;
}
.favorite-header__title{
    opacity: 0.8;
}
.favorite-header__button{
    color: rgb(56, 150, 228);
}
.favorite-list{
    width: 100%;
}
.favorite-list__item{
    display: grid;
    grid-template-columns:3fr 8fr 2fr;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(122, 122, 122, 0.226);
    border-radius: 0px;
    cursor: pointer;
}
.favorite-list__item:hover{
    background-color: rgba(122, 122, 122, 0.226);
    border-radius: 10px;
    transition: 0.3s ease all;
    padding: 1rem 0.5rem ;
}
.music-disc-icon{
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 100px;
}
.music-disc-icon img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
.music-info__title{
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.2rem;
}
.music-info__author{
    font-size: 0.7rem;
    opacity: 0.8;
}
.favorite-text{
    padding: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.7;
}
</style>