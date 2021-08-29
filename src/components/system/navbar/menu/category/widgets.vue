<template>
        <div class="widgets-container">
            <div  v-for="widget in widgetLists" :key="widget.id" @dragenter.prevent @dragover.prevent>
                <component class="widget" :class="'widget--'+widget.name" :is="widget.component" v-if="widget.ready !== false && widget.show"  v-on:checkIfWidgetItsReady="widget.ready = $event" draggable="true" @dragenter="runDragOver(widget)" @dragend="runDragEnd(widget)"/>
            </div>
        </div>
</template>

<script>
import {dragItem} from '@/components/system/events/changeIndexByDrag.js'
import widgetBookmark from '@/app/bookmark/widget/bookmarkWidget.vue'
import widgetMusic from '@/app/music/widget/music.vue'
import widgetWeather from '@/app/weather/widget/weather.vue'
    export default {
        components:{
            widgetMusic,
            widgetWeather,
            widgetBookmark
        },
        data(){
            return{
                widgetLists:[
                {
                    id:0,
                    positionInWidget:0,
                    name:'weather',
                    component: 'widgetWeather',
                    ready:'',
                    show:true
                },{
                    id:1,
                    positionInWidget:1,
                    name:'music',
                    component: 'widgetMusic',
                    ready:'',
                    show:true
                },
                {
                    id:2,
                    positionInWidget:2,
                    name:'bookmark',
                    component: 'widgetBookmark',
                    ready:'',
                    show:true
                }],
                dbTree:['admin','system','menu','widget','list'],
                itemListsFromDB:[]
            }
        },
        methods:{
            runDragOver(widget){
                dragItem.methods.dragOverOtherBox(widget)
            },
            runDragEnd(widget){
                dragItem.methods.dropItem(widget, this.widgetLists, this.dbTree)
            },
            async getWidgetListFromDB(){
                dragItem.methods.getWidgetListFromDB(this.dbTree, this.itemListsFromDB)
                this.widgetLists = (this.itemListsFromDB)? this.itemListsFromDB:this.favoriteAppsData
            }
        },
        mounted(){
            this.getWidgetListFromDB()
        }
    }
</script>

<style scoped>
.widgets-container{
    position: relative;
    display: flex;
    padding-bottom: 1rem;
    width: 100%;
    overflow-x: auto;
}
.widget{
    width: 120px;
    min-width: 120px;
    height: 80px;
    padding: 0.5rem;
    border-radius: 10px;
    margin-right: 1rem;
}
.widget--music{
    background-color: #9D0C91;
}
.widget--weather{
    background-color: #485293;
}
.widget--bookmark{
    background-color: #4CAF50;
}
</style>