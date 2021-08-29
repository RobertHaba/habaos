<template>
                    <button @click="playAudio()">
                        <span class="icon icon--circle icon--play" data-button='true'></span>
                    </button>
</template>

<script>
    export default {
            methods:{
                playAudio(status){
                    let audioPlayer = document.querySelector('#audioPlayer')

                    function isPlaying(audioPlayer){
                        return !audioPlayer.paused;
                    }
                    if(status == true || isPlaying(audioPlayer) == false){
                        setTimeout(()=>{
                            audioPlayer.play()
                        },150) // 150ms fix Google Chrome error "the play() request was interrupted by a new load request"
                        this.changeIcon('pause')
                    }
                    else{
                        audioPlayer.pause()
                        this.changeIcon('play')
                    }

                },
                changeIcon(icon){
                    let buttons = document.querySelectorAll('[data-button]')
                    buttons.forEach(button =>{
                        if(icon == 'pause'){
                            button.classList.add('icon--pause')
                        }
                        else{
                            button.classList.remove('icon--pause')
                        }
                    })
                }
            }
    }
</script>

<style scoped>
.music-player-wrapper--dark .icon{
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
          filter: invert(100%);
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
    background-image: url('../../assets/icons/play.svg');
}
.icon--pause{
    background-image: url('../../assets/icons/pause.svg');
}
</style>