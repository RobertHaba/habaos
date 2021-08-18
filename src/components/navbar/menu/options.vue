<template>
    <div class="menu-options bg-dark">
            <optionButton class="menu-options-user__img" :imgURL="avatarURL" itemTitle="Account" app="account" v-if="avatarURL != ''"/>
        <hr class="vertical-line">
        <ul class="options-list">
            <optionButton imgURL="http://cdn.haba.usermd.net/os/icons/setting.svg" itemTitle="Settings"/>
            <optionButton imgURL="http://cdn.haba.usermd.net/os/icons/power.svg" itemTitle="Power"/>
        </ul>
    </div>
</template>
<script>
    import optionButton from '../workListItem.vue'
    export default {
        components:{
            optionButton,
        },
        data(){
            return{
                showAccountSettings: false,
                avatarURL:'',
            }
        },
        methods:{
            async getUserAvatarFromDB(){
                this.avatarURL = JSON.parse(sessionStorage.getItem('userData')).avatar
                console.log(this.avatarURL);
            }
        },
        mounted(){
            this.emitter.on('menuStartChangeImage', () =>{
                    this.getUserAvatarFromDB()
            })
        }
        
    }
</script>

<style scoped>
.menu-options{
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: calc(100% - 2rem);
    height: 50px;
    border-radius: 10px;
}
.menu-options-user{
    width: 50px;
    height: 100%;
}
.menu-options-user__img{
    width: 35px;
    height: 35px;
    margin:0 0.5rem;
}
.options-list{
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: calc(100% - 50px);
}
</style>