<template>
    <a :href="bookmark.url" class="widget-tile" v-if="bookmark != ''">
        <div class="widget-column">
            <span class="icon icon--circle" :style="{'background-image': 'url(' + bookmark.favicon + ')'}"></span>
            <span class="icon icon--reverse-color icon--widget-animation" :style="{'background-image': 'url(http://cdn.haba.usermd.net/os/icons/bookmark.svg)'}"></span>
        </div>
        <p class="widget-title c-title">{{bookmark.title}}</p>
    </a>
</template>

<script>
import { db } from '@/firebaseDB';
    export default {
        data(){
            return{
                bookmark:''
            }
        },
        methods:{
            getWidgetBookmark(){
                db.collection('admin').doc('bookmarkApp').collection('widget').doc('bookmark').get()
                .then((res)=>{
                    this.bookmark = res.data()
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
        },
        mounted(){
            this.getWidgetBookmark()
            this.emitter.on('widgetBookmarkUpdateData',()=>{
                this.getWidgetBookmark()
            })
        }
    }
</script>

<style scoped>
    .widget-tile{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .widget-tile:hover .icon--widget-animation{
        animation: 0.7s startMoving infinite cubic-bezier(.17,.67,.83,.67);
    }
    .widget-column{
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
    }
    .icon{
        position: relative;
        z-index: 2;
        width: 16px;
        height: 16px;
    }
    .icon--circle{
        border-radius: 100%;
    }
    .icon--circle::before{
        content: '';
        position: absolute;
        left: -4px;
        top:-4px;
        z-index: -1;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background-color: rgba(255, 255, 255, 0.2);
    }
    .widget-title{
        margin-top: 0.5rem;
        font-size: 0.70rem;
        font-weight: bold;
    }
    @keyframes startMoving {
        0%{
            top:0px;
        }
        50%{
            top:5px
        }
        100%{
            top:0px
        }
    }
   
</style>