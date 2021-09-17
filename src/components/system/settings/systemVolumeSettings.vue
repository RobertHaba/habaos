<template>
    <div class="volume-container">
        <div class="volume-bar">
            <input class="volume-range" type="range" v-model="volumeValue" :style="'background-size: '+volumeValue+'% 100%'">
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                volumeValue:0
            }
        },
        methods:{
            setSystemAudioVolume(){
                if(document.querySelector('audio') !== null){
                    document.querySelector('audio').volume = this.volumeValue/100
                }
                localStorage.setItem('audioVolume',this.volumeValue/100)
            }
        },
        watch:{
            volumeValue:{
                handler(){
                    this.setSystemAudioVolume()
                }
            }
        },
        mounted() {
            let sessionVolume = localStorage.getItem('audioVolume')
            this.volumeValue = (sessionVolume == null)?60:(sessionVolume *100)
        },
    }
</script>

<style scoped>
.volume-container{
    position: absolute;
    width: 120px;
    z-index: 999999;
    bottom: calc(100% + 0.5rem);
    padding: 0.5rem;
    background-color: var(--bg-theme--second);
    border-radius: 20px;
}
.volume-bar{
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.3rem;
    padding: 0.3rem;
    background-color: rgba(185, 185, 185, 0.5);
    border-radius: 100px;
}
.volume-range{
    height: 100%;
    width: 100%;
    border-radius: 100px;
}
.volume-range::-moz-range-progress{
    height: 100%;
    border-radius:20px;
    background-color: #FFF;
}
</style>