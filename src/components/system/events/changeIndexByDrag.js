
import { db } from '@/firebaseDB';
export const dragItem = {
    data(){
        return{
            overDragElement:'',
            activeDragElement:'',
        }
    },
    methods:{
        dragOverOtherBox(item){
            this.overDragElement = item
        },
        dropItem(item, itemLists, changePositionInKeyName){
            this.activeDragElement = item
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
                        element[changePositionInKeyName] = index
                        item[changePositionInKeyName] = indexActiveDrag
                        console.log(changePositionInKeyName);
                        //this.pushChangesWidgetListToDB(dbTree)
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
                //dbSystem.collection(dbTree[2]).doc(dbTree[3]).collection(dbTree[4]).doc(item.positionInList.toString()).set(item)
                db.ref(dbTree).child(item.id.toString()).set(item)
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