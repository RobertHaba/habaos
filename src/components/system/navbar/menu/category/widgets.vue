<template>
        <div class="widgets-container scroll" v-if="widgetLists">
            <div  v-for="app in widgetLists" :key="app.id" >
                <component class="widget" :class="'widget--'+app.appName" :is="app.widget.component" v-if="app.widget.ready !== false && app.widget.active"  v-on:checkIfWidgetItsReady="app.widget.ready = $event" draggable="true" @dragenter="runDragOver(app)" @dragend="runDragEnd(app)" title="Drag to change position"/>
            </div>
        </div>
</template>

<script>
import { db } from '@/firebaseDB';
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
        props:{
            dataProp:{
                type:Array,
                default:undefined
            }
        },
        data(){
            return{
                widgetLists:[],
                widgetKeyNameInDBObject:'widget'
            }
        },
        methods:{
            runDragOver(widget){
                dragItem.methods.dragOverOtherBox(widget)
            },
            runDragEnd(widget){
                dragItem.methods.dropItem(widget, this.widgetLists, this.widgetKeyNameInDBObject)
                this.updateWidgetDataInDB()
            },
            getWidgetList(){
                [...this.dataProp].forEach((app)=>{
                    if(app.widget != undefined && app.widget.active){
                        this.widgetLists.push(app)
                    }
                })
                this.sortWidget()
                
            },
            sortWidget(){
                this.widgetLists.sort((a,b)=>(a.widget.id>b.widget.id)?1:(b.widget.id>a.widget.id)?-1:0)
            },
            updateWidgetDataInDB(){
                this.widgetLists.forEach((item)=>{
                   db.collection('admin').doc('system').collection('allApp').doc(item.id.toString()).update(
                       {widget:{
                           component:item.widget.component,
                           id:item.widget.id,
                           ready:'',
                           active:item.widget.active
                       }}
                   )
                })
            }
        },
        mounted(){
            this.getWidgetList()
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