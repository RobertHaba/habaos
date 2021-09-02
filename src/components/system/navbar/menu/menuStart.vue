<template>
    <div class="os-menu-start">
        <div class="os-menu-start__section scroll-hidden">
            <div v-for="menuComponent in menuComponentsData" :key="menuComponent.id" :data-menu-component="menuComponent.component" :data-menu-component-active="menuComponent.active">
                <categoryTitle :title="menuComponent.title" :imgURL="menuComponent.icon" v-show="menuComponent.props"/>
                <component :is="menuComponent.component" :dataProp="menuComponent.props"/>
            </div>
        </div>
        <options />
    </div>
</template>

<script>
import categoryTitle  from './categoryTitle.vue'
import widgets from './category/widgets.vue'
import favorites from './category/favorites.vue'
import allApps from './category/allApps.vue'
import options from './options.vue'
    export default {
        components:{
            categoryTitle,
            widgets,
            favorites,
            allApps,
            options
        },
        props:{
            allAppData:{
                type:Array,
                default:undefined
            }
        },
        data(){
            return{
                menuComponentsData:[
                    {
                        id:0,
                        title:'Widgets',
                        icon:"http://cdn.haba.usermd.net/os/icons/widgets.svg",
                        component:'widgets',
                        props:this.allAppData,
                        active:true
                    },
                    {
                        id:1,
                        title:'Favorites',
                        icon:"http://cdn.haba.usermd.net/os/icons/heart.svg",
                        component:'favorites',
                        props:this.allAppData,
                        active:true
                    },
                    {
                        id:2,
                        title:'All Apps',
                        icon:"http://cdn.haba.usermd.net/os/icons/apps.svg",
                        component:'allApps',
                        props:this.allAppData,
                        active:true
                    }
                ],
            }
        },
        watch:{
            allAppData:{
                deep:true,
                handler(){
                    //Live update data on change in DB
                    this.menuComponentsData.forEach((component)=>{
                        component.props = this.allAppData
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .os-menu-start{
        position: absolute;
        width: 330px;
        height: 500px;
        bottom: 60px;
        padding: 1rem;
        border-radius: 10px;
        background-image: var(--bg-theme);
        z-index: 999999;
        box-shadow: 0px 0px 10px -2px rgb(117 117 117 / 57%);
    }
    .os-menu-start div{
        margin-bottom: 1rem;
    }
    .os-menu-start__section{
        position: relative;
        top:0;
        bottom:40px;
        width: 100%;
        height: calc(100% - 50px - 0.5rem);
        padding: 0 0.2rem;
        overflow-y: auto;
    }
</style>