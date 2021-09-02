<template>
                    <button @click="playAudio()" class="icon--circle ">
                        <span class="icon icon--play icon--reverse-color" data-button='true'></span>
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
.icon{
    display: block;
    width: 40px;
    height: 40px;
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;

}
.icon--circle{
    background-color: var(--bg-theme--app);
    border-radius: 100px;
}
.icon--play{
    background-image: url('http://cdn.haba.usermd.net/os/icons/play.svg');
}
.icon--pause{
    background-image: url('http://cdn.haba.usermd.net/os/icons/pause.svg');
}
</style>