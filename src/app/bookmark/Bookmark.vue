<template>
    <section class="bookmark bookmark-container app-container app-bookmark">
        <div class="app-wrapper" draggable="true" ondragstart="event.preventDefault(); event.stopPropagation();">
            <headerComponent/>
            <searchBar />
            <sectionTitle sectionTitle="Categories" :styleProps="styleSectionCategoryTitle" />
            <categoriesList :categories="bookmarkAddViewSettings.tagValues"/>
            <div class="bookmark-list-header">
                <button class="button-bookmark-all" v-if="showButtonToReturnAllItems == true" @click="showAllBookmarks()">All</button>
                <div class="bookmark-header-row">
                    <sectionTitle sectionTitle="Bookmarks" :styleProps="styleSectionTitle" />
                    <p class="bookmark-header-row-subtitle">{{bookmarksHeaderCategoryTitle}}</p>
                </div>
                <div class="bookmark-header-column">
                    <div class="bookmark-header-row bookmark-header-row--center">
                        <p class="bookmark-header-row-subtitle">sort by</p>
                        <span class="icon icon--reverse-color" :style="{'background-image': 'url(' + sortIcon + ')'}"></span>
                    </div>
                    <button class="btn-app-circle btn-app-circle--sort" @click="showFilterOptions = !showFilterOptions">
                        <span class="icon icon--sort icon--reverse-white"></span>
                        <dropSmallMenu v-show="showFilterOptions" :buttonsOption="dropSmallMenuOptions" @dropMenuEmitFunction="chooseEmitFunctionFromDropMenu"/>
                    </button>
                    
                    <button class="btn-app-circle" @click="openBookmarkAddForm = true">+</button>
                </div>
            </div>
            <bookmarksList :bookmarksListData="bookmarksListData" v-if="bookmarksListData" />
            <bookmarkAdd v-if="openBookmarkAddForm" :activeDate="activeDate" :addSettings="bookmarkAddViewSettings"/>
            <modalDefault :modalProps="modalData" v-if="modalData !== ''"/>
        </div>
    </section>
</template>

<script>
import { db } from '@/firebaseDB';
import headerComponent from '../components/header.vue'
import searchBar from './components/bookmarkSearch.vue'
import sectionTitle from '../components/title.vue'
import categoriesList from './components/bookmarkCategoryList.vue'
import bookmarksList from './components/bookmarkList.vue'
import bookmarkAdd from '../components/windowAddForm.vue'
import modalDefault from '@/app/components/modals/modalDefault.vue'
import dropSmallMenu from '@/app/components/dropSmallMenu.vue'
    export default {
        data(){
            return{
                styleSectionTitle:{
                    fontSize: '1rem',
                    padding: '0'
                },
                styleSectionCategoryTitle:{
                    fontSize: '1.1rem',
                    padding: '1rem 0'
                },
                openBookmarkAddForm: false,
                showButtonToReturnAllItems:false,
                bookmarksHeaderCategoryTitle:'All',
                showFilterOptions:false,
                sortIcon:'https://cdn.haba.usermd.net/os/icons/latest.svg',
                dropSmallMenuOptions:[
                {
                    id:0,
                    url:'https://cdn.haba.usermd.net/os/icons/latest.svg',
                    title:'Sort by lastest to oldest',
                    functionName:'sortLatest'
                },
                {
                    id:1,
                    url:'https://cdn.haba.usermd.net/os/icons/oldest.svg',
                    title:'Sort by oldest to lastest',
                    functionName:'sortOldest'
                },
                {
                    id:2,
                    url:'https://cdn.haba.usermd.net/os/icons/alphabetical-order.svg',
                    title:'Sort from A - Z',
                    functionName:'sortAlphabetical'
                },
                {
                    id:3,
                    url:'https://cdn.haba.usermd.net/os/icons/alphabetical-order-reverse.svg',
                    title:'Sort from Z - A',
                    functionName:'sortAlphabeticalReverse'
                }],
                bookmarkAddViewSettings:{
                    title:'Create a new bookmark',
                    editorTitle:'Edit bookmark',
                    app:'bookmarkApp',
                    inputs:[
                        {
                            inputName:'Title',
                            inputTag:'input',
                            inputType:'text',
                            inputPlaceholder:'Add your title',
                            inputMinLength:2,
                            inputMaxLength:22,
                            emitUseName:'getBookmarkDate',
                            emitCreateName:'getDataBookmarkInput',
                            editDataTitle:'title'

                        },
                        {
                            inputName:'URL',
                            inputTag:'input',
                            inputType:'text',
                            inputPlaceholder:'Add URL link ex. www.name.com',
                            inputMinLength:0,
                            inputMaxLength:320,
                            emitAdvancedValidationName:'bookmarkURLValidation',
                            emitAdvancedValidationReturn:'bookmarkURLValidationReturn',
                            emitUseName:'getBookmarkDate',
                            emitCreateName:'getDataBookmarkInput',
                            editDataTitle:'title'

                        },
                        {
                            inputName:'Description',
                            inputTag:'input',
                            inputType:'text',
                            inputPlaceholder:'Add your description',
                            inputMinLength:2,
                            inputMaxLength:40,
                            emitUseName:'getBookmarkDate',
                            emitCreateName:'getDataBookmarkInput',
                            editDataTitle:'description'

                        }
                    ],
                    emits:{
                        input:'getDataBookmarkInput',
                        resetData:'resetDataInBookmarkApp',
                        openEditor:'openBookmarkEditor',
                        getData:'getBookmarkDate',
                        edit:'editBookmark'
                    },
                    tagValues:[
                        {
                            'title':'Programming',
                            'bgColor':'#000000'
                        },
                        {
                            'title':'Cooking',
                            'bgColor':'#662B65'
                        },
                        {
                            'title':'Traveling',
                            'bgColor':'#4CAF50'
                        },
                        {
                            'title':'Education',
                            'bgColor':'#2D60E3'
                        },
                        {
                            'title':'Work',
                            'bgColor':'#1a5a70'
                        },
                        {
                            'title':'Home',
                            'bgColor':'#912951'
                        },
                        {
                            'title':'Others',
                            'bgColor':'#d38e2e'
                        },
                    ],
                    tagData:{
                        'name':'Category',
                        'value':'',
                        'validation': ''
                    },
                    editMode:false,
                },
                modalData:'',
                bookmarksListData:[],

            }
        },
        components:{
            headerComponent,
            searchBar,
            sectionTitle,
            categoriesList,
            bookmarksList,
            bookmarkAdd,
            modalDefault,
            dropSmallMenu
        },
        inject:['account'],
        methods:{
            getBookmarkFromDB(){
                db.collection(this.account).doc('bookmarkApp').collection('bookmarks').orderBy('id','desc').get()
                .then(res =>{
                    this.bookmarksListData = res.docs.map(doc => doc.data())
                })
                .catch(()=>{
                    this.bookmarksListData =""
                })
            },
            showAllBookmarks(){
                this.showButtonToReturnAllItems = false
                this.bookmarksHeaderCategoryTitle = 'All'
                this.emitter.emit('showAllBookmarks','all')
            },
            chooseEmitFunctionFromDropMenu(sortOption){
                this.emitter.emit('sortBookmarksByOptions',sortOption)
                this.changeSortIcon(sortOption)
            },
            changeSortIcon(sortOption){
                this.dropSmallMenuOptions.forEach(item=>{
                    if(item.functionName == sortOption){
                        this.sortIcon = item.url
                        return true
                    }
                })
            }
        },
        watch:{
            bookmarksListData: function (dataArray){
                if(dataArray.length == 0){
                    this.emitter.emit('bookmarksListShowAlert',{status:true,text: "Ohh.. You don't have bookmarks in this category."})
                }
                else if(this.bookmarksHeaderCategoryTitle == 'All'){
                    this.emitter.emit('bookmarksListShowAlert',{status:false,text: ""})
                }
            }
        },
        mounted(){
            this.getBookmarkFromDB()
            this.activeDate = new Date().toLocaleDateString('en-CA').split('-').join('.')
            this.emitter.on('openBookmarkEditor',(data)=>{
                this.openBookmarkAddForm = data
            })
            this.emitter.on('resetDataInBookmarkApp',()=>{
                this.getBookmarkFromDB()
                
            })
            this.emitter.on('showModal',(data)=>{
                this.modalData = data
                setTimeout(()=>{
                    this.modalData = ''
                },data.timeout)
            })
            this.emitter.on('showCategoryElementsInBookmarksHeader',(data)=>{
                this.showButtonToReturnAllItems = data.button
                this.bookmarksHeaderCategoryTitle = data.category
            })
             
        }    
    }
</script>

<style scoped>
.bookmark-container{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem 1.5rem;
    background-color: var(--bg-theme--app);
    color: var(--font-main-color);
    border-radius: 20px;
    transition: 0.5s ease all;
}
.app-wrapper{
    width: 100%;
    height: 100%;
}
.bookmark-list-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
}
.bookmark-header-column{
    display: flex;
    align-items: center;
}
.bookmark-header-row{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.bookmark-header-row--center{
    align-items: center;
}
.bookmark-header-row-subtitle{
    height: 100%;
    font-size: 0.6rem;
}
.button-bookmark-all{
    height: 30px;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    border-radius: 100px;
    font-weight: bold;
    border: 2px solid var(--bg-theme--first);
    color: var(--font-main-color);
    transition: 0.3s cubic-bezier(.17,.67,.83,.67);
}
.button-bookmark-all:hover{
    background-color: var(--bg-theme--first);
    color: #FFF;
}
.icon{
    width: 14px;
    height: 14px;
}
.btn-app-circle{
    margin-left: 0.5rem;
}
.btn-app-circle--sort{
    position: relative;
    background-color: rgba(98, 44, 102, 1);
}
.drop-small-menu{
    display: flex;
    top: calc(100% + 10px);
    right: 0;
    z-index: 9;
    align-items: center;
    background-color: rgba(98, 44, 102, 1);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
   
}
</style>