<template>
    <div class="os-modal bg-theme" v-if="modalStatus">
        <div class="os-modal-time-bar-wrapper">
            <div class="time-bar" :style="{'animation-duration': (modalProps.timeout / 1000) +'s'}"></div>
        </div>
        <div class="os-modal-header">
            <div class="os-modal-header__image-box">
                <span class="icon" :style="{'background-image' : 'url('+ modalProps.icon +')'}"></span>
            </div>
            <p class="os-modal-title">{{modalProps.title}}</p>
        </div>
        <div class="os-modal-body">
            <p class="os-modal-text">
                {{modalProps.text}}
            </p>
        </div>
        <div class="os-modal-footer">
                <btn btnBgColor="#FF0000" btnTitle="No" btnFontColor="#FFFFFF" @click="runEvent(false)" />
                <btn btnBgColor="#FFFFFF" btnTitle="Yes" btnFontColor="#662B65" @click="runEvent(true)"/>
        </div>
    </div>
</template>

<script>
import btn from '@/components/system/singleButton.vue'
    export default {
        props:['modalProps'], //timeout, icon,title,text
        data(){
            return{
                modalStatus: true,
            }
        },
        components:{
            btn
        },
        methods:{
            timeoutModal(){
                setTimeout(()=>{
                    this.runEvent(false)
                },this.modalProps.timeout)
            },
            runEvent(status){
                this.modalStatus = false
                this.emitter.emit(this.modalProps.doEmitFunction, status)
            },
        },
        mounted(){
            this.timeoutModal()
        }

    }
</script>

<style scoped>
.os-modal{
    position: fixed;
    top: 5px;
    left: 50%;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%);
    z-index: 999;
    width: 320px;
    height: auto;
    max-height: 400px;
    padding: 1rem;
    border-radius: 20px;
    letter-spacing: 0.1rem;
    box-shadow: 0 5px 8px 2px rgba(39, 39, 39, 0.479);
}
.os-modal-time-bar-wrapper{
    height: 3px;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.158);
}
.time-bar{
    height: 100%;
    width: 100%;
    background-color: #FFF;
    animation: timeBar linear forwards;
    border-radius: 100px;
}
@keyframes timeBar{
    0%{
        width: 100%;
    }
    100%{
        width: 0px;
    }
}
.os-modal-header{
    display: flex;
    align-items: center;
}
.os-modal-header__image-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.247);
}
.icon{
    width: 25px;
    height: 25px;
}
.os-modal-title{
    font-weight: bold;
    font-size: 1.4rem;
}
.os-modal-body{
    padding: 1rem 0;
}
.os-modal-text{
    font-size: 0.9rem;
}
.os-modal-footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>