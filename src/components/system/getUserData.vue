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
        }
    },
    mounted(){
        this.emitter.on('getUserData', () =>{
                this.getUserDatabase()
        })
    }
}
</script>