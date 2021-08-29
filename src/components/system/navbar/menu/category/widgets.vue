<template>
        <div class="widgets-container">
            <div  v-for="widget in widgetLists" :key="widget.id" @dragenter.prevent @dragover.prevent>
                <component class="widget" :class="'widget--'+widget.name" :is="widget.component" v-if="widget.ready !== false && widget.show"  v-on:checkIfWidgetItsReady="widget.ready = $event" draggable="true" @dragenter="dragOverOtherBox(widget)" @dragend="dropItem(widget)"/>
            </div>
        </div>
</template>

<script>
import { db } from '@/firebaseDB';
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
                }]
            }
        },
        methods:{
            dragOverOtherBox(widget){
                this.overDragElement = widget
            },
            dropItem(widget){
                this.activeDragElement = widget
                let indexActiveDrag = this.widgetLists.findIndex((el)=>el == this.activeDragElement)
                let isChangedPoition = false
                if(this.activeDragElement != this.overDragElement){
                    this.widgetLists.forEach((item,index) =>{
                        if(item == this.overDragElement && !isChangedPoition){
                            isChangedPoition = true
                            let element = this.widgetLists[indexActiveDrag]
                            this.widgetLists.splice(indexActiveDrag,1)
                            this.widgetLists.splice(index,0,element)
                            element.positionInWidget = index
                            item.positionInWidget = indexActiveDrag
                            this.pushChangesWidgetListToDB()
                        }
                    })
                }
            },
            pushChangesWidgetListToDB(){
                let dbSystem = db.collection('admin').doc('system')
                dbSystem.set({dummy:'dummy'})
                dbSystem.collection('menu').doc('widget').set({dummy:'dummy'})
                this.widgetLists.forEach((item)=>{
                    item.ready = ''
                    dbSystem.collection('menu').doc('widget').collection('list').doc(item.positionInWidget.toString()).set(item)
                })
            },
            getWidgetListFromDB(){
                this.widgetLists = []
                db.collection('admin').doc('system').collection('menu').doc('widget').collection('list').get()
                .then((res)=>{
                    console.log(res);
                    if(!res.empty){
                        res.forEach((doc)=>{
                            this.widgetLists.push(doc.data())
                        })
                    }
                })
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