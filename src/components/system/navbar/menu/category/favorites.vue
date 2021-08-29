<template>
    <div class="menu-favorites">
        <div class="menu-favorites__container">
            <button class="favorite-item" v-for="favoriteApp in favoriteAppsData" :key="favoriteApp.id" @click="runApp(favoriteApp.emitToApp)" draggable="true" @dragenter="runDragOver(favoriteApp)" @dragend="runDragEnd(favoriteApp)">
                <span class="icon" :style="{'background-image' : 'url('+favoriteApp.icon +')'}"></span>
                <p class="favoritle-item__title c-title">{{favoriteApp.title}}</p>
            </button>
        </div>
    </div>
</template>

<script>
import {dragItem} from '@/components/system/events/changeIndexByDrag.js'
    export default {
        mixinx:[dragItem],
        data(){
            return{
                favoriteAppsData:[
                    {
                        id:0,
                        positionInList:0,
                        title:'Music',
                        icon:"http://cdn.haba.usermd.net/os/icons/apps/music.svg",
                        emitToApp:'osAppRun-music'
                    },
                    {
                        id:1,
                        positionInList:1,
                        title:'Calculator',
                        icon:"http://cdn.haba.usermd.net/os/icons/apps/calculator.svg",
                        emitToApp:'osAppRun-calculator'
                    }
                ],
                dbTree:['admin','system','menu','favorite','list'],
                itemListsFromDB:[]
            }
        },
        methods:{
            runApp(emitName){
                this.emitter.emit(emitName)
            },
            runDragOver(favoriteApp){
                dragItem.methods.dragOverOtherBox(favoriteApp)
            },
            runDragEnd(favoriteApp){
                dragItem.methods.dropItem(favoriteApp, this.favoriteAppsData, this.dbTree)
            },
            async getFavoriteAppsFromDB(){
                dragItem.methods.getWidgetListFromDB(this.dbTree, this.itemListsFromDB)
                this.favoriteAppsData = (this.itemListsFromDB)? this.itemListsFromDB:this.favoriteAppsData
            }
        },
        mounted(){
                this.getFavoriteAppsFromDB()
        }
    }
</script>

<style scoped>
.menu-favorites__container{
    display: flex;
    justify-content: flex-start;
}
.favorite-item{
    position: relative;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    height: 100%;
    padding: 0.5rem;
    margin-right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius:10px;
    cursor: pointer;
}
.favoritle-item__title{
    margin-left: 0.5rem;
    font-size: 0.9rem;
}
.icon{
    width: 20px;
    height: 20px;
}
</style>