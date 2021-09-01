<template>
    <div class="menu-all-apps">
        <ul class="menu-all-apps-list" v-if="navbarListAllApps">
            <template v-for="app in navbarListAllApps" :key="app.id" >
                <li class="app-item" @click="runApp(app.emitToApp)" tabindex="0">
                    <span class="icon" :style="{'background-image' : 'url('+app.iconURL+')'}"></span>
                    <p class="app-item__title c-title">{{app.title}}</p>
                    <button @click.stop="addToFavorite(app)">
                        <span class="icon icon--reverse-color icon--option icon--favorite" :class="{'icon--option-active':app.favorite.active}"></span>
                    </button>
                    <button @click.stop="addToPinned(app)">
                        <span class="icon icon--reverse-color icon--option icon--pinned" :class="{'icon--option-active':app.pinned}"></span>
                    </button>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
    export default {
        props:{
            dataProp:{
                type:Array,
                default:undefined
            }
        },
        data(){
            return{
                sending:false,
                navbarListAllApps: [...this.dataProp],
            }
        },
        methods:{
            sortByAlphabetical(){
                this.navbarListAllApps.sort((a,b)=> a.title.localeCompare(b.title))
            },
            runApp(emitName){
                this.emitter.emit(emitName)
            },
            addToFavorite(app){
                if(!this.sending){
                    this.sending = true
                    this.favorite = !app.favorite.active
                    db.collection('admin').doc('system').collection('allApp').doc(app.id.toString()).update(
                            {favorite:{
                                id:app.favorite.id,
                                active:this.favorite
                            }}
                        )
                        .finally(()=>{
                            this.sending = false
                        })
                }
            },
            addToPinned(app){
                if(!this.sending){
                    this.sending = true
                    this.pinned = !app.pinned
                    db.collection('admin').doc('system').collection('allApp').doc(app.id.toString()).update(
                            {pinned:this.pinned}
                        )
                        .finally(()=>{
                            this.sending = false
                        })
                }
            },
            addAllAppToDB(){
                this.navbarListAllApps.forEach((item,index)=>{
                    db.collection('admin').doc('system').collection('allApp').doc(index.toString()).set(item)
                })
            }
        },
        watch:{
            dataProp:{
                deep:true,
                handler(){
                    this.navbarListAllApps =[...this.dataProp]
                    this.sortByAlphabetical()
                }
            }
        },
        mounted(){
                this.sortByAlphabetical()
        }
    }
</script>

<style scoped>
.menu-all-apps{
    height: 100%;
}
.menu-all-apps-list{
    cursor: pointer;
}
.app-item{
    display: grid;
    align-items: center;
    grid-template-columns: 25px 1fr 25px 25px;
    width: 100%;
    padding: 0.3rem 0;
    transition: 0.3s ease-in;
}
.app-item:hover{
    padding-left: 0.3rem;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 10px;
}
.app-item:hover .icon--option{
    opacity: 0.6;
}
.icon{
    width: 25px;
    height: 25px;
}
.icon--option{
    width: 20px;
    height: 20px;
    opacity: 0;
    transition: 0.3s ease-in;
}
.icon--favorite{
    background-image: url("http://cdn.haba.usermd.net/os/icons/heart.svg");
}
.icon--pinned{
    background-image: url("http://cdn.haba.usermd.net/os/icons/pinned.svg");
}
.icon--option-active{
    filter: invert(0.5) sepia(1) saturate(35) hue-rotate(
-51deg);
}
.app-item__title{
    margin-left: 0.5rem;
    font-size: 0.9rem;
}
</style>