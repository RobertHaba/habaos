<template>
<div class="menu-favorites" v-if="favoriteAppsData">
    <div class="menu-favorites__container scroll">
        <template v-for="favoriteApp in favoriteAppsData" :key="favoriteApp.id">
            <button title="Drag to change position" class="favorite-item" @click="runApp(favoriteApp.emitToApp)" draggable="true" @dragenter="runDragOver(favoriteApp)" @dragend="runDragEnd(favoriteApp)">
                <span class="icon" :style="{'background-image' : 'url('+favoriteApp.iconURL +')'}"></span>
                <p class="favoritle-item__title">{{favoriteApp.title}}</p>
            </button>
        </template>
    </div>
</div>
</template>

<script>
import {
    db
} from '@/firebaseDB';
import {
    dragItem
} from '@/components/system/events/changeIndexByDrag.js'
export default {
    mixinx: [dragItem],
    props: {
        dataProp: {
            type: Array,
            default: undefined
        }
    },
    data() {
        return {
            favoriteAppsData: [],
            dbTree: 'admin/system/allApp/',
            favoriteKeyNameInDBObject: 'favorite'
        }
    },
    inject: ['account'],
    methods: {
        runApp(emitName) {
            this.emitter.emit(emitName)
        },
        runDragOver(favoriteApp) {
            dragItem.methods.dragOverOtherBox(favoriteApp)
        },
        runDragEnd(favoriteApp) {
            dragItem.methods.dropItem(favoriteApp, this.favoriteAppsData, this.favoriteKeyNameInDBObject)
            this.updateFavoriteDataInDB()
        },
        getOnlyFavoriteApp() {
            this.favoriteAppsData.length = 0,
                [...this.dataProp].forEach((app) => {
                    if (app.favorite.active) {
                        this.favoriteAppsData.push(app)
                    }
                })
            if (this.favoriteAppsData.length == 0) {
                this.hideFavorite()
            } else {
                this.showFavorite()
                this.sortFavoriteApp()
            }
        },
        sortFavoriteApp() {
            this.favoriteAppsData.sort((a, b) => (a.favorite.id > b.favorite.id) ? 1 : (b.favorite.id > a.favorite.id) ? -1 : 0)
        },
        updateFavoriteDataInDB() {
            this.favoriteAppsData.forEach((item) => {
                db.collection(this.account).doc('system').collection('allApp').doc(item.id.toString()).set(item)
            })
        },
        hideFavorite() {
            document.querySelector('[data-menu-component=favorites]').classList.add('hidden')
        },
        showFavorite() {
            document.querySelector('[data-menu-component=favorites]').classList.remove('hidden')
        }
    },
    watch: {
        dataProp: {
            deep: true,
            handler() {
                this.getOnlyFavoriteApp()
            }
        }
    },
    mounted() {
        this.getOnlyFavoriteApp()
    }
}
</script>

<style scoped>
.menu-favorites__container {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 1rem;
    overflow-x: auto;
}

.favorite-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    height: 100%;
    padding: 0.5rem;
    margin-right: 0.5rem;
    font-size: 0.9rem;
    background-color: rgba(184, 184, 184, 0.2);
    color: var(--font-main-color);
    border-radius: 10px;
    transition: 0.3s ease;
    cursor: pointer;
}

.favorite-item:hover {
    background-color: rgba(184, 184, 184, 0.4);
}

.favoritle-item__title {
    margin-left: 0.5rem;
}

.icon {
    width: 20px;
    height: 20px;
}
</style>
