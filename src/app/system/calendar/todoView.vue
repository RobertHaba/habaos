<template>
    <div class="calendar-todo-cover calendar-todo-cover--dark" @click.self="closeTodoEditor()" >
        <div class="calendar-todo-container" >
            <headerTodo :headerTitle="headerTitleText" />
            <div class="calendar-todo-main" >
            </div>
        </div>
    </div>
</template>

<script>
import headerTodo from './components/headerTodo.vue'
    export default {
        props:{
            activeDate: String
        },
        components:{
            headerTodo,
        },
        data(){
            return{
                headerTitleText:'Task view'
            }
        },
        methods:{
            closeTodoEditor(){
                this.emitter.emit('openTodoView',false)
            }
        }
        
    }
</script>

<style>
</style>