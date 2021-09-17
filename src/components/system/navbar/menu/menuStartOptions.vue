<template>
<div class="menu-options">
    <optionButton class="menu-options-user__img" @click="test()" :imgURL="avatarURL" itemTitle="Account" app="account" :appData="appData" v-if="avatarURL != ''" />
    <hr class="vertical-line">
    <ul class="options-list">
        <li class="options-list__item"><button class="option-list-item-button" @click="logoutUser()" title="Logout"><span class="icon icon--reverse-color icon--logout"> </span></button></li>
    </ul>
</div>
</template>

<script>
import optionButton from '../navbarListItem.vue'
export default {
    components: {
        optionButton,
    },
    data() {
        return {
            showAccountSettings: false,
            avatarURL: '',
            appData: {
                appName: 'account',
                status: true,
            }
        }
    },
    methods: {
        async getUserAvatarFromDB() {
            this.avatarURL = JSON.parse(sessionStorage.getItem('userData')).avatar
        },
        test() {
            this.emitter.emit('osAppRun-account', {
                status: true
            })
        },
        logoutUser() {
            sessionStorage.clear()
            this.$router.push({
                path: 'login'
            })
        }
    },
    mounted() {
        this.emitter.on('menuStartChangeImage', () => {
            this.getUserAvatarFromDB()
        })
    }

}
</script>

<style scoped>
.menu-options {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: calc(100% - 2rem);
    height: 50px;
    border-radius: 10px;
    background-color: rgba(184, 184, 184, 0.3);
}

.menu-options-user {
    width: 50px;
    height: 100%;
}

.menu-options-user__img {
    width: 35px;
    height: 35px;
    margin: 0 0.5rem;
}

.options-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: calc(100% - 50px);
    padding: 0 1rem;
}

.options-list__item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50px;
}

.options-list__item:hover {
    transition: 0.3s ease all;
    background-color: rgba(0, 0, 0, 0.4);
}

.option-list-item-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
}

.icon--logout {
    width: 80%;
    height: 80%;
    background-image: url('https://cdn.haba.usermd.net/os/icons/power.svg');
}
</style>
