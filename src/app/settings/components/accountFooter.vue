<template>
    <div class="footer" >
        <systemButton imgURL="https://cdn.haba.usermd.net/os/icons/close.svg" btnClass="btn--negative" btnText="Cancel" @click="cancelData()"/>
        <systemButton imgURL="https://cdn.haba.usermd.net/os/icons/check.svg" btnClass="btn--positive" btnText="Save" @click="sendData()"/>
    </div>  
</template>

<script>
import systemButton from './accountButton.vue'
    export default {
        components:{
            systemButton
        },
        methods:{
            sendData(){
                this.emitter.emit('accountSaveData')
            },
            cancelData(){
                this.emitter.emit('cancelData')
            }
        }
    }
</script>

<style scoped>
.footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0 1rem;
    background-color: rgba(134, 134, 134, 0.164);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}
</style>