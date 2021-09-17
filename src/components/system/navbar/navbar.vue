<template>
<nav class="os-navbar">
    <div class="os-container-navbar" v-if="allAppData">
        <navbarListItem :appData="{pinned:true}" class="os-navbar-menu-start" imgURL="https://cdn.haba.usermd.net/os/icons/rocket.svg" itemTitle="Start" @click="openStart = !openStart" app="" />

        <menuStart v-show="openStart" :allAppData="allAppData" />
        <div class="os-navbar-container" v-if="allAppData">
            <div class="os-navbar-work-container">
                <ul class="work-navbar work-navbar--pinned" id="workNavbarPinned">
                    <template v-for="app in allAppData" :key="app.id">
                        <navbarListItem :imgURL="app.iconURL" :appData="app" :itemTitle="app.title" :app="app.appName" />
                    </template>
                </ul>
                <hr class="vertical-line">
                <ul class="work-navbar" id="workNavbarDefault">
                </ul>
            </div>
            <ul class="os-navbar-setting">
                <li class="navbar-setting-item bg-dark--hover" v-for="componentItem in navbarSettingComponents" :key="componentItem.id" @click="componentItem.functionName">
                    <p class="navbar-setting-item__title bg-dark">{{componentItem.text}}</p>
                    <span class="icon icon--reverse-color" :style="{'background-image':'url('+ componentItem.icon +')'}"></span>
                    <component :is="componentItem.name" v-if="componentItem.name && componentItem.status" @click.stop />
                </li>
                <li class="navbar-setting-item navbar-setting-item--date">
                    <time :datetime="time">{{time}}</time>
                    <time :datetime="todayDate">{{todayDate}}</time>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import {
    db
} from '@/firebaseDB';
import navbarListItem from './navbarListItem'
import menuStart from './menu/menuStart'
import brightnessSetting from '../settings/systemBrightnessSetting.js'
import volumeSettings from '../settings/systemVolumeSettings.vue'
export default {
    props: {
        allAppData: Array,
        showStartMenu: {
            type: Boolean,
            default: false,
        },
    },
    mixins: [brightnessSetting],
    components: {
        navbarListItem,
        menuStart,
        volumeSettings
    },
    data() {
        return {
            openStart: this.showStartMenu,
            navbarSettingComponents: [{
                    id: 0,
                    text: 'Fullscreen',
                    isFunction: true,
                    name: '',
                    functionName: this.fullScreenMode,
                    icon: 'https://cdn.haba.usermd.net/os/icons/fullscreen.svg',
                    status: false
                }, {
                    id: 1,
                    text: 'Sound',
                    isFunction: true,
                    name: 'volumeSettings',
                    functionName: this.showVolumeSetting,
                    icon: 'https://cdn.haba.usermd.net/os/icons/volume.svg',
                    status: false
                },
                {
                    id: 2,
                    text: 'Switch brightness mode',
                    isFunction: true,
                    functionName: this.runSetting,
                    icon: 'https://cdn.haba.usermd.net/os/icons/brightness.svg',
                    status: false
                }
            ],
            themesID: '',
            todayDate: '',
            showSetting: false,
            time: "11:11",
        }
    },
    inject: ['themeID', 'account'],
    methods: {
        runSetting() {
            this.themesID = (this.themesID === 0) ? 1 : 0
            let themeName = (this.themesID === 1) ? 'light' : 'dark'
            db.collection(this.account).doc('user').update({
                theme: themeName
            })
            this.changeBrightness(this.themesID)
        },
        showVolumeSetting() {
            this.navbarSettingComponents[1].status = !this.navbarSettingComponents[1].status
        },
        fullScreenMode(useByUser) {
            if(!useByUser){
                this.navbarSettingComponents[0].icon = (document.fullscreenElement)?'https://cdn.haba.usermd.net/os/icons/fullscreen-exit.svg':'https://cdn.haba.usermd.net/os/icons/fullscreen.svg'
            }
            else if (!document.fullscreenElement) {
                this.navbarSettingComponents[0].icon = 'https://cdn.haba.usermd.net/os/icons/fullscreen-exit.svg'
                document.documentElement.requestFullscreen()
            } else if (document.exitFullscreen) {
                this.navbarSettingComponents[0].icon = 'https://cdn.haba.usermd.net/os/icons/fullscreen.svg'
                document.exitFullscreen()
            }
        },
        getDateAndTime() {
            let date = new Date()
            this.todayDate = date.toJSON().slice(0, 10).replace(/-/g, '.').split('.').reverse().join('.');
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
    watch: {
        showStartMenu: {
            deep: true,
            handler() {
                this.openStart = false
            }
        },
        themeID: {
            deep: true,
            handler() {
                console.log('asdasd');
                this.themesID = this.themeID.userThemeID
                this.changeBrightness(this.themesID)
            }
        }
    },
    mounted() {
        this.getDateAndTime()
        this.fullScreenMode(false)
    }
}
</script>

<style scoped>
.os-navbar {
    position: relative;
    width: calc(100% - 20px);
    height: 50px;
    margin: 0 auto;
    z-index: 9999;
}

.os-container-navbar {
    display: flex;
    width: 100%;
    height: 100%;
}

.os-navbar-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr fit-content(150px);
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-image: var(--bg-theme);
    border-radius: 10px;
}

.os-navbar-work-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.os-navbar-menu-start {
    justify-content: center;
    width: 50px;
    margin-right: 10px;
    background-image: var(--bg-theme);
}

.os-navbar-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    border-radius: 10px;
}

.os-navbar-icon {
    display: block;
    height: 25px;
    width: 25px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
}

.os-navbar-icon--menu-start {
    background-image: url('https://cdn.haba.usermd.net/os/icons/rocket.svg');
}

.work-navbar,
.os-navbar-setting {
    display: flex;
    height: 100%;
    padding: 0 10px;
}

.navbar-setting-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.4rem;
    height: 100%;
    cursor: pointer;
}

.navbar-setting-item--date {
    font-size: 0.75rem;
    flex-direction: column;
    color: var(--font-main-color);
    cursor: default;
}

.navbar-setting-item__title {
    display: none;
}

.navbar-setting-item:hover .navbar-setting-item__title {
    position: absolute;
    display: block;
    bottom: calc(100% + 0.7rem);
    padding: 0.3rem 1rem;
    opacity: 1;
    z-index: 9999;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.8rem;
    border-radius: 10px;
}

.icon {
    width: 18px;
    height: 18px;
}
</style>
