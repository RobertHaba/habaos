<template>
    <div class="calendar-months-wrapper scroll">
        <div class="calendar-months-container">
            <div class="calendar-months-item" v-for="(month, index) in monthsArray" :key="index" :class="{'calendar-months-item--active' : month == activeMonth}" @click="activeMonthIndex = index, activeMonth = month ">
                {{month}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['actuallyMonth'],
        data(){
            return{
                monthsArray:[
                    'January',
                    'Fabruary',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                activeMonth: '',
                activeMonthIndex: ''
            }
        },
        methods:{
            scrollToActiveMonth(){
                setTimeout(()=>{
                    document.querySelector('.calendar-months-item--active').scrollIntoView({behavior: "smooth", inline: "center"})
                }, 100)
            },

        },
        watch:{
                actuallyMonth:function (){
                    this.activeMonth = this.actuallyMonth
                },
                activeMonth: function(){
                    this.scrollToActiveMonth({behavior: "smooth"})
                },
                activeMonthIndex: function(){
                        this.emitter.emit('changeActiveMonth',this.activeMonthIndex)
                }
        }
    }
</script>

<style scoped>
.calendar-months-wrapper{
    position: relative;
    display: flex;
    width: 100%;
    max-width: 320px;
    height: 50px;
    margin-top: 0.5rem;
    overflow-y: auto;
    transform: rotateX(180deg);
}
.calendar-months-container{
    position: relative;
    display: flex;
    transform: rotateX(180deg);
}
.calendar-months-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding: 0 1rem;
    margin:1rem 1rem 0 0;
    font-size: 0.8rem;
    background-color: var(--bg-theme--first);
    border-radius: 50px;
}
.calendar-months-item--active{
    background-color: var(--bg-theme--app-second);
    color: var(--font-main-color);
    font-weight: bold;
}
</style>