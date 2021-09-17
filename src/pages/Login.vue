<template>
<section class="container">
    <div class="login-layout">
        <headerLogin />
        <formLogin />
        <footer>
            <button class="full-screen-mode box-shadow-dark" @click="fullScreenMode()">
                <span class="icon icon--reverse-color" :class="{'icon--fullscreen':!fullscreenMode.status,'icon--fullscreen-exit':fullscreenMode.status}"></span>{{fullscreenMode.message}}
            </button>
        </footer>
    </div>
</section>
</template>

<script>
import headerLogin from '@/components/login/loginHeader.vue'
import formLogin from '@/components/login/loginForm.vue'
export default {
    name: 'login',
    components: {
        headerLogin,
        formLogin
    },
    data(){
        return{
            fullscreenMode:{
                status:false,
                message:'Fullscreen mode'
            }
        }
    },
    methods: {
        fullScreenMode() {
            if (!document.fullscreenElement) {
                this.fullscreenMode.status = true
                this.fullscreenMode.message = 'Exit Fullscreen mode'
                document.documentElement.requestFullscreen()
            } else if (document.exitFullscreen) {
                this.fullscreenMode.status = false
                this.fullscreenMode.message = 'Fullscreen mode'
                document.exitFullscreen()
            }
        }
    }

}
</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: var(--subpage-main-color);
}

.login-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    padding: 6rem;
}

.full-screen-mode {
    display: flex;
    color: #FFF;
    padding: 0.8rem 2rem;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 30px;
}
.icon{
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5rem;
}
.icon--fullscreen{
    background-image: url('https://cdn.haba.usermd.net/os/icons/fullscreen.svg');
}

.icon--fullscreen-exit{
    background-image: url('https://cdn.haba.usermd.net/os/icons/fullscreen-exit.svg');
}
</style>
