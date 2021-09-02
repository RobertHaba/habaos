
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
        dropItem(item, itemLists, changeIDInObject){
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
                        element[changeIDInObject].id = index
                        item[changeIDInObject].id = indexActiveDrag
                    }
                })
            }
        },
    }
}