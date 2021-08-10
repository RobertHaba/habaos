<template>
    <section class="account settings-container" :class="'settings-container--' + theme">
        <settingsHeader imgURL="http://cdn.haba.usermd.net/os/icons/user.svg" title="Account"/>
        <div class="settings-body">
            <subTitle text="What do you want do change?" />
        </div>
    </section>
</template>

<script>
import settingsHeader from './components/header.vue'
import subTitle from './components/subtitle.vue'
    export default {
        data(){
            return{
                theme:'dark',
            }
        },
        components:{
            settingsHeader,
            subTitle
        }
    }
</script>

<style scoped>
.settings-container{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.settings-container--dark{
    background-color: #22252D;
    color: #FFF;
}
.settings-body{
    padding: 1rem;
}
</style>