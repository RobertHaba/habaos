<template>
    <div class="weather container" :class="'container--' + theme">
        <section class="weather-container" :class="'weather-container--' + theme"  v-if="weather !== ''">
            <div class="weather-options">
                <button class="switch-button" title="Change theme to Light" aria-label="Change theme to Light" @click="theme = 'light'">
                    <span class="theme-icon i-light"></span>
                </button>
                <button class="switch-button" title="Change theme to Dark" aria-label="Change theme to Dark" @click="theme = 'dark'">
                    <span class="theme-icon i-dark"></span>
                </button>
            </div>
            <div class="weahter-wallpaper">
                <div class="weather-sun"></div>
                <div class="wallpaper-icon i-cloud"></div>
                <div class="wallpaper-icon wallpaper-icon--small i-cloud"></div>
            </div>
            <header class="weahter-header">
                <h2 class="weahter-header__title">{{city}}</h2>
                <p class="weahter-header__temperature"> {{weather.current.temp_c}} <span class="temperature-dot"></span></p>
                <p class="weahter-header__info">{{weather.current.condition.text}}</p>
            </header>
            <ul class="weather-details-list" v-if='weatherDetails != ""'>
                <Details :object="weatherDetails"></Details>
            </ul>
            <ul class="sun-details">
                <Details :object="sunDetails"></Details>
                <div class="line"></div>
            </ul>
            <div class="hours-wrapper hours-weather" draggable="true" ondragstart="event.preventDefault(); event.stopPropagation();">
                <h3 class="hours-weather__title">Today</h3>
                <div class="hours-weather-wrapper">
                    <ul class="hours-weather__list">
                        <List :object="todayWeatherInHours" orientation="vertical" :theme="theme"/>
                    </ul>
                </div>
            </div>
            <div class="week-weather-wrapper" draggable="true" ondragstart="event.preventDefault(); event.stopPropagation();">
                <ul class="week-weather-list">
                    <List :object="weekWeather" orientation="horizontal" :theme="theme"/>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import Details from './lists/Details'
import List from './lists/List'
export default {
    data(){
        return{
            weatherDetails:'',
            sunDetails:[
                {id:0, text:'', icon:'morning-sun', iconPosition:'left'},
                {id:1, text:'', icon:'moon',iconPosition:'right', itemPosition:'right'},
            ],
            todayWeatherInHours:[
            ],
            weekWeather:[
            ],
            theme:'light',
            city:'',
            geolocationCoordinates: '',
            sun:'',
            weather:'',
            utcOffset: ''
        }
    },
    components:{
        Details,
        List
    },
    methods:{
        checkIfBrowserIsSetToDarkMode(){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark'
            }
        },
        getCity(){
                this.city = JSON.parse(sessionStorage.getItem('userData')).location
                this.getWeather()
                
        },
        getWeather(){
            fetch('http://api.weatherapi.com/v1/forecast.json?key=5b4fe3990258407d8ee214311212005&q=' + this.city + '&days=3&aqi=no&alerts=no')
            .then(res => res.json())
            .then(data=>{
                let resWeather = data
                this.weather = resWeather
                console.log(resWeather);
                this.getCurrentWeatherDetails()
                this.getSunsetAndSunrise()
                this.todayWeatherInHours = this.getForecastWeather(resWeather.forecast.forecastday[0].hour)
                this.weekWeather = this.getForecastWeather(resWeather.forecast.forecastday)
            })
            
        },
        getSunsetAndSunrise(){
            this.sunDetails[0].text = this.changeTimeFormat(this.weather.forecast.forecastday[0].astro.sunrise)
            this.sunDetails[1].text = this.changeTimeFormat(this.weather.forecast.forecastday[0].astro.sunset)
        },
        changeTimeFormat(time){
            let switchHour,timeArray
            if(time.includes('PM')){
                timeArray = time.split(':')
                switchHour = parseInt(timeArray[0]) + 12
                timeArray[0] = switchHour
                return timeArray.join(':').replace('PM','')
            }
            else{
                return time.replace('AM','')
            }
        },
        getCurrentWeatherDetails(){
            this.weatherDetails = [
                {id:0, text:this.weather.forecast.forecastday[0].day.daily_chance_of_rain + '%', icon:'water-drop', iconPosition:'left'},
                {id:1, text:this.weather.current.pressure_mb + ' mBar', icon:'down-arrow',iconPosition:'left'},
                {id:2, text:this.weather.current.wind_kph + ' km/h', icon:'wind',iconPosition:'left'}
            ]
        },
        getForecastWeather(weather){
            let weatherArray = []
            weather.forEach((el,index)=>{
                weatherArray.push({
                    id: index,
                    text: (el.day)?this.epochToDate(el.date_epoch):index + ':00',
                    icon: (el.condition !== undefined)? el.condition.icon : el.day.condition.icon,
                    mainTemperature: (el.temp_c !== undefined)? el.temp_c : el.day.avgtemp_c,
                    nightTemperature: (el.hour !== undefined)? el.hour[23].temp_c : ''
                })
            })
            return weatherArray
        },
        epochToDate(time){
            let d = new Date(0)
            d.setUTCSeconds(time)
            return d.toLocaleString("PL", {weekday: "long"})
        }
    },
    mounted(){
        this.checkIfBrowserIsSetToDarkMode()
        this.getCity()
            this.emitter.on('updateLocationInWeatherApp',()=>{
                this.getCity()
            })
        
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
 width: 9px;
 height: 9px;
}
::-webkit-scrollbar-thumb {
 background: linear-gradient(154deg, #ffb77e 8%, #ff5ba3 62%);
 border-radius: 15px;
}
::-webkit-scrollbar-track{
 background: #ffffff;
 border-radius: 15px;
 box-shadow: inset 7px 10px 12px #f0f0f0;
}
.container{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  color: #445b77;
  transition: 0.5s ease all;
}
.weather-container{
    position: relative;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem;
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.weather-container--dark{
    background-color: #22252D;
    color: #FFF;
}
.weahter-header{
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    z-index: 5;
}
.weahter-header__title{
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
}
.weahter-header__temperature{
    position: relative;
    font-size: 4rem;
    font-weight: 500;
    color: #1f3b5e;
}

.weather-container--dark .weahter-header__temperature{
    color: #FFF;
}
.temperature-dot{
    position: absolute;
    margin-left: -0.5rem;
    width: 13px;
    height: 13px;
    transform: translateX(100%);
    border:2px solid #273a52;
    border-radius: 100px;
}
.weather-container--dark .temperature-dot{
    border-color: #DDD;
}
.weahter-header__info{
    padding: 0.5rem 1rem;
    width: max-content;
    background-color: #F7F7F7;
    border-radius: 100px;
    font-size: 0.8rem;
}
.weather-container--dark .weahter-header__info{
    background-color: #2b3458;
}
.weahter-wallpaper{
    position: absolute;
    top:0;
    right: 0;
    width: 180px;
    height: 210px;
    max-width: 220px;
    border-top-right-radius: 20px;
    overflow: hidden;
}
.weather-sun{
    position: absolute;
    top:-20px;
    right: -60px;
    width: 190px;
    height: 190px;
    border-radius: 100%;
    background-image: linear-gradient(135deg, #ffb77e, #ff5ba3);
    box-shadow: 0 0 25px 1px #ffb87ead;
}

.wallpaper-icon{
    position: absolute;
    bottom: 40px;
    width: 130px;
    height: 130px;
    background-size: 100%;
    background-image: url('../assets/icons/cloud.svg');
    opacity: 0.98;
    animation: cloudWind 1.7s ease-in infinite;
}
.wallpaper-icon--small{
    top: 0;
    right: -40px;
    width: 90px;
    height: 90px;
}
@keyframes cloudWind {
    0%{
        transform: translateY(-3px);
    }
    50%{
        transform: translateY(3px);
    }
    100%{
        transform: translateY(-3px);
    }
}
.weather-details-list{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
}
.sun-details{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 2rem;
}
.line{
    position: absolute;
    top:1.5rem;
    left:-1.5rem;
    width: calc(100% + 3rem);
    height:50px;
    background-image: url('../assets/icons/line.svg');
    background-repeat: no-repeat;
    opacity: 0.4;
}
.hours-weather__title{
    font-size: 0.9rem;
    color: #526781b6;
}
.hours-weather-wrapper{
    position: relative;
    display: flex;
    width: 100%;
    overflow-x: auto;
}
.hours-weather__list{
    position: relative;
    display: flex;
    padding: 1rem 0;
}
.week-weather-wrapper{
    position: relative;
    margin-top: 2rem;
    height: 100px;
    overflow-y: auto;
}
.theme-icon{
    display: block;
    width: 1rem;
    height: 1rem;
    background-size: 100%;
}
.container--dark .switch-button .theme-icon{
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
          filter: invert(100%);
}
.i-light{
    background: url('../assets/icons/light.svg');
}
.i-dark{
    background: url('../assets/icons/dark.svg');
}

.weather-options{
    position: absolute;
    top:-2rem;
    left:50%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 80px;
    transform: translateX(-50%);
    z-index: 100099;
}
.switch-button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 35px;
    border: none;
    transition: 0.5s ease all;
}
.weather-container--dark .switch-button{
    background-color: #292D36;
}
.switch-button:first-child{
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
}
.switch-button:last-child{
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
}

.switch-button:focus{
    background-color: #DDD;
}

.weather-container--dark .switch-button:focus{
    background-color: rgb(78, 78, 78);
}
</style>