<template>
    <header class="app-header">
        <div class="app-header-column">
            <h2 class="app-header-title">Hi, {{userName}}</h2>
            <p class="app-header-subtitle" v-if="today">Today is: <time datetime="">{{today}}</time> - {{actuallyDay}}</p>
        </div>
        <div class="app-header-column app-header-column--image">
            <div class="icon-box-circle">
                <span class="icon" :style="{'background-image' : 'url('+ userAvatar +')'}"></span>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data(){
            return{
                userName:'',
                userAvatar:'',
            }
        },
        props:{
            today: String,
            actuallyDay: String
        },
        methods:{
            getUserData(){
                let userData = JSON.parse(sessionStorage.getItem('userData'))
                this.userName = userData.name
                this.userAvatar = userData.avatar
            }
            
        },
        mounted(){
            this.getUserData()
        }
    }
</script>

<style scoped>
.app-header{
    display: grid;
    grid-template-columns: 1fr 66px;
    height: 70px;
}
.app-header-column{
    height: 100%;
    margin-bottom: 1rem;
}
.app-header-column--image{
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
.app-header-title{
    font-size: 1.5rem;
}
.app-header-subtitle{
    font-size: 0.8rem;
}
.icon-box-circle{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: rgba(98, 44, 102, 1);
}
.icon{
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
}
</style>