<template>
<div class="os-appBox" v-if="app!=''">
    <component :is="app" :v-if="app" :id="'app-'+app" @dragstart="dragStart($event),addTopPosition('app-'+app)" @dragend='drop' draggable='true' @click="addTopPosition('app-'+app)" />
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
    name: 'runApp',
    components: {
        calculator,
        weather,
        music,
        account,
        calendar,
        bookmark
    },
    props: {
        app: String
    },
    data() {
        return {
            highestZIndex: 0,
            dragStartPropX: 0,
            dragStartPropY: 0,
            mousePositionY: 0,
            appItem:''
        }
    },
    methods: {
        moveToDesktop() {
            if (this.app != '') {
                let appBox = document.querySelector('.os-appBox ' + '.' + this.app)
                document.querySelector('.os-main-window').appendChild(appBox.parentElement)
                appBox.classList.add('app-top-index')
                this.addTopPosition('app-' + this.app)
            }
        },
        dragStart(e) {
            console.log('DRAG START ELEMENT');
            console.log(e);
            this.dragStartPropX = {
                screenX: e.screenX,
                x: e.x
            }
            this.dragStartPropY = {
                screenY: e.screenY,
                y: e.y
            }
        },
        drop(e) {
            let left, top, item, padding
            console.log(e);
            item = e.target
            this.appItem = item
            this.getMousePosition()
            left = e.screenX - this.dragStartPropX.screenX + this.dragStartPropX.x
            top = e.screenY - this.dragStartPropY.screenY + this.dragStartPropY.y
            padding = 10
            if (left <= (item.offsetWidth / 2) + padding) {
                left = (item.offsetWidth / 2) + padding
            }
            if (left >= window.innerWidth - padding - item.offsetWidth / 2) {
                left = window.innerWidth - padding - item.offsetWidth / 2
            }
            if (top <= padding) {
                top = padding
            }
            if (top >= window.innerHeight - item.offsetHeight - 60 - padding) {
                top = window.innerHeight - item.offsetHeight - 60 - padding
            }
            item.style.top = top + 'px'
            item.style.left = left + 'px'
            item.style.transform = 'translate(-50%,0)'
            console.log(this.mousePositionY);
        },
        getMousePosition() {
            document.addEventListener('mousemove', this.setMousePosition)
        },
        setMousePosition(event) {
            console.log(event);
            this.mousePositionY = event.screenY
            document.removeEventListener('mousemove', this.setMousePosition)
            this.hideAppOnSwipeDown()
        },
        hideAppOnSwipeDown() {
            if(this.mousePositionY >= (window.innerHeight - (this.appItem.offsetHeight/2)) ){
                console.log('asdas');
                this.emitter.emit('osAppRun-'+this.app,{status:false})
            }
        },
        addTopPosition(id) {
            let osAppBoxs = document.querySelectorAll('.os-appBox')
            let appItem = document.querySelector('#' + id).parentElement
            appItem.style.zIndex = this.getHighestZIndexFromApps(osAppBoxs)
        },
        getHighestZIndexFromApps(osAppBoxs) {
            let appArray = [...osAppBoxs]
            appArray.sort((a, b) => b.style.zIndex - a.style.zIndex)[0]
            let newIndex = parseInt(appArray[0].style.zIndex)
            newIndex = (!newIndex) ? 1 : newIndex + 1
            return newIndex

        }
    },
    mounted() {
        if (this.app) {
            this.addTopPosition('app-' + this.app)
        }
        this.moveToDesktop()
    }
}
</script>

<style scoped>
.os-appBox {
    position: relative;
}
</style>
