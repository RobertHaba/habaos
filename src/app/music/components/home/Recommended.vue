<template>
    <div class="recommended" v-if="dailyRecommended !== ''">
        <h3 class="recommended__header-title">Daily recommended</h3>
        <div class="recommended-wrapper scroll">
            <div class="recommended-tile" v-on:click="getMusic(song,dailyRecommended, 'dailyRecommended')" v-for="song in dailyRecommended.slice(0,5)" :key="song.id">
                <picture class="recommended-tile-img-wrapper">
                    <img class="recommended-tile-img-wrapper__img" :src="song.img" :alt="'Okładka piosenki - ' + song.title + ' ' + song.author">
                </picture>
                <div class="recommended-tile__info tile-info">
                    <h4 class="tile-info__song">{{song.title}}</h4>
                    <h4 class="tile-info__author">{{song.author}}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
    export default {
        name:'Daily Recommended',
        data(){
            return{
                dailyRecommended:''
            }
        },
        props:{
            getMusic: Function,
        },
        methods:{
            async getDataFromFireBase(){
                let snapshot = await db.collection('admin').doc('musicPlayer').collection('dailyRecommended').get()
                this.dailyRecommended = snapshot.docs.map(doc => doc.data())
                this.changeSongID()
            },
            async changeSongID(){
                let snapshot = await db.collection('admin').doc('musicPlayer').collection('dailyRecommended').get()
                 this.dailyRecommended.forEach(async (item, index) =>{
                    item.id = await snapshot.docs[index].id
                })
            }
        },
        mounted() {
            this.getDataFromFireBase()
        },
    }
</script>

<style scoped>
.recommended{
    position: relative;
    width: 100%;
}
.recommended__header-title{
    opacity: 0.8;
    margin-bottom: 1rem;
}
.recommended-wrapper{
    display: flex;
    position: relative;
    align-items: flex-end;
    overflow-x: auto;
    padding-bottom: 1rem;
}
.recommended-tile{
    position: relative;
    display: grid;
    grid-template-rows: 6fr 2fr;
    width: 150px;
    min-width: 150px;
    height: 180px;
    margin-right: 1rem;
    border-radius: 15px;
    background-color: rgba(207, 207, 207, 0.164);
    cursor: pointer;
}
.recommended-tile:first-child{
    width: 180px;
    min-width: 180px;
    height: 200px;
    transition: 0.3s ease all;
}
.recommended-tile:hover{
    background-color: var(--bg-theme--app-hover);
    transition: 0.3s ease all;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
.recommended-tile-img-wrapper{
    overflow:hidden;
}
.recommended-tile-img-wrapper__img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}
.recommended-tile__info{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 1rem;
}
.tile-info__song{
    font-size: 0.8rem;
    opacity: 0.8;
}
.recommended-tile:first-child .tile-info__song{
    font-size: 0.9rem;
}
.tile-info__author{
    opacity: 0.6;
    font-size: 0.7rem;
    font-weight: normal;
}
</style>