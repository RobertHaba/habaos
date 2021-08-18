<template>
    <div class="calendar-todo-item">
            <p class="calendar-todo-item-time">11:00-13:00</p>
            <h3 class="calendar-todo-item-title">
                Wizyta u mechanika
            </h3>
            <p class="calendar-todo-item-description">
                Zrobić przegląd zawieszenia i wymienić opony
            </p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.calendar-todo-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 75px;
    max-height: 100px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #393939;
    border-left: 6px solid #E67500;
    font-size: 0.8rem;
    color:#FFF;
}
.calendar-todo-item-title{
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
}
.calendar-todo-item-time{
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
.calendar-todo-item-description{
    color: rgb(184, 184, 184);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
}
</style>