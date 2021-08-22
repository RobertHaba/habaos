<template>
    <div class="calendar-todo-cover calendar-todo-cover--dark">
        <div class="calendar-todo-container">
            <headerTodo headerTitle="Create a New Task" />
            <div class="calendar-todo-main">
                <todoInput class="calendar-todo-main__column"  inputTag="input" inputType="text" inputName="Title" inputLabel="Title" inputText="Add your title" :getChildData="todoChildData" inputMaxLength="40" inputMinLength="4"/>
                <todoInput class="calendar-todo-main__column" inputTag="textarea" inputType="" inputName="Description" inputText="Add your description" inputLabel="Description" :getChildData="todoChildData" inputMaxLength="120" inputMinLength="4"/>
                <div class="calendar-todo-main__column" >
                    <div class="todo-input-box"><p class="calendar-todo-column-title">Priority</p><p class="validation-alert" v-if="this.priorityData.validation === false">Chose priority</p></div>
                    <div class="calendar-todo-buttons-wrapper">
                        <template v-for="priority in priorityValues" :key="priority" >
                            <todoBtn class="todo-button" :class="{'todo-button--active':priorityData.value == priority.title}" :btnTitle="priority.title" :btnBgColor="priority.bgColor" @click="priorityData.value = priority.title"/>
                        </template>
                    </div>
                </div>
                <div class="calendar-todo-footer">
                    <todoBtn class="todo-button" btnTitle="Save" btnBgColor="#4CAF50" @click="callToInput"/>
                </div>
            </div>
        </div>
        <defaultModal :modalProps="modalData" v-if="modalData !== ''"/>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import headerTodo from './components/headerTodo.vue'
import todoInput from './components/todoInput.vue'
import todoBtn from './components/todoBtn.vue'
import defaultModal from '@/components/modals/defaultModal.vue'
    export default {
        components:{
            headerTodo,
            todoInput,
            todoBtn,
            defaultModal
        },
        data(){
            return{
                priorityValues:[
                    {
                        'title':'Low',
                        'bgColor':'#4CAF50'
                    },
                    {
                        'title':'Medium',
                        'bgColor':'#E67500'
                    },
                    {
                        'title':'High',
                        'bgColor':'#FF127F'
                    },
                ],
                todoData:[],
                priorityData:{
                    'name':'Priority',
                    'value':'',
                    'validation': ''
                },
                validationStatus:[],
                taskDate: '2021.08.25',
                todoId: Date.now(),
                modalData:''
            }
        },
        methods:{
            async getTodoData(todoChildData){
                this.todoData.push(todoChildData)
            },
            async checkData(){
                this.validationStatus = true
                this.modalData = ""
                await this.todoData.forEach(data => {
                    data.validation = true
                    if(data.value == ''){
                        this.validationStatus = false
                        data.validation = false
                    }
                });
                if(await this.validationStatus){
                    this.sendToDB()
                }
                else{
                    this.modalData = {
                        title:'Failed',
                        text:'Complete the form correctly',
                        icon:'http://cdn.haba.usermd.net/os/icons/sad-face.svg',
                        timeout:4000
                    }
                }
            },
            async callToInput(){
                this.todoData = []
                this.todoData.push(this.priorityData)
                await this.emitter.emit('getData',)
                await this.checkData()
            },
            sendToDB(){
                let objectTodoData = Object.assign({}, this.todoData)
                db.collection('admin').doc('todo').collection(this.taskDate).doc(this.todoId.toString()).set(
                    objectTodoData
                )
                .then(()=>{
                    console.log('asdasd');
                    this.modalData = {
                        title:'Succes',
                        text:'Your data has been successfully sent!',
                        icon:'http://cdn.haba.usermd.net/os/icons/happy-face.svg',
                        timeout:4000
                    }
                })
                console.log('sending...');
            }
        },
        mounted(){
            this.emitter.on('getTodoDate', this.getTodoData)
        }
        
    }
</script>

<style>
.calendar-todo-cover,
.calendar-todo-container,
.calendar-todo-main{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    background-color: #FFF;
    border-radius: 20px;
    transition: 0.5s ease all;
}
.calendar-todo-cover--dark{
    background-color: #3e424da2;
    color: #FFF;
}
.calendar-todo-container{
    position: absolute;
    bottom: 0;
    padding: 2rem 1.5rem 1.5rem;
    height: 480px;
    background-color: #662B65;
}
.calendar-todo-main{
    bottom: 0;
    max-height: 400px;
    border-radius: 20px;
    padding: 2rem 1.5rem 1.5rem;
    background-color: #22252d;

}
.calendar-todo-main__column{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.calendar-todo-main__column--column{
    flex-direction: row;
}
.calendar-todo-main__column label{
    margin-bottom: 0.5rem;
}
.calendar-todo-main__column input,
.calendar-todo-main__column textarea{
    padding: 0.3rem;
    background-color: rgba(255, 255, 255, 0);
    color: #FFF;
    border-bottom:1px solid #662B65;
}
.calendar-todo-main__column textarea{
    resize: none;
    height: 90px;
}
.calendar-todo-column-title,
.calendar-todo-main__column label {
    font-size: 0.9rem;
    font-weight: bold;
}

.calendar-todo-main__column input[type=radio]{
    display: none;
}
.calendar-todo-buttons-wrapper{
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
}
.todo-button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    color:#FFF;
}
.todo-button--active{
    transition: 0.5s ease width;
    border-radius: 100px;
    width: 90px;
    border:2px solid rgb(255, 255, 255);
}
.calendar-todo-footer{
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: rgba(196, 196, 196, 0.06);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

}
.todo-input-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.validation-alert{
    font-size: 0.7rem;
}
</style>