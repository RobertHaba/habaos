<template>
    <div class="os-menu-start bg-theme">
        <div class="os-menu-start__section">
            <template v-for="menuComponent in menuComponentsData" :key="menuComponent.id">
                <categoryTitle :title="menuComponent.title" :imgURL="menuComponent.icon"/>
                <component :is="menuComponent.component" :dataProp="menuComponent.props" v-if="menuComponent.props"/>
            </template>
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
                        props:this.allAppData
                    },
                    {
                        id:1,
                        title:'Favorites',
                        icon:"http://cdn.haba.usermd.net/os/icons/heart.svg",
                        component:'favorites',
                        props:this.allAppData
                    },
                    {
                        id:2,
                        title:'All Apps',
                        icon:"http://cdn.haba.usermd.net/os/icons/apps.svg",
                        component:'allApps',
                        props:this.allAppData
                    }
                ]
            }
        },
        mounted(){
            console.log(this.allAppData);
        }
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
        z-index: 999;
    }
    .os-menu-start div{
        margin-bottom: 1rem;
    }
    .os-menu-start__section{
    }
</style>