<template>
    <header class="calendar-header">
        <div class="calendar-header-column">
            <h2 class="calendar-header-title">Hi, {{userName}}</h2>
            <p class="calendar-header-subtitle">Today is: <time datetime="">{{today}}</time> - {{actuallyDay}}</p>
        </div>
        <div class="calendar-header-column calendar-header-column--image">
            <div class="icon-box-circle bg-theme">
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
.calendar-header{
    display: grid;
    grid-template-columns: 1fr 66px;
    height: 70px;
}
.calendar-header-column{
    height: 100%;
}
.calendar-header-column--image{
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
.calendar-header-title{
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
.calendar-header-subtitle{
    font-size: 0.8rem;
}
.icon-box-circle{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50px;
}
.icon{
    display: block;
    width: 30px;
    height: 30px;
}
</style>