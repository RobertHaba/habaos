<template>
    <button class="small-music-player-container" @click="expandPlayer">
        <div class="small-player-image">
            <img :src="song.img" alt="">
        </div>
        <div class="small-player-info" >
            <h3 class="small-player-info-title">{{song.title}} - <span class="text-normal">{{song.author}}</span></h3>
        </div>
        <div class="small-player-option">
            <PlayMusic/>
        </div>
    </button>
</template>

<script>
    import PlayMusic from './PlayMusic'
    export default {
        name:'smallPlayer',
        props:{
            music:Object,
        },
        data(){
            return{
                song: this.music,
                expand:false,
            }
        },
        methods:{
            expandPlayer(e){
                console.log();
                if(e.target.dataset.button !== 'true'){
                this.$parent.expandPlayer()
                }
            }
        },
        watch:{
            music: {
                handler(){
                    if(this.music !== this.song){
                        this.song = this.music
                    }
                }
            }
        },
        components:{PlayMusic},
    }
</script>

<style scoped>
    .small-music-player-container{
        position: absolute;
        display: grid;
        grid-template-columns: 50px 8fr 2fr;
        bottom:0px;
        left: 0;
        z-index: 200;
        height: 50px;
        width: 100%;
        background-color: #2a2c30;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        color: #FFF;
    }
    .small-player-image{
        width: 100%;
        height: 50px;
    }
    .small-player-image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-bottom-left-radius: 20px;
    }
    .small-player-info{
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .small-player-info-title{
        padding:0 0.5rem;
        font-size: 0.7rem;
        opacity: 0.9;
    }
    .text-normal{
        font-weight: normal;
        opacity: 0.8;
    }
    .small-player-option{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>