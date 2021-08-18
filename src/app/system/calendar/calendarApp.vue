<template>
    <section class="calendar calendar-container app-container" :class="'calendar-container--' + theme">
        <headerApp :today="todayDate" :actuallyDay="actuallyDay"/>
        <calendarBody :actuallyMonth="actuallyMonth" :today="dayNumber" :actuallyMonthNumber="monthNumber"/>
        <todoBody :today="todayDate"/>
    </section>
</template>

<script>
import headerApp from './components/header.vue'
import calendarBody from './components/calendarBody.vue'
import todoBody from './components/todoBody.vue'
    export default {
        data(){
            return{
                theme: 'dark',
                todayDate: '',
                actuallyMonth:'',
                day:'',
                dayNumber:''
            }
        },
        components:{
            headerApp,
            calendarBody,
            todoBody
        },
        methods:{
            getToDayTime(){
                this.day = new Date()
                this.dayNumber = this.day.toLocaleString('en-us', {day:'numeric'})
                this.monthNumber = this.day.toLocaleString('en-us', {month:'numeric'})
                this.todayDate = this.day.toJSON().slice(0,10).replace(/-/g,'.');
                this.actuallyMonth =this.day.toLocaleString('en-us', {month:'long'})
                this.actuallyDay =this.day.toLocaleString('en-us', {weekday:'long'})
                console.log(this.actuallyMonth);
                console.log( this.todayDate);
                console.log( this.actuallyDay);
            }
        },
        mounted(){
            this.getToDayTime()
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