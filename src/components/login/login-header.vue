<template>
<header class="login-header">
    <div class="login-header__column login-header__column--logo">
        <div class="logo-column">
            <h2 class="logo-title">Rocket<span class="logo-red">OS</span></h2>
            <h3 class="logo-version">Falcon<span class="logo-red">One</span></h3>
        </div>
        <div class="logo-column logo-column--icon">
            <span class="icon icon--logo">
            </span>
        </div>
    </div>
    <div class="login-header__column login-header__column--date">
        <time class="login-time-now">{{time}}</time>
        <time class="login-date-now">{{todayDate}}</time>
    </div>
    <div class="login-header__column">
        <router-link to="/register" class="login-header-button">Create new profile</router-link>
    </div>
</header>
</template>

<script>
export default {
    data() {
        return {
            todayDate: '',
            time: '11:11'
        }
    },
    methods: {
        getDateAndTime() {
            let date = new Date()
            this.todayDate = date.toLocaleString('en-us', {
                weekday: 'long',
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            })
            console.log(this.todayDate);
            setInterval(() => {
                this.timer()
            }, 1000);
        },
        timer() {
            let date = new Date()
            let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
            let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
            this.time = hours + ':' + minutes
        },
    },
    mounted() {
        this.getDateAndTime()
    }
}
</script>

<style scoped>
.login-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    color: #FFF;
}

.login-header__column {
    display: flex;
}

.login-header__column--date {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-time-now {
    font-size: 3.3em;
}

.login-date-now {
    font-size: 1.3em;
}

.login-header-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 0 2em;
    font-size: 1em;
    font-weight: bold;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 30px;
}
.login-header__column--logo{
    display: flex;
    justify-content: flex-end;
    height: 60px;
}
.logo-column{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-right: 0.5em;
}
.logo-column--icon{
    align-items: center;
    justify-content: center;
    margin: 0;
}
.logo-title{
    font-size: 1.8em;
}
.logo-version{
    width: 120px;
    padding: 0.1em 0;
    text-align: center;
    font-size: 1em;
    color:var(--subpage-main-color);
    background-color: #FFF;
    border-radius: 100px;
}
.icon--logo{
    width: 45px;
    height: 45px;
}
</style>
