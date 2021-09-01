<template >
    <button v-show="appData.pinned || (!appData.pinned && show)" class="work-navbar-item bg-dark--hover" :class="{'work-navbar-item--active-app':show && app != '','work-navbar-item--app-is-open':minimize}" :data-navbar-os-app="appData.appName">
        <div class="work-navbar-icon-container" @click="minimizeApp()" >
            <span class="work-navbar-icon" :style="{'background-image' : 'url(' + imgURL + ')'}"></span>
        </div>
        <p class="work-navbar-item__title bg-dark">{{itemTitle}}</p>
        <runApp v-if="show" v-show="minimize" :app="app" ref="appOpen"/>
    </button>
</template>

<script>

import runApp from '../events/runApp.vue'
export default {
    props:{
        imgURL: String,
        itemTitle: String,
        app: String,
        appData:{
            type:Object,
            default:function(){
                return{pinned:true}
            }
        }
    },
    components:{
        runApp
    },
    data(){
        return{
            show:false,
            minimize: false,
        }
    },
    methods:{
        minimizeApp(){
                console.log('minimize ' + this.minimize);
                console.log('show ' + this.show);
            if(this.show == true && this.minimize == true){
                this.$refs.appOpen.moveToDesktop()
            }
            this.show = true
            if(this.show == true){
                this.minimize = !this.minimize
            }
        },
        moveAppToWorkNavbar(){
                let appItem = document.querySelector(`[data-navbar-os-app="${this.appData.appName}"]`)
            if(!this.appData.pinned){
                console.log(appItem);
                document.querySelector('#workNavbarDefault').appendChild(appItem)
            }
            else{
                console.log(appItem);
                document.querySelector('#workNavbarPinned').appendChild(appItem)
            }
        }
    },
    watch:{
        'appData.pinned':{
            deep:false,
            handler(){
                this.moveAppToWorkNavbar()
            }
        }
    },
    mounted(){
        this.emitter.on('osAppRun-'+this.app,()=>{
            console.log('RUN APP włącza dziala');
            this.moveAppToWorkNavbar()
            this.minimizeApp()
            this.minimize = true
        })
        console.log(this.data);
    }
}
</script>

<style scoped>
    .work-navbar-item{
        position: relative;
        width: 50px;
        height: 100%;
        border-radius: 10px;
        margin-right: 0.1rem;
        transition: 0.5s ease;
    }
    .work-navbar-item--active-app{
        padding-top: 4px;
        height: calc(100% - 2px);
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        box-shadow: 0px 10px 0px -8px #ffffff80;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
        transition: 0s height;
    }
    .work-navbar-item--active-app:hover{
        padding-top: 2px;
        height: 100%;
        box-shadow: 0px 10px 0px -10px #ffffff80;
        border-bottom:2px solid #ffffff80;
    }
    .work-navbar-item--app-is-open:hover{
        height: 100%;
        border: unset;
        padding: 0px;
        background-color: rgba(0, 0, 0, 0.589);
    }
    .work-navbar-item--app-is-open{
        height: 100%;
        padding: 0;
        box-shadow: none;
        border:none;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.35);
    }
    .work-navbar-icon-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .work-navbar-icon{
        display: block;
        height: 30px;
        width: 30px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    } 
    .work-navbar-item__title{
        display: none;
    }
    .work-navbar-item:hover .work-navbar-item__title{
        position: absolute;
        display: block;
        top:-35px;
        padding: 0.3rem 1rem;
        opacity: 1;
        z-index: 9999;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.8rem;
        border-radius: 10px;
    }
    .app-minimize{
        display: none;
    }
</style>