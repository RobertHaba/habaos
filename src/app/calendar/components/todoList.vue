<template>
    <div>
        <div class="calendar-todo-header">
            <p class="calendar-todo-header__text">Tasks - {{activeDate}}</p>
            <p class="btn-app-circle calendar-todo-header__number">{{(todos !== '')? todos.length : 0}}</p>
            <p class="btn-app-circle" @click="openTodoWindow('openTodoEditor', activeDate)">+</p>
        </div>
        <div class="calendar-todo-list" v-if="todos !== ''" >
            <template  v-for="todo in todos" :key="todo.id" >
                <todoItem :todoData="todo" @click="openTodoWindow('openTodoView',todo)"/>
            </template>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import todoItem from './todoItem.vue'
    export default {
        props:{
            today: String
        },
        components:{
            todoItem,
        },
        data(){
            return{
                activeDate:'',
                todos:''
            }
        },
        methods:{
            async getDataFromDB(){
                let splitDate = this.activeDate.split('.')
                console.log(splitDate);
                await db.collection('admin').doc('todoApp').collection('todo').doc(splitDate[0]).collection(splitDate[1].replace('0','')).doc(splitDate[2]).collection('lists').get()
                .then(res =>{
                    this.todos = res.docs.map(doc => doc.data())
                })
                .catch(()=>{
                    this.todos =""
                })
            },
            openTodoWindow(windowType, data){
                this.emitter.emit(windowType,
                    {
                        status:true,
                        value: data
                    }
                )
            },
        },
        mounted(){
           setTimeout(()=>{
                this.activeDate = this.today
           },10)
           setTimeout(()=>{
                    this.getDataFromDB()
                },20) 
           this.emitter.on('todoChangeDate',(date)=>{
                this.activeDate = date;
                setTimeout(()=>{
                    this.getDataFromDB()
                },20)
            })
           this.emitter.on('todoListUpdateData',()=>{
                    this.getDataFromDB()
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