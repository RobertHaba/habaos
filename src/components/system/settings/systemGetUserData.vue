<template>
<div v-if="false"></div>
</template>

<script>
import {
    db
} from '@/firebaseDB';
export default {
    data() {
        return {

        }
    },
    inject: ['account'],
    methods: {
        async getUserDatabase() {
            await db.collection(this.account).doc('user').get().then(snapshot => {
                sessionStorage.setItem('userData', JSON.stringify(snapshot.data()))
            })
            await this.emitter.emit('menuStartChangeImage')
            await this.emitter.emit('updateLocationInWidget')
            await this.emitter.emit('updateLocationInWeatherApp')

        }
    },
    mounted() {
        this.emitter.on('getUserData', () => {
            this.getUserDatabase()
        })
    }
}
</script>
