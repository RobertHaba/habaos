<template>
    <section class="bookmark bookmark-container app-container" :class="'bookmark-container--' + theme">
        <headerComponent />
        <searchBar />
        <sectionTitle sectionTitle="Categories" :styleProps="styleSectionTitle" />
        <categoriesList />
        <div class="bookmark-list-header">
            <sectionTitle sectionTitle="Bookmarks" :styleProps="styleSectionTitle" />
            <div @click="openBookmarkAddForm = true">add</div>
        </div>
        <bookmarksList />
        <bookmarkAdd v-if="openBookmarkAddForm" :activeDate="activeDate" :addSettings="bookmarkAddViewSettings"/>
    </section>
</template>

<script>
import headerComponent from '../components/header.vue'
import searchBar from './components/search.vue'
import sectionTitle from '../components/title.vue'
import categoriesList from './components/categoriesList.vue'
import bookmarksList from './components/bookmarksList.vue'
import bookmarkAdd from '../components/windowAddForm.vue'
    export default {
        data(){
            return{
                theme: 'dark',
                styleSectionTitle:{
                    fontSize: '1.1rem',
                    padding: '1rem 0'
                },
                openBookmarkAddForm: false,
                activeDate:"2021.08.26",
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
                            inputMaxLength:15,
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
                        resetData:'resetDataInBookmarkApp', //Add This Emit
                        openEditor:'openBookmarkEditor',
                        getData:'getBookmarkDate',
                        edit:'editBookmark'
                    },
                    tagValues:[
                        {
                            'title':'Low',
                            'bgColor':'#4CAF50'
                        },
                        {
                            'title':'Medium',
                            'bgColor':'#E67500'
                        },
                        {
                            'title':'High',
                            'bgColor':'#FF127F'
                        },
                    ],
                    tagData:{
                        'name':'Category',
                        'value':'',
                        'validation': ''
                    },
                    editMode:false,
                }

            }
        },
        components:{
            headerComponent,
            searchBar,
            sectionTitle,
            categoriesList,
            bookmarksList,
            bookmarkAdd
        },
        mounted(){
            this.emitter.on('openBookmarkEditor',(data)=>{
                console.log(data);
                this.openBookmarkAddForm = data
                this.activeDate = "2021.08.26"
            })
            this.emitter.on('resetDataInBookmarkApp',()=>{
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
    background-color: #FFF;
    border-radius: 20px;
    transition: 0.5s ease all;
}
.bookmark-container--dark{
    background-color: #22252D;
    color: #FFF;
}
.bookmark-list-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>