<template>
    <section class="calendar calendar-container app-container" :class="'calendar-container--' + theme">
        <headerApp :today="todayDate" :actuallyDay="actuallyDay"/>
        <calendarBody :actuallyMonth="actuallyMonth" :today="dayNumber" :actuallyMonthNumber="monthNumber"/>
        <todoList :today="todayDate"/>
        <todoAdd v-if="openTodoEditor" :activeDate="activeDate" :addSettings="todoAddViewSettings"/>
        <todoView v-if="todoView" :todoData="todoData"/>
    </section>
</template>

<script>
import headerApp from '../components/header.vue'
import calendarBody from './components/calendarBody.vue'
import todoList from './components/todoList.vue'
import todoAdd from '../components/windowAddForm.vue'
import todoView from './todoView.vue'
    export default {
        data(){
            return{
                theme: 'dark',
                todayDate: '',
                actuallyMonth:'',
                day:'',
                dayNumber:'',
                openTodoEditor: false,
                todoView: false,
                activeDate:'',
                todoData:'',
                
                todoAddViewSettings:{
                    title:'Create a new task.',
                    editorTitle:'Edit task',
                    app:'todoApp',
                    inputs:[
                        {
                            inputName:'Title',
                            inputTag:'input',
                            inputType:'text',
                            inputPlaceholder:'Add your title',
                            inputMinLength:4,
                            inputMaxLength:40,
                            emitUseName:'getTodoDate',
                            emitCreateName:'getDataTodoInput',
                            editDataTitle:'title'

                        },
                        {
                            inputName:'Description',
                            inputTag:'textarea',
                            inputType:'',
                            inputPlaceholder:'Add your description',
                            inputMinLength:4,
                            inputMaxLength:280,
                            emitUseName:'getTodoDate',
                            emitCreateName:'getDataTodoInput',
                            editDataTitle:'description'

                        }
                    ],
                    emits:{
                        input:'getDataTodoInput',
                        resetData:'resetDataInCalendarApp',
                        openEditor:'openTodoEditor',
                        getData:'getTodoDate',
                        edit:'editTodo'
                    },
                    tagValues:[
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
                    editData:{
                        title:'',
                        description:''
                    },
                    tagData:{
                        'name':'Priority',
                        'value':'',
                        'validation': ''
                    },
                    editMode:false,
                }
            }
        },
        components:{
            headerApp,
            calendarBody,
            todoList,
            todoAdd,
            todoView
        },
        methods:{
            getToDayTime(){
                this.day = new Date()
                this.dayNumber = this.day.toLocaleString('en-us', {day:'numeric'})
                this.monthNumber = this.day.toLocaleString('en-us', {month:'numeric'})
                this.todayDate = this.day.toJSON().slice(0,10).replace(/-/g,'.');
                this.actuallyMonth =this.day.toLocaleString('en-us', {month:'long'})
                this.actuallyDay =this.day.toLocaleString('en-us', {weekday:'long'})
            },
        },
        mounted(){
            this.getToDayTime()
            this.emitter.on('openTodoEditor',(data)=>{
                this.openTodoEditor = data.status
                this.activeDate = data.value
            })
            this.emitter.on('openTodoView',(data)=>{
                this.todoView = data.status
                this.todoData = data.value
            })
            this.emitter.on('resetDataInCalendarApp',()=>{
                this.emitter.emit('todoListUpdateData')
                this.emitter.emit('todoMonthDaysUpdateData')
            })
        }
    }
</script>

<style scoped>
.calendar-container{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem 1.5rem;
    background-color: #FFF;
    border-radius: 20px;
    transition: 0.5s ease all;
}
.calendar-container--dark{
    background-color: #22252D;
    color: #FFF;
}
</style>