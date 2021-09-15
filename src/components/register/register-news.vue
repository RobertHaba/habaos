<template>
<div class="register-news-container">
    <h2 class="register-news-container__title">What's new in Falcon<span class="logo-red">One</span> relase</h2>
    <div class="register-news-header-wrapper">
        <button class="register-news-header-button box-shadow-dark" :class="{'register-news-header-button--active':activeNews == newsHeader.id}" @click="activeNews = newsHeader.id, scrollToActiveNews()" v-for="newsHeader in newsItems" :key="newsHeader.id">{{newsHeader.title}}</button>
    </div>
    <div class="register-news-content">
        <div class="register-news-content__image-box box-shadow-dark">
            <img :src="newsItems[activeNews].imgSrc" class="register-news-content-image" />
        </div>
        <div class="register-news-content-column">
            <h3 class="register-news-content-title">
                {{newsItems[activeNews].title}}
            </h3>
            <p class="register-news-content-text">
                {{newsItems[activeNews].text}}
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            newsItems: [{
                    id: 0,
                    title: 'More better app',
                    imgSrc: 'http://cdn.haba.usermd.net/os/img/app.webp',
                    text: 'New better application - weather app, calculator, calendar integrated with todo, music player, bookmarks manager',
                },
                {
                    id: 1,
                    title: 'Theme',
                    imgSrc: 'http://cdn.haba.usermd.net/os/img/theme.webp',
                    text: 'Now you can choose your favorite theme: dark or light!',

                },
                {
                    id: 2,
                    title: 'Gesture',
                    imgSrc: 'http://cdn.haba.usermd.net/os/img/gesture.webp',
                    text: 'We added gesture support for closing applications!',

                },
                {
                    id: 3,
                    title: 'Widgets',
                    imgSrc: 'http://cdn.haba.usermd.net/os/img/widgets.webp',
                    text: 'You can already use the widgets that are located in the start menu. Use the weather widget and add a shortcut to your most visited page',

                },
                {
                    id: 4,
                    title: 'Live work',
                    imgSrc: 'http://cdn.haba.usermd.net/os/img/live.webp',
                    text: 'RocketOS supports using your system account on other devices. So you can use your data where and how you want!',

                },
            ],
            activeNews: 0
        }
    },
    methods:{
        scrollToActiveNews() {
            setTimeout(() => {
                let activeNews = document.querySelector('.register-news-header-button--active')
                let previewNewsContainer = document.querySelector('.register-news-header-wrapper')
                previewNewsContainer.scrollLeft = activeNews.offsetLeft - activeNews.offsetWidth
            }, 160)
        }
    }
}
</script>

<style scoped>
.register-news-container {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
}

.register-news-header-wrapper {
    display: flex;
    height: 50px;
    width: 100%;
    max-width: 480px;
    margin: 1rem 0;
    padding-bottom: 0.5rem;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
}

.register-news-header-button {
    position: relative;
    min-width: auto;
    height: 30px;
    padding: 0 2rem;
    margin-right: 1rem;
    border-radius: 30px;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.4);
}

.register-news-header-button--active {
    font-weight: bold;
    background-color: var(--subpage-second-color--opacity);
}

.register-news-content__image-box {
    width: 100%;
    max-width: 480px;
    height: 100%;
    max-height: 300px;
    padding: 1.5rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
}

.register-news-content-image {
    width: 100%;
    object-fit: fill;
    border-radius: 5px;
}

.register-news-content-column {
    max-width: 480px;
}

.register-news-content-title {
    margin: 1rem 0 0.5rem 0;
}

.register-news-content-text {
    max-width: 480px;
    font-size: 0.9rem;
    opacity: 0.8;
}

@media (max-width:1050px) {
    .register-news-container{
        align-items: center;
    }
}

@media (max-width:600px) {
    .register-news-container{
        align-items: center;
    }
    .register-news-content__image-box{
        padding: 0.5rem;
    }
}
</style>
