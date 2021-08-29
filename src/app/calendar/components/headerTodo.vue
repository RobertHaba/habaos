<template>
    <p class="calendar-todo-header">
        {{headerTitle}}
    </p>
</template>

<script>
    export default {
        props:{
            headerTitle: String
        }
    }
</script>

<style scoped>
.calendar-todo-header{
    font-size: 1.2rem;
    font-weight: bold;
}
</style>