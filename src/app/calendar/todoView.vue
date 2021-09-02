<template>
    <div class="window-addForm-cover" @click.self="closeTodoView()" >
        <div class="window-addForm-container" :class="'bg-color--'+todoData.priority">
            <headerTodo :headerTitle="headerTitleText" />
            <div class="window-addForm-main">
                <div class="addForm-view scroll-hidden">
                    <h4 class="addForm-view__title">{{todo.title}}</h4>
                    <p class="addForm-view__description">{{todo.description}}

                    </p>
                    <div class="addForm-view__footer">
                        <p class="bg-color" :class="'bg-color--'+todo.priority">{{todo.priority}}</p>
                        <p class="addForm-view-date">Date: <time :datetime="todoCreateAt">{{todoCreateAt}}</time></p>
                    </div>
                </div>
                <div class="window-addForm-footer window-addForm-footer--space">
                    <todoBtn class="addForm-button" btnTitle="Remove" btnBgColor="#AD1E1E" @click="answerModalShow = true"/>
                    <todoBtn class="addForm-button" btnTitle="Edit" btnBgColor="#50B4EC" @click="editTodo"/>
                    <todoBtn class="addForm-button" btnTitle="Complete" btnBgColor="#4CAF50" @click="removeFromDB"/>
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
import answerModal from '@/app/components/modals/answerModal.vue'
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
            closeTodoView(){
                this.emitter.emit('openTodoView',false)
            },
            removeFromDB(){
                let date = this.todoData.createAt.split(',')
                db.collection('admin').doc('todoApp').collection('todo').doc(date[0]).collection(date[1].replace('0','')).doc(date[2]).collection('lists').doc(this.todoData.id).delete()
                .then(()=>{
                    this.resetApp()
                    this.checkDayListsLengthDB(date)
                    this.closeTodoView()
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
            editTodo(){
                let todoDataArray = [this.todoData.title,this.todoData.description,this.todoData.priority, this.todoData.id]
                this.emitter.emit('openTodoEditor',
                {
                    status:true,
                    value:this.todoData.createAt.split(',').join('.')
                })
                setTimeout(()=>{
                    this.emitter.emit('editTodo',todoDataArray)
                    this.closeTodoView()
                },200)
            },
            resetApp(){
                this.emitter.emit('resetDataInCalendarApp')
            },
        },
        mounted(){
            this.todoCreateAt = this.todoData.createAt.split(',').reverse().join('.')
            this.emitter.on('todoViewRunFunctionFromModal',(runFunction)=>{
                if(runFunction){ this.removeFromDB() }
                this.answerModalShow = false

            })
        }
        
    }
</script>

<style>
.addForm-view{
    word-break: break-all;
    height: 100%;
    overflow: auto;
    padding-bottom: 4rem;
}
.addForm-view__title{
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.addForm-view__title::first-letter{
    text-transform: uppercase;
}
.addForm-view__description{
    font-size: 0.9rem;
    color: var(--font-second-color);
}
.addForm-view__footer{
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}
.addForm-view-date,
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
.window-addForm-footer--space{
    padding: 0 1rem;
    justify-content: space-between;
}
</style>