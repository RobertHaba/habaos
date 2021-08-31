<template>
    <div class="menu-favorites" v-if="favoriteAppsData">
        <div class="menu-favorites__container">
            <template v-for="favoriteApp in favoriteAppsData" :key="favoriteApp.id" >
                <button title="Drag to change position" v-if="favoriteApp.favorite" class="favorite-item" @click="runApp(favoriteApp.emitToApp)" draggable="true" @dragenter="runDragOver(favoriteApp)" @dragend="runDragEnd(favoriteApp)">
                    <span class="icon" :style="{'background-image' : 'url('+favoriteApp.iconURL +')'}"></span>
                    <p class="favoritle-item__title c-title">{{favoriteApp.title}}</p>
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import {dragItem} from '@/components/system/events/changeIndexByDrag.js'
    export default {
        mixinx:[dragItem],
        props:{
            dataProp:{
                type: Array,
                default:undefined
            }
        },
        data(){
            return{
                favoriteAppsData:[],
                dbTree:'admin/system/allApp/',
                changePositionInKeyName:'favoriteID'
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
                dragItem.methods.dropItem(favoriteApp, this.favoriteAppsData, this.changePositionInKeyName)
            },
            getOnlyFavoriteApp(){
                [...this.dataProp].forEach((app)=>{
                    if(app.favorite){
                        this.favoriteAppsData.push(app)
                    }
                })
                this.sortFavoriteApp()
            },
            sortFavoriteApp(){
                this.favoriteAppsData.sort((a,b)=>(a.favoriteID > b.favoriteID)?1:(b.favoriteID > a.favoriteID)?-1:0)
            },
            updateFavoriteDataInDB(){
                this.favoriteAppsData.forEach((item)=>{
                   db.collection('admin').doc('system').collection('allApp').doc(item.id.toString()).set(item)
                })
            }
        },
        watch:{
            favoriteAppsData:{
                deep:true,
                handler(){
                    this.updateFavoriteDataInDB()
                }
            },
        },
        mounted(){
            this.getOnlyFavoriteApp()
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
    transition: 0.3s ease;
    cursor: pointer;
}
.favorite-item:hover{
    background-color: rgba(255, 255, 255, 0.4);
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