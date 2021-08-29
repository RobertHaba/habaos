<template>
    <a :href="bookmarkItemData.url" target="_blank" class="bookmark-list-item" :data-category="bookmarkItemData.category" :data-favorite="favorite" :data-title="bookmarkItemData.title.toLowerCase()" data-show='true'>
        <div class="list-item-icon-wrapper" :class="'bookmark-category--' + bookmarkItemData.category.toLowerCase()">
            <span class="icon list-item-icon" :style="{'background-image':'url(' + favicon +')'}" ></span>
        </div>
        <div class="list-item-content">
            <p class="list-item-content__title">{{bookmarkItemData.title}}</p>
            <p class="list-item-content__description">{{bookmarkItemData.description}}</p>
        </div>
        <span class="list-item-favorite" :class="{'list-item-favorite--active': favorite}" @click="addToFavorite()" onclick="return false;">
        </span>
        <dropSmallMenu :buttonsOption="dropSmallMenuOptions" @dropMenuEmitFunction="chooseEmitFunctionFromDropMenu" onclick="return false"/>
        <answerModal onclick="return false" :modalProps="answerModalProps" v-if="showAnswerModal"/>
    </a>
</template>

<script>
import { db } from '@/firebaseDB';
import dropSmallMenu from '@/components/system/dropSmallMenu.vue'
import answerModal from '@/components/modals/answerModal.vue'
    export default {
        props:{
            bookmarkItemData:Object
        },
        components:{
            dropSmallMenu,
            answerModal
        },
        data(){
            return{
                favorite: this.bookmarkItemData.favorite,
                newFavicon:'',
                sending:false,
                fileImg:'',
                modalData: {timeout:1500},
                favicon:'http://cdn.haba.usermd.net/os/favicon.ico',
                dropSmallMenuOptions:[{
                    id:0,
                    url:'http://cdn.haba.usermd.net/os/icons/trash.svg',
                    title:'Delete bookmark',
                    functionName:'deleteBookmark'
                },
                {
                    id:1,
                    url:'http://cdn.haba.usermd.net/os/icons/edit.svg',
                    title:'Edit bookmark',
                    functionName:'editBookmark'
                },
                {
                    id:2,
                    url:'http://cdn.haba.usermd.net/os/icons/widgets.svg',
                    title:'Set in widget',
                    functionName:'setToWidget'
                }],
                showAnswerModal:false,
                showAnswerIsRunning:false,
                answerModalProps:{
                    timeout:3000,
                    icon:'http://cdn.haba.usermd.net/os/icons/sad-face.svg',
                    title:'Delete',
                    text:'Do you want to delete: ' + this.bookmarkItemData.title +'?',
                    doEmitFunction: 'bookmarkAppDeleteBookmark-'+ this.bookmarkItemData.id
                },
            }
        },
        methods:{
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
            async getFavicon(){
                this.newFavicon = `https://www.google.com/s2/favicons?domain=${this.bookmarkItemData.url}`
                this.fileImg = await fetch(this.newFavicon).then(r => r.blob());
                if(this.fileImg.size !== 492){
                     this.favicon = this.newFavicon
                }
                else if(!this.bookmarkItemData.url.includes('://www.')){
                    this.tryGetFaviconWithWWW()
                }
            },
            async tryGetFaviconWithWWW(){
                let newTestURL = this.bookmarkItemData.url
                let testFileImg, newTestFavicon
                    newTestURL = newTestURL.split('://').join('://www.')
                    newTestFavicon = `https://www.google.com/s2/favicons?domain=${newTestURL}` 
                    testFileImg = await fetch(newTestFavicon).then(r => r.blob());
                    if(testFileImg.size !== this.fileImg.size){
                        this.favicon = newTestFavicon
                    }
                    else{
                        this.tryGetFaviconFromSiteURL()
                    }
            },
            async tryGetFaviconFromSiteURL(){
                let newTestFavicon = this.bookmarkItemData.url + 'favicon.ico'
                let testFileImg = await fetch(newTestFavicon).then(r => r.blob());
                    console.log(testFileImg);
                    if(testFileImg.size !== this.fileImg.size){
                        console.log('dziala');
                        this.favicon = newTestFavicon
                    }
            },
            chooseEmitFunctionFromDropMenu(functionName){
                if(functionName == 'deleteBookmark'){
                    this.showAnswerModalToRunDeleteBookmark()
                }
                else if(functionName == 'editBookmark'){
                    this.editBookmark()
                }
                else if(functionName == 'setToWidget'){
                    this.setToWidget()
                }
            },
            showAnswerModalToRunDeleteBookmark(){
                if(!this.showAnswerModal){
                    this.showAnswerModal = true
                    setTimeout(()=>{
                        this.showAnswerModal = false
                    },this.answerModalProps.timeout)
                    console.log('test');
                }
            },
            deleteBookmarkFromDB(){
                db.collection('admin').doc('bookmarkApp').collection('bookmarks').doc(this.bookmarkItemData.id).delete()
                .finally(()=>{
                    this.emitter.emit('resetDataInBookmarkApp')
                })
            },
            editBookmark(){
                this.emitter.emit('openBookmarkEditor',true)
                let data = []
                data=[
                this.bookmarkItemData.title,
                this.bookmarkItemData.url,
                this.bookmarkItemData.description,
                this.favorite,
                this.bookmarkItemData.category,
                this.bookmarkItemData.id
                ]
                setTimeout(()=>{
                    this.emitter.emit('editBookmark',data)
                },200)
            },
            setToWidget(){
                let createWidgetData={
                        title:this.bookmarkItemData.title,
                        favicon: this.favicon,
                        url:this.bookmarkItemData.url,
                    }
                db.collection('admin').doc('bookmarkApp').collection('widget').doc('bookmark').set(
                    createWidgetData
                )
                this.emitter.emit('widgetBookmarkUpdateData')
            }

        },
        mounted(){
            this.getFavicon()
            this.emitter.on('bookmarkAppDeleteBookmark-'+ this.bookmarkItemData.id,(status)=>{
                if(status){
                    this.deleteBookmarkFromDB()
                }
            })
        }
    }
</script>

<style scoped>
.bookmark-list-item:link,
.bookmark-list-item:visited{
    color: inherit;
}
.bookmark-list-item{
    position: relative;
    display: grid;
    grid-template-columns: 50px 1fr 30px;
    grid-column-gap: 10px;
    height: auto;
    width: 100%;
    padding: 10px;
    background-color: #393939;
    border-radius: 10px;
    margin-bottom: 1rem;
}
.bookmark-list-item:hover{
    transition: 0.3s cubic-bezier(.17,.67,.83,.67);
    background-color: #505050;
}
.list-item-icon-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 10px;
}
.list-item-icon{
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 100%;
}
.list-item-icon::before{
    content: '';
    position: absolute;
    left: -7px;
    top:-7px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.2);
}
.list-item-content{
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 160px;
}
.list-item-content__title{
    font-size: 0.8rem;
    font-weight: bold;
}
.list-item-content__description{
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
}
.list-item-content__title,
.list-item-content__description{
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list-item-content__title::first-letter,
.list-item-content__description::first-letter{
    text-transform: uppercase;
}
.list-item-favorite{
    align-self: center;
    justify-self: center;
    width:20px;
    height: 20px;
    background-image: url('http://cdn.haba.usermd.net/os/icons/heart.svg');
}
.list-item-favorite--active{
    filter: invert(0.5) sepia(1) saturate(35) hue-rotate(-51deg);
}
.bookmark-list-item:hover .drop-small-menu{
    display: flex;
}
.drop-small-menu{
    bottom: 5px;
    left: 5px;
    z-index: 9;
    display: none;
    align-items: center;
    background-color: var(--bg-theme--first);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    opacity: 0;
    animation: showModal 1s linear forwards;
   
}
@keyframes showModal {
    0%{
        display: none;
        visibility: hidden;
    }
    69%{
        display: none;
        visibility: hidden;
    }
    70%{
        display: flex;
        visibility:visible;
        opacity: 0;
    }
    100%{
        display:flex;
        opacity: 1;
    }
}
</style>