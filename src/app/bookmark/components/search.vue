<template>
    <div class="search-bar bg-theme--no-gradient">
        <span class="icon"></span>
        <input class="search-bar__input bg-theme--no-gradient" type="text" placeholder="Let's search!" @keyup="loadSearch()" v-model.trim="searchText"/>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                bookmarksActiveItems:[],
                searchText:''
            }
        },
        methods:{
            async loadSearch(){
                await this.getAllActiveBookmarks()
                await this.searchInBookmarks()
            },
            getAllActiveBookmarks(){
                let bookmarksListItem = document.querySelectorAll('#bookmarkAppList .bookmark-list-item')
                this.bookmarksActiveItems = []
                bookmarksListItem.forEach(bookmark => {
                    (bookmark.dataset.show == 'true')?this.bookmarksActiveItems.push(bookmark):''
                });
            },
            searchInBookmarks(){
                let bookmarksListLength = 0
                this.bookmarksActiveItems.forEach(bookmark =>{
                    if(bookmark.dataset.title.includes(this.searchText.toLowerCase())){
                        bookmarksListLength++
                        bookmark.style.display = 'grid'
                    }
                    else{
                        bookmark.style.display = 'none'
                    }
                })
                if(this.searchText != "" && bookmarksListLength == 0){
                    this.emitter.emit('bookmarksListShowAlert',{status:true,text:"Ohh.. No data"})
                    console.log(this.searchText);
                    console.log('No data');
                }
                else if(bookmarksListLength > 0 ){
                    this.emitter.emit('bookmarksListShowAlert',{status:false,text:"Ohh.. No data"})
                }
                else if(bookmarksListLength == 0 && this.searchText == ""){
                    this.emitter.emit('bookmarksListShowAlert',{status:true,text:"Ohh.. You don't have bookmarks in this category."})
                }
                

            }
        },
        mounted(){
            this.emitter.on('bookmarkAppSearch',()=>{
                this.loadSearch()
            })
        }
    }
</script>

<style scoped>
.search-bar{
    display: grid;
    grid-template-columns: 40px 1fr;
    width: 100%;
    height: 30px;
    border-radius: 50px;
}
.icon{
    justify-self: center;
    width: 30px;
    background-size: 15px;
    background-image: url('https://cdn.haba.usermd.net/os/icons/search-white.svg');
}
.search-bar__input{
    width: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 0 0.5rem;
    color: #FFF;
}
</style>