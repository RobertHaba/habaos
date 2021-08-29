<template>
    <div v-if="false"></div>
</template>
<script>
import { db } from '@/firebaseDB';
export default {
    data(){
        return{

        }
    },
    methods:{
        async getUserDatabase(){
            await db.collection('admin').doc('user').get().then(snapshot =>{
                sessionStorage.setItem('userData',JSON.stringify(snapshot.data()))
                })
            await this.emitter.emit('menuStartChangeImage')
            await this.emitter.emit('updateLocationInWidget')
            await this.emitter.emit('updateLocationInWeatherApp')
            
        }
    },
    mounted(){
        this.emitter.on('getUserData', () =>{
                this.getUserDatabase()
        })
    }
}
</script>