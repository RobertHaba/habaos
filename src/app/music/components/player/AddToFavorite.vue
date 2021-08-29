
<script>
import { db } from '../../firebaseDB';
    export default {
        data(){
            return{
                song:this.music
            }
        },
        methods:{
            getDataFromFireBase(){
                var starCountRef = db.ref('musicPlayer/favorite/');
                starCountRef.set(
                    this.song
                );


            }
        },
        mounted() {
            this.getDataFromFireBase()
        },
        props:['music']
    }
</script>