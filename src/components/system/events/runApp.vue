<template>
    <div class="os-appBox">
            <component :is="app" :v-if="app" :id="'app-'+app" @dragstart="dragging" @dragend='drop' draggable='true' @click="addTopPosition('app-'+app)"/>
    </div>
</template> 

<script>
import calculator from '@/app/calculator/components/Calculator.vue'
import weather from '@/app/weather/components/WeatherApp.vue'
import music from '@/app/music/components/musicHome.vue'
import account from '@/app/settings/Account.vue'
import calendar from '@/app/calendar/calendarApp.vue'
import bookmark from '@/app/bookmark/bookmarkApp.vue'
    export default {
        name:'runApp',
        components:{
               calculator,
               weather,
               music,
               account,
               calendar,
               bookmark
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
            console.log('dziala');
            this.moveToDesktop()
        }
    }
</script>

<style scoped>
.app-top-index{
    z-index: 400;
}
</style>