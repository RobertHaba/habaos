
import { db } from '@/firebaseDB';
export const dragItem = {
    data(){
        return{
            overDragElement:'',
            activeDragElement:'',
        }
    },
    methods:{
        dragOverOtherBox(widget){
            this.overDragElement = widget
        },
        dropItem(widget, itemLists, dbTree){
            this.activeDragElement = widget
            this.itemLists = itemLists
            let indexActiveDrag = this.itemLists.findIndex((el)=>el == this.activeDragElement)
            let isChangedPoition = false
            if(this.activeDragElement != this.overDragElement){
                this.itemLists.forEach((item,index) =>{
                    if(item == this.overDragElement && !isChangedPoition){
                        isChangedPoition = true
                        let element = this.itemLists[indexActiveDrag]
                        this.itemLists.splice(indexActiveDrag,1)
                        this.itemLists.splice(index,0,element)
                        element.positionInWidget = index
                        item.positionInWidget = indexActiveDrag
                        this.pushChangesWidgetListToDB(dbTree)
                    }
                })
            }
        },
        pushChangesWidgetListToDB(dbTree){
            let dbSystem = db.collection(dbTree[0]).doc(dbTree[1])
            dbSystem.set({dummy:'dummy'})
            dbSystem.collection(dbTree[2]).doc(dbTree[3]).set({dummy:'dummy'})
            this.itemLists.forEach((item)=>{
                item.ready = ''
                dbSystem.collection(dbTree[2]).doc(dbTree[3]).collection(dbTree[4]).doc(item.positionInWidget.toString()).set(item)
            })
        },
        getWidgetListFromDB(dbTree, listItems){
            this.itemLists =[]
            db.collection(dbTree[0]).doc(dbTree[1]).collection(dbTree[2]).doc(dbTree[3]).collection(dbTree[4]).get()
            .then((res)=>{
                if(!res.empty){
                    res.forEach((doc)=>{
                        listItems.push(doc.data())
                    })
                }
                else{
                    listItems = false
                }
            })
        }
    }
}