<template>
    <div class="os-appBox">
        <calculator v-if="app == 'calculator'" id="app-calculator"  @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-calculator')"/>
        <weather v-if="app == 'weather'" id="app-weather" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-weather')"/>
        <music v-if="app == 'music'" id="app-music" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-music')" />
    </div>
</template>

<script>
import calculator from '../../app/system/calculator/components/Calculator.vue'
import weather from '../../app/system/weather/components/WeatherApp.vue'
import music from '../../app/system/music/components/musicHome.vue'
    export default {
        name:'runApp',
        components:{
               calculator,
               weather,
               music
        },
        props:{
            app:String
        },
        methods: {
            moveToDesktop(){
                if(this.app != ''){
                    console.log('asdasd');
                        let appBox = document.querySelector('.os-appBox ' + '.'+this.app)
                        document.querySelector('.os-main-window').appendChild(appBox.parentElement)
                        appBox.classList.add('app-top-index')
                }
            },
            dragging(e){
                let item = e.target
                this.removeTopPositionFromOther()
                item.classList.add('app-top-index')

            },
            drop(e){
                console.log(e);
                let left, top, item
                item = e.target
                left = e.x
                top = e.y
                
                if(left <= item.offsetWidth /2){
                    left = item.offsetWidth / 2
                }
                if(left >= window.innerWidth - item.offsetWidth / 2){
                    left = window.innerWidth - item.offsetWidth / 2
                }
                if(top <= 0){
                    top = 0
                }
                if(top >= window.innerHeight - item.offsetHeight / 2){
                    top = window.innerHeight - item.offsetHeight
                }
                item.style.top = top + 'px'
                item.style.left = left + 'px'
                item.style.transform = 'translate(-50%,0)'
            },
            addTopPosition(id){
                this.removeTopPositionFromOther()
                document.querySelector('#'+id).classList.add('app-top-index')
            },
            removeTopPositionFromOther(){
                let items = document.querySelectorAll('.app-top-index')
                items.forEach((item)=>{
                    item.classList.remove('app-top-index')
                })
            }
        },
        mounted(){
            this.moveToDesktop()
        }
    }
</script>

<style scoped>
.app-top-index{
    z-index: 400;
}
</style>