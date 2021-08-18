<template>
    <div>
        <monthLists :actuallyMonth="actuallyMonth"/>
        <monthDays :today="today" :actuallyMonthNumber="actuallyMonthNumber"/>
    </div>
</template>

<script>
import monthLists from "./monthLists.vue"
import monthDays from "./daysInMonth.vue"
export default {
    props:{
        actuallyMonth: String,
        today: String,
        actuallyMonthNumber: String,
    },
    components:{
        monthLists,
        monthDays
    }
    }
</script>

<style scoped>

</style>