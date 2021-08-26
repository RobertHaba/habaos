<template>
    <section class="bookmark bookmark-container app-container" :class="'bookmark-container--' + theme">
        <headerComponent />
        <searchBar />
        <sectionTitle sectionTitle="Categories" :styleProps="styleSectionTitle" />
        <categoriesList />
        <div class="bookmark-list-header">
            <sectionTitle sectionTitle="Bookmarks" :styleProps="styleSectionTitle" />
            <div>add</div>
        </div>
        <bookmarksList />
    </section>
</template>

<script>
import headerComponent from '../components/header.vue'
import searchBar from './components/search.vue'
import sectionTitle from '../components/title.vue'
import categoriesList from './components/categoriesList.vue'
import bookmarksList from './components/bookmarksList.vue'
    export default {
        data(){
            return{
                theme: 'dark',
                styleSectionTitle:{
                    fontSize: '1.1rem',
                    padding: '1rem 0'
                }
            }
        },
        components:{
            headerComponent,
            searchBar,
            sectionTitle,
            categoriesList,
            bookmarksList
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