<template>
    <div class="menu-all-apps">
        <ul class="menu-all-apps-list" v-if="navbarListAllApps">
            <template v-for="app in navbarListAllApps" :key="app.id" >
                <li class="app-item" @click="runApp(app.emitToApp)" tabindex="0">
                    <span class="icon" :style="{'background-image' : 'url('+app.iconURL+')'}"></span>
                    <p class="app-item__title c-title">{{app.title}}</p>
                    <button @click="addToFavorites()">
                        <span class="icon icon--reverse-color icon--add-to-favorite"></span>
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
                navbarListAllApps: this.dataProp
            }
        },
        methods:{
            sortByAlphabetical(){
                this.navbarListAllApps.sort((a,b)=> a.title.localeCompare(b.title))
            },
            runApp(emitName){
                this.emitter.emit(emitName)
            },
            addToFavorite(){
                if(!this.sending){
                    this.sending = true
                    this.favorite = !this.favorite
                    db.collection('admin').doc('bookmarkApp').collection('bookmarks').doc(this.bookmarkItemData.id).update(
                            {favorite:this.favorite}
                        )
                        .then(()=>{
                            console.log('Data with ID: ' +this.addFormId + ' is successfully sent!');
                        })
                        .catch(()=>{
                            this.emitter.emit('showModal',this.modalData)
                        })
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
        mounted(){
                this.sortByAlphabetical()
        }
    }
</script>

<style scoped>
.menu-all-apps{
    height: 130px;
    overflow-y: auto;
}
.menu-all-apps-list{
    cursor: pointer;
}
.app-item{
    display: grid;
    align-items: center;
    grid-template-columns: 25px 1fr 25px;
    width: 100%;
    padding: 0.3rem 0;
    transition: 0.3s ease-in;
}
.app-item:hover{
    padding-left: 0.3rem;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 10px;
}
.app-item:hover .icon--add-to-favorite{
    opacity: 0.6;
}
.icon{
    width: 25px;
    height: 25px;
}
.icon--add-to-favorite{
    width: 20px;
    height: 20px;
    background-image: url("http://cdn.haba.usermd.net/os/icons/heart.svg");
    opacity: 0;
    transition: 0.3s ease-in;
}
.app-item__title{
    margin-left: 0.5rem;
    font-size: 0.9rem;
}
</style>