<template>
    <div>
        <div class="calendar-todo-header">
            <p class="calendar-todo-header__text">Tasks - {{activeDate}}</p>
            <p class="calendar-todo-header__number">3</p>
        </div>
        <div class="calendar-todo-list">
                <todoItem />
                <todoItem />
                <todoItem />
        </div>
    </div>
</template>

<script>
import todoItem from './todoItem.vue'
    export default {
        props:{
            today: String
        },
        components:{
            todoItem
        },
        data(){
            return{
                activeDate:''
            }
        },
        mounted(){
           setTimeout(()=>{
                this.activeDate = this.today
           },10) 
           this.emitter.on('todoChangeDate',(date)=>{
               console.log(date);
                this.activeDate = date.toJSON().slice(0,10).replace(/-/g,'.');
            })
        }
    }
</script>

<style scoped>
.calendar-todo-header{
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
}
.calendar-todo-header__text{
    font-weight: bold;
}
.calendar-todo-header__number{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 100%;
    max-width: 60px;
    background-color: #E67500;
    font-weight: bold;
    border-radius: 5px;
}
.calendar-todo-list{
    position: relative;
    overflow-y: auto;
    width: 100%;
    height: 120px;
}
</style>