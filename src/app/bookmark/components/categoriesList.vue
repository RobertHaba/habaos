<template>
    <div class="category-list">
            <template v-for="category in allCategories" :key="category.title">
                    <categoryItem :class="{'category-list-item--active': activeCategory == category.title}" :title="category.title" @click="getBookmarksByCategory(category.title), scrollToActiveCategory()"/>
            </template>
    </div>
</template>

<script>
import categoryItem from './categoryListItem.vue'
    export default {
        props:{
            categories: Array
        },
        data(){
            return{
                activeCategory:'',
                allCategories: this.categories.slice()
            }
        },
        components:{
            categoryItem
        },
        methods:{
            getBookmarksByCategory(categoryName){
                this.activeCategory = categoryName
                let bookmarksListContainer = document.querySelector('#bookmarkAppList')
                let bookmarksListItem = bookmarksListContainer.querySelectorAll('.bookmark-list-item')
                this.showOnlyBookmarkInCategory(bookmarksListItem)
                if(categoryName !== 'all'){
                    this.showCategoryElementsInBookmarksHeader()
                }
            },
            showOnlyBookmarkInCategory(bookmarksListItem){
                let bookmarksListLength = 0
                bookmarksListItem.forEach(bookmark => {
                        bookmark.style.display = 'grid'
                        bookmark.dataset.show = 'true'
                    if(bookmark.dataset.category == this.activeCategory){
                        bookmarksListLength++
                    }
                    else if(this.activeCategory == 'all'){
                        bookmark.style.display = 'grid'
                        bookmarksListLength = bookmarksListItem.length
                    }
                    else if(bookmark.dataset.favorite == 'true' && this.activeCategory == 'Favorites'){
                        bookmarksListLength++
                    }
                    else{
                        bookmark.dataset.show = 'false'
                        bookmark.style.display = 'none'
                    }
                });
                this.emitter.emit('bookmarkAppSearch')
                this.showAlertWhenListIsEmpty(bookmarksListLength)
            },
            showAlertWhenListIsEmpty(bookmarksListLength){
                let status = (bookmarksListLength == 0)? true : false
                this.emitter.emit('bookmarksListShowAlert',{status:status,text:"Ohh.. You don't have bookmarks in this category."})
            },
            showCategoryElementsInBookmarksHeader(){
                this.emitter.emit('showCategoryElementsInBookmarksHeader',{button:true,category:this.activeCategory})
            },
            scrollToActiveCategory(){
                setTimeout(()=>{
                    let activeCategory = document.querySelector('.category-list-item--active')
                    let previewCategoryContainer = document.querySelector('.category-list')
                    previewCategoryContainer.scrollLeft = activeCategory.offsetLeft - activeCategory.offsetWidth
                },160)
               
            }
        },
        mounted(){
            this.allCategories.unshift({title:'Favorites', bgColor:'#FF4693'})
            this.emitter.on('showAllBookmarks',()=>{
                this.getBookmarksByCategory('all')
            })
        }
    }
</script>

<style lscoped>
.category-list{
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100px + 1.5rem);
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 1rem;
}
</style>