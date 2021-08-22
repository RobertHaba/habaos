<template>
    <div>
        <div class="calendar-todo-header">
            <p class="calendar-todo-header__text">Tasks - {{activeDate}}</p>
            <p class="calendar-todo-header__number">3</p>
            <p class="calendar-todo-header__add">+</p>
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
    display: grid;
    grid-template-columns: 8fr 40px 40px;
    align-items: center;
    height: 40px;
    width: 100%;
    margin: 1.2rem 0 1.2rem 0;
}
.calendar-todo-header__text{
    font-weight: bold;
}
.calendar-todo-header__add,
.calendar-todo-header__number{
    display: flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    background-color: #E67500;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 100px;
}
.calendar-todo-header__number{
    font-size: 1rem;
    background-color: #662B65;
}
.calendar-todo-list{
    position: relative;
    overflow-y: auto;
    width: 100%;
    height: 120px;
}
</style>