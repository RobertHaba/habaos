<template>
    <div class="widget-tile" v-if="weather != ''">
        <div class="widget-column">
            <span class="widget-icon"><img :src="weather.condition.icon" alt=""></span>
            <p class="widget-degrees c-title">{{weather.temp_c}}°</p>
        </div>
        <p class="widget-weather-text c-subtitle">{{weather.condition.text}}</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                city:'',
                weather:''
            }
        },
        methods:{
            getWeather(){
                
                this.city = JSON.parse(sessionStorage.getItem('userData')).location
            fetch('https://api.weatherapi.com/v1/forecast.json?key=5b4fe3990258407d8ee214311212005&q=' + this.city + '&days=3&aqi=no&alerts=no')
            .then(res => res.json())
            .then(data=>{
                let resWeather = data
                this.weather = resWeather.current
                let status = (this.weather != '')? true : false
                this.$emit("checkIfWidgetItReadyChild",status)
            })
            
        },
        },
        mounted(){
            this.emitter.on('updateLocationInWidget',()=>{
                this.getWeather()
            })
        }
    }
</script>

<style scoped>
    .widget-tile{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .widget-weather-text{
        width: 100%;
        max-height: 35px;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .widget-degrees{
        font-size: 1.5rem;
    }
    .widget-column{
        display: flex;
        justify-content: space-between;
    }
    .widget-icon{
        width: 2rem;
        height: 2rem;
    }
</style>