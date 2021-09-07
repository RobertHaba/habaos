<template>
<div class="calendar-days-container">
    <div class="calendar-days-column">
        <p class="calendar-days-column__item calendar-days-column__item--name" v-for="dayName in daysName" :key="dayName">
            {{dayName}}
        </p>
    </div>
    <div class="calendar-days-column" v-for="weeks in allDaysCalendar" :key="weeks">
        <p class="calendar-days-column__item" v-for="day in weeks" :key="day[2]" :class="{'calendar-days-column__item--active' : day[2] == activeDay[2], 'calendar-days-column__item--active-day' : day[1] == 'active-day','calendar-days-column__item--others': day[1] == 'others', 'calendar-days-column__item--has-todo':day[3]}" @click="activeDay = day, runTodoChangeDate(day[2])">
            {{daysWithTodo.id}}
            {{day[0]}}
        </p>
    </div>
</div>
</template>

<script>
import {
    db
} from '@/firebaseDB';
export default {
    props: ['today', 'actuallyMonthNumber'],
    data() {
        return {
            thisMonthDayNumberEnd: '',
            daysArray: '',
            daysName: [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun'
            ],
            dayName: '',
            activeMonthNumber: '',
            dayNumber: '',
            todayIndexOfWeek: '',
            firstDayIndexOfWeek: '',
            activeDay: '',
            day: new Date(),
            allDaysCalendar: [],
            daysWithTodo: '',
            todos: ''
        }
    },
    inject: ['account'],
    methods: {
        getDaysValue() {
            this.dayNumber = this.day.toLocaleString('en-us', {
                day: 'numeric'
            }) // day number
            this.activeMonthNumber = this.day.toLocaleString('en-us', {
                month: 'numeric'
            })

            this.dayName = this.day.toLocaleString('en-us', {
                weekday: 'short'
            })
            this.activeDay = (this.activeDay == '') ? this.dayNumber : this.activeDay
            this.year = this.day.toLocaleString('en-us', {
                year: 'numeric'
            })
            let firstDayNameOfMonth = new Date(Date.UTC(this.year, this.activeMonthNumber - 1, 1)).toLocaleString('en-us', {
                weekday: 'short'
            })

            this.todayIndexOfWeek = this.indexOfWeekdays(this.dayName)
            this.firstDayIndexOfWeek = this.indexOfWeekdays(firstDayNameOfMonth)

            this.thisMonthDayNumberEnd = new Date(this.dayNumber, this.activeMonthNumber, 0).getDate()
            let previousMonthDayStart = new Date(Date.UTC(this.day.toLocaleString('en-us', {
                year: 'numeric'
            }), this.activeMonthNumber - 1, -this.firstDayIndexOfWeek + 2)).toLocaleString('en-us', {
                day: 'numeric'
            })
            let previousMonthDayEnd = new Date(Date.UTC(this.day.toLocaleString('en-us', {
                year: 'numeric'
            }), this.activeMonthNumber - 1, 0)).toLocaleString('en-us', {
                day: 'numeric'
            })
            if (this.firstDayIndexOfWeek !== 1) {
                this.allDays({
                    indexStart: previousMonthDayStart,
                    indexEnd: previousMonthDayEnd,
                    monthDifference: -1
                }, 'others')
            }
            this.allDays({
                indexStart: 1,
                indexEnd: this.thisMonthDayNumberEnd,
                monthDifference: 0
            }, 'active-month')
            if (this.activeMonthNumber !== "12") {
                this.allDays({
                    indexStart: 1,
                    indexEnd: 16,
                    monthDifference: 1
                }, 'others')
            }
            this.allDaysInWeek()
        },
        indexOfWeekdays(day) {
            let value
            this.daysName.filter((item, index) => {
                if (item == day) {
                    value = index + 1
                }
            })
            return value
        },
        allDays(options, type) {
            let month = this.addZeroToFirstCharacter((parseInt(this.activeMonthNumber) + options.monthDifference))
            do {
                let day = this.addZeroToFirstCharacter(options.indexStart)
                if (type == 'active-month' && options.indexStart == this.dayNumber && this.actuallyMonthNumber == this.activeMonthNumber) {
                    this.allDaysCalendar.push([parseInt(options.indexStart), 'active-day', this.year + '.' + month + '.' + day])
                } else {
                    this.allDaysCalendar.push([parseInt(options.indexStart), type, this.year + '.' + month + '.' + day])
                }
                options.indexStart++
            } while (options.indexStart <= options.indexEnd)

        },
        allDaysInWeek() {
            const chunk = (a, n) => [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));
            this.allDaysCalendar = chunk(this.allDaysCalendar, 7).slice(0, 6)
        },
        runTodoChangeDate(newActiveData) {
            this.emitter.emit('todoChangeDate', newActiveData)
        },
        async getDataFromDB() {
            this.daysWithTodo = await db.collection(this.account + '/todoApp/todo/' + this.year.toString() + '/' + this.activeMonthNumber.toString()).get().then(snapshot => {
                let array = []
                snapshot.docs.forEach((item) => {
                    array.push(item.id)
                })
                return array
            })
            await this.addTodoPropertyToDay()
        },
        addTodoPropertyToDay() {
            this.daysWithTodo.forEach((todoDay) => {
                this.allDaysCalendar.forEach(day => {
                    day.forEach(item => {
                        if (item[0] == todoDay && (item[1] == 'active-month' || item[1] == 'active-day')) {
                            item.push('todo')
                        }
                    })
                });
            })
        },
        addZeroToFirstCharacter(date) {
            let newDate = '0' + date.toString()
            return newDate.slice(-2)
        },

    },
    mounted() {
        setTimeout(() => {
            this.getDaysValue()
            this.getDataFromDB()
        }, 50)
        this.emitter.on('changeActiveMonth', (month) => {
            this.activeMonthNumber = month
            this.allDaysCalendar = []
            this.day = new Date(this.year, this.activeMonthNumber, this.today)
            this.getDaysValue()
            let monthEmit = this.addZeroToFirstCharacter(this.activeMonthNumber)
            let day = this.addZeroToFirstCharacter(this.today)
            setTimeout(() => {
                this.emitter.emit('todoChangeDate', this.year + '.' + monthEmit + '.' + day)
                this.getDataFromDB()
            }, 50);
        })

        this.emitter.on('todoMonthDaysUpdateData', () => {
            this.allDaysCalendar = []
            this.getDaysValue()
            setTimeout(() => {
                this.getDataFromDB()
            }, 50)
        })

    }
}
</script>

<style scoped>
.calendar-days-container {
    position: relative;
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background-color: var(--bg-theme--app-second);
    border-radius: 20px;
}

.calendar-days-column {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    margin: 0.3rem 0;
    font-size: 0.85rem;
}

.calendar-days-column__item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
}

.calendar-days-column__item--name {
    width: auto;
    height: auto;
}

.calendar-days-column__item--others {
    color: var(--font-second-color);
    opacity: 0.6;
}

.calendar-days-column__item--active-day {
    font-weight: bold;
    border-bottom: 3px solid #662b65;
}

.calendar-days-column__item--has-todo::after {
    content: '';
    position: absolute;
    top: -2.5px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #E67500;
}

.calendar-days-column__item--active {
    font-weight: bold;
    background-color: #662b65;
    border-radius: 100%;
    color: #FFF;
}
</style>
