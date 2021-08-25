<template>
    <div class="calendar-todo-cover calendar-todo-cover--dark" @click.self="closeTodoEditor()" >
        <div class="calendar-todo-container" :class="'bg-color--'+todoData.priority">
            <headerTodo :headerTitle="headerTitleText" />
            <div class="calendar-todo-main">
                <div class="todo-view">
                    <h4 class="todo-view__title">{{todo.title}}</h4>
                    <p class="todo-view__description">{{todo.description}}

                    </p>
                    <div class="todo-view__footer">
                        <p class="bg-color" :class="'bg-color--'+todo.priority">{{todo.priority}}</p>
                        <p class="todo-view-date">Date: <time :datetime="todoCreateAt">{{todoCreateAt}}</time></p>
                    </div>
                </div>
                <div class="calendar-todo-footer calendar-todo-footer--space">
                    <todoBtn class="todo-button" btnTitle="Remove" btnBgColor="#AD1E1E" @click="answerModalShow = true"/>
                    <todoBtn class="todo-button" btnTitle="Edit" btnBgColor="#50B4EC" @click="resetApp"/>
                    <todoBtn class="todo-button" btnTitle="Complete" btnBgColor="#4CAF50" @click="'a'"/>
                </div>
            </div>
        </div>
        <answerModal :modalProps="answerModalProps" v-if="answerModalShow"/>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import headerTodo from './components/headerTodo.vue'
import todoBtn from './components/todoBtn.vue'
import answerModal from '@/components/modals/answerModal.vue' //timeout, icon,title,text
    export default {
        props:['todoData'],
        components:{
            headerTodo,
            todoBtn,
            answerModal
        },
        data(){
            return{
                headerTitleText:'Task view',
                todo: this.todoData,
                answerModalProps:{
                    title:'Delete',
                    text:'Do you want to delete the task?',
                    icon:'http://cdn.haba.usermd.net/os/icons/sad-face.svg',
                    timeout:8000,
                    doEmitFunction: 'todoViewRunFunctionFromModal'
                },
                answerModalShow: false,
                todoCreateAt:''
            }
        },
        methods:{
            closeTodoEditor(){
                this.emitter.emit('openTodoView',false)
            },
            removeFromDB(){
                let date = this.todoData.createAt.split(',')
                db.collection('admin').doc('todoApp').collection('todo').doc(date[0]).collection(date[1].replace('0','')).doc(date[2]).collection('lists').doc(this.todoData.id).delete()
                .then(()=>{
                    console.log('Usunięte');
                    this.resetApp()
                    this.checkDayListsLengthDB(date)
                    this.closeTodoEditor()
                })
            },
            checkDayListsLengthDB(date){
                db.collection('admin').doc('todoApp').collection('todo').doc(date[0]).collection(date[1].replace('0','')).doc(date[2]).collection('lists').get()
                .then((res)=>{
                    if(res.size == 0){
                        db.collection('admin').doc('todoApp').collection('todo').doc(date[0]).collection(date[1].replace('0','')).doc(date[2]).delete()
                        .then(()=>{
                        })
                    }
                })
                .catch(()=>{
                    this.resetApp()
                })
            },
            resetApp(){
                this.emitter.emit('resetDataInCalendarApp')
            },
        },
        mounted(){
            console.log(this.todoData);
            this.todoCreateAt = this.todoData.createAt.split(',').reverse().join('.')
            this.emitter.on('todoViewRunFunctionFromModal',(runFunction)=>{
                console.log(runFunction);
                if(runFunction){ this.removeFromDB() 
                console.log('asdasd');}
                this.answerModalShow = false

            })
        }
        
    }
</script>

<style>
.todo-view{
    word-break: break-all;
    height: 100%;
    overflow: auto;
    padding-bottom: 4rem;
}
.todo-view__title{
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.todo-view__title::first-letter{
    text-transform: uppercase;
}
.todo-view__description,
.todo-view__date{
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.774);
}
.todo-view__footer{
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}
.todo-view-date,
.bg-color{
    font-size: 0.7rem;
}
.bg-color{
    padding: 0.1rem 0.5rem;
    border-radius: 100px;
}
.bg-color--Low{
    background-color: #4CAF50;
}
.bg-color--Medium{
    background-color: #E67500;
}
.bg-color--High{
    background-color: #FF127F;
}
.calendar-todo-footer--space{
    padding: 0 1rem;
    justify-content: space-between;
}
</style>