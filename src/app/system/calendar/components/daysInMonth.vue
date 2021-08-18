<template>
    <div class="calendar-days-container">
        <div class="calendar-days-column">
            <p class="calendar-days-column__item calendar-days-column__item--name" v-for="dayName in daysName" :key="dayName">
                {{dayName}}
            </p>
        </div>
        <div class="calendar-days-column" v-for="weeks in allDaysCalendar" :key="weeks">
            <p class="calendar-days-column__item" v-for="day in weeks" :key="day" :class="{'calendar-days-column__item--active' : day == activeDay, 'calendar-days-column__item--active-day' : day[1] == 'active-day', 'calendar-days-column__item--others' : day[1] == 'others'}" @click="activeDay = day, runTodoChangeDate()">
                {{day[0]}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['today', 'actuallyMonthNumber'],
        data(){
            return{
                thisMonthDayNumberEnd:'',
                daysArray:'',
                daysName:[
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun'
                ],
                dayName:'',
                todayMonthNumber:'',
                dayNumber:'',
                todayIndexOfWeek:'',
                firstDayIndexOfWeek:'',
                activeDay:'',
                day: new Date(),
                allDaysCalendar:[],
            }
        },
        methods:{
            getDaysValue(){
                this.dayNumber = this.day.toLocaleString('en-us',{day:'numeric'}) // day number
                this.todayMonthNumber = this.day.toLocaleString('en-us',{month:'numeric'})
                
                this.dayName = this.day.toLocaleString('en-us', {weekday:'short'})
                this.activeDay = this.dayNumber
                this.year = this.day.toLocaleString('en-us',{year:'numeric'})
                console.log(this.year);
                let firstDayNameOfMonth = new Date(Date.UTC(this.year,this.todayMonthNumber-1,1)).toLocaleString('en-us',{weekday:'short'})

                this.todayIndexOfWeek = this.indexOfWeekdays(this.dayName)
                this.firstDayIndexOfWeek = this.indexOfWeekdays(firstDayNameOfMonth)

                this.thisMonthDayNumberEnd = new Date(this.dayNumber, this.todayMonthNumber, 0).getDate()
                let previousMonthDayStart = new Date(Date.UTC(this.day.toLocaleString('en-us',{year:'numeric'}),this.todayMonthNumber-1,-this.firstDayIndexOfWeek + 2)).toLocaleString('en-us',{day:'numeric'})
                let previousMonthDayEnd = new Date(Date.UTC(this.day.toLocaleString('en-us',{year:'numeric'}),this.todayMonthNumber-1,0)).toLocaleString('en-us',{day:'numeric'})
                console.log(previousMonthDayStart);
                console.log(previousMonthDayEnd);
                console.log(this.thisMonthDayNumberEnd);
                if(this.firstDayIndexOfWeek !== 1){
                    this.allDays(previousMonthDayStart, previousMonthDayEnd, 'others')
                }
                this.allDays(1, this.thisMonthDayNumberEnd, 'active-month')
                this.allDays(1, 16, 'others')
                this.allDaysInWeek()
                console.log(this.allDaysCalendar);
            },
            indexOfWeekdays(day){
                let value
                this.daysName.filter((item, index)=>{
                    if(item == day){
                        console.log(index);
                        value = index +1
                    }
                })
                return value
            },
            allDays(indexStart, indexEnd, type){
                do{
                    if(type == 'active-month' && indexStart == this.dayNumber && this.actuallyMonthNumber == this.todayMonthNumber){
                        this.allDaysCalendar.push([parseInt(indexStart), 'active-day'])
                    }
                    else{
                        this.allDaysCalendar.push([parseInt(indexStart), type])
                    }
                    indexStart++
                }while(indexStart <= indexEnd)
                
            },
            allDaysInWeek(){
                const chunk = (a,n)=>[...Array(Math.ceil(a.length/n))].map((_,i)=>a.slice(n*i,n+n*i));
                this.allDaysCalendar = chunk(this.allDaysCalendar,7).slice(0,6)
            },
            runTodoChangeDate(){
                console.log(this.todayMonthNumber);
                this.emitter.emit('todoChangeDate',new Date(this.year, this.todayMonthNumber -1, this.activeDay[0] + 1))
            }

        },
        mounted(){
            setTimeout(()=>{
                this.getDaysValue()
                
            }, 50)
            this.emitter.on('changeActiveMonth',(month)=>{
                this.todayMonthNumber = month
                this.allDaysCalendar = []
                this.day = new Date(this.year, this.todayMonthNumber, this.today)
                console.log(this.activeDay[0]);
                this.getDaysValue()
                setTimeout(() => {
                    this.emitter.emit('todoChangeDate',new Date(this.year, this.todayMonthNumber - 1, parseInt(this.today) + 1))
                }, 50);
            })
            
        }
    }
</script>

<style scoped>
.calendar-days-container{
    position: relative;
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #323232;
    border-radius: 20px;
}
.calendar-days-column{
    display: grid;
    grid-template-columns: repeat(7,1fr);
    justify-items: center;
    margin: 0.3rem 0;
    font-size: 0.85rem;
}
.calendar-days-column__item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
}
.calendar-days-column__item--name{
    width: auto;
    height: auto;
}
.calendar-days-column__item--others{
    color: rgba(206, 206, 206, 0.6);
}
.calendar-days-column__item--active-day{
    font-weight: bold;
    border-bottom: 3px solid #662b65;
}
.calendar-days-column__item--active{
    font-weight: bold;
    background-color: #662b65;
    border-radius: 100%;
}
</style>