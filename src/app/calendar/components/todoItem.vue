<template>
    <div class="calendar-todo-item" :class="'border-color--'+todoData.priority">
            <div class="item-priority-wrapper"><p class="bg-color" :class="'bg-color--'+todoData.priority">{{todoData.priority}}</p></div>
            <h3 class="calendar-todo-item-title">
                {{todoData.title}}
            </h3>
            <p class="calendar-todo-item-description">
                {{todoData.description}}
            </p>
    </div>
</template>

<script>
    export default {
        props:['todoData']
    }
</script>

<style scoped>
.calendar-todo-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 75px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--bg-theme--app-second);
    border-left: 6px solid #E67500;
    font-size: 0.8rem;
    border-radius: 5px;
    color:var(--font-main-color);
    word-break: break-all;
}
.calendar-todo-item-title{
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
}
.item-priority-wrapper{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.2rem;
    width: 100%;
}
.calendar-todo-item-description{
    color: var(--font-second-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
}
.bg-color{
    padding: 0.1rem 0.5rem;
    border-radius: 100px;
    font-size: 0.7rem;
    color:#FFF;
}
.bg-color--Low{
    background-color: #4CAF50;
}
.bg-color--Medium{
    background-color: #E67500;
}
.bg-color--High{
    background-color: #FF127F;
}
.border-color--Low{
    border-color: #4CAF50;
}
.border-color--Medium{
    border-color: #E67500;
}
.border-color--High{
    border-color: #FF127F;
}
</style>