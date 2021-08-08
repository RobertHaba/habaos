<template>
    <div class="widgets-category">
        <categoryTitle title="Widgets" imgURL="http://cdn.haba.usermd.net/os/icons/widgets.svg"/>
        <div class="widgets-container">
            <div class="widget widget--music">
                <widgetMusic />
            </div>
            <div class="widget widget--weather">
                <widgetWeather />
            </div>
        </div>
        <hr class="horizontal-line">
    </div>
</template>

<script>
import categoryTitle  from './categoryTitle.vue'
import widgetMusic  from './widgets/music.vue'
import widgetWeather  from './widgets/weather.vue'
    export default {
        components:{
            categoryTitle,
            widgetMusic,
            widgetWeather
        }
    }
</script>

<style scoped>
.horizontal-line{
    margin-top: 1rem;
}
.widgets-container{
    display: flex;
}
.widget{
    width: 120px;
    height: 80px;
    padding: 0.5rem;
    border-radius: 10px;
    margin-right: 1rem;
}
.widget--music{
    background-color: rgba(250, 0, 255, 0.33);
}
.widget--weather{
    background-color: rgba(0, 209, 255, 0.33);
}
</style>