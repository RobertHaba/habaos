<template>
    <div class="bookmark-list scroll-hidden" id="bookmarkAppList">
        <template v-for="bookmarkItemData in bookmarksSorted" :key="bookmarkItemData.id" >
            <bookmarkListItem :bookmarkItemData='bookmarkItemData'/>
        </template>
        <div class="bookmark-list__alert bookmark-item-alert" v-if="showAlert">
            <span class="icon icon--alert icon--sad-face"></span>
            <p class="bookmark-item-alert__text">{{textAlert}}</p>
        </div>
    </div>
</template>
<script>
import bookmarkListItem from './bookmarkListItem.vue'
    export default {
        props:{
            bookmarksListData:Array,
        },
        data(){
            return{
                showAlert:false,
                textAlert:"Ohh.. You don't have bookmarks in this category.",
                bookmarksSorted:''
            }
        },
        components:{
            bookmarkListItem,
        },
        methods:{
            sortBookmarksByOptions(sortOptions){
                this.bookmarksSorted = this.bookmarksListData.slice()
                if(sortOptions == 'sortLatest'){
                    this.sortByLatest()
                }
                else if(sortOptions == 'sortOldest'){
                    this.sortByOldest()
                }
                else if(sortOptions == 'sortAlphabetical'){
                    this.sortByAlphabetical()
                }
                else if(sortOptions == 'sortAlphabeticalReverse'){
                    this.sortByAlphabetical()
                    this.bookmarksSorted.reverse()
                }
            },
            sortByLatest(){
                this.bookmarksSorted = this.bookmarksListData.slice()
            },
            sortByOldest(){
                this.bookmarksSorted.reverse()
            },
            sortByAlphabetical(){
                this.bookmarksSorted.sort((a,b)=> a.title.localeCompare(b.title))
            }
        },
        watch:{
            'bookmarksListData'(){
                this.bookmarksSorted = this.bookmarksListData.slice()
            }
        },
        mounted(){
            this.emitter.on('bookmarksListShowAlert',(data)=>{
                this.showAlert = data.status
                this.textAlert = data.text
            })
            this.emitter.on('sortBookmarksByOptions',sortOptions=>{
                this.sortBookmarksByOptions(sortOptions)
            })
        }
        
    }
</script>

<style scoped>
.bookmark-list{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
}
.bookmark-list__alert{
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-gap: 10px;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    padding: 10px;
    background-color: var(--bg-theme--app-second);
    border-radius: 10px;
}
.bookmark-item-alert__text{
    font-size: 0.9rem;
}
.icon--alert{
    justify-self: center;
    width: 35px;
    height: 35px;
}
</style>