<template>
    <div class="os-appBox">
        <calculator v-if="app == 'calculator'" id="app-calculator"  @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-calculator')"/>
        <weather v-if="app == 'weather'" id="app-weather" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-weather')"/>
        <music v-if="app == 'music'" id="app-music" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-music')" />
        <account v-if="app == 'account'" id="settings-account" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('settings-account')" />
    </div>
</template> 

<script>
import calculator from '../../app/system/calculator/components/Calculator.vue'
import weather from '../../app/system/weather/components/WeatherApp.vue'
import music from '../../app/system/music/components/musicHome.vue'
import account from '../settings/Account.vue'
    export default {
        name:'runApp',
        components:{
               calculator,
               weather,
               music,
               account
        },
        props:{
            app:String
        },
        methods: {
            moveToDesktop(){
                if(this.app != ''){
                    console.log(this.app);
                        let appBox = document.querySelector('.os-appBox ' + '.'+this.app)
                    console.log(appBox);
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
                let left, top, item, padding
                item = e.target
                left = e.x
                top = e.y
                padding = 10
                if(left <= (item.offsetWidth /2) + padding){
                    left = (item.offsetWidth / 2) + padding
                }
                if(left >= window.innerWidth - padding - item.offsetWidth / 2){
                    left = window.innerWidth - padding - item.offsetWidth / 2
                }
                if(top <= padding){
                    top = padding
                }
                if(top >= window.innerHeight - item.offsetHeight - 60 - padding){
                    top = window.innerHeight - item.offsetHeight - 60 - padding
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