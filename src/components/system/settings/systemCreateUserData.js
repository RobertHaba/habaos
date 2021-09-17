import { db } from '@/firebaseDB';
export default {
    data() {
        return {
            allApps: [{
                    id: 0,
                    positionInList: null,
                    title: 'Calcualtor',
                    appName: 'calculator',
                    widget: {
                        id: null,
                        component: 'widgetBookmark',
                        ready: '',
                        active: false
                    },
                    favorite: {
                        id: null,
                        active: false,
                    },
                    iconURL: "https://cdn.haba.usermd.net/os/icons/apps/calculator.svg",
                    emitToApp: 'osAppRun-calculator',
                    pinned: true,
                },
                {
                    id: 1,
                    positionInList: null,
                    title: 'Music',
                    appName: 'music',
                    widget: {
                        id: null,
                        component: 'widgetMusic',
                        ready: '',
                        active: true
                    },
                    favorite: {
                        id: null,
                        active: false,
                    },
                    iconURL: "https://cdn.haba.usermd.net/os/icons/apps/music.svg",
                    emitToApp: 'osAppRun-music',
                    pinned: true,
                },
                {
                    id: 2,
                    positionInList: null,
                    title: 'Weather',
                    appName: 'weather',
                    widget: {
                        id: null,
                        component: 'widgetWeather',
                        ready: '',
                        active: true
                    },
                    favorite: {
                        id: null,
                        active: true,
                    },
                    iconURL: "https://cdn.haba.usermd.net/os/icons/apps/weather.svg",
                    emitToApp: 'osAppRun-weather',
                    pinned: true,
                },
                {
                    id: 3,
                    positionInList: null,
                    title: 'Calendar',
                    appName: 'calendar',
                    widget: {
                        id: null,
                        component: 'widgetCalendar',
                        ready: '',
                        active: false
                    },
                    favorite: {
                        id: null,
                        active: false,
                    },
                    iconURL: "https://cdn.haba.usermd.net/os/icons/apps/calendar.svg",
                    emitToApp: 'osAppRun-calendar',
                    pinned: true,
                },
                {
                    id: 4,
                    positionInList: null,
                    title: 'Bookmarks',
                    appName: 'bookmark',
                    widget: {
                        id: null,
                        component: 'widgetBookmark',
                        ready: '',
                        active: true
                    },
                    favorite: {
                        id: null,
                        active: true,
                    },
                    iconURL: "https://cdn.haba.usermd.net/os/icons/apps/bookmark.svg",
                    emitToApp: 'osAppRun-bookmark',
                    pinned: true,
                },
            ],
            musicPlayerRecommended: [{
                    author: 'Lovely',
                    favorite: false,
                    id: '1',
                    img: "https://cdn.haba.usermd.net/music1.jpg",
                    title: 'Nickelback',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                },
                {
                    author: 'The Chainsmokers',
                    favorite: false,
                    id: '2',
                    img: "https://cdn.haba.usermd.net/music2.jpg",
                    title: 'Roses',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
                },
                {
                    author: 'X Ambassadors',
                    favorite: false,
                    id: '3',
                    img: "https://cdn.haba.usermd.net/music3.jpg",
                    title: 'Unsteady',
                    url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3'
                },
                {
                    author: 'Midsplit',
                    favorite: false,
                    id: '4',
                    img: "https://cdn.haba.usermd.net/music4.jpg",
                    title: 'Nickelback',
                    url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3'
                },
                {
                    author: 'Lovely',
                    favorite: false,
                    id: '5',
                    img: "https://cdn.haba.usermd.net/music5.jpg",
                    title: 'Midsplit, No-One',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                },
                {
                    author: 'Lovely',
                    favorite: false,
                    id: '6',
                    img: "https://cdn.haba.usermd.net/music6.jpg",
                    title: 'Midsplit, No-One',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                },
                {
                    author: 'Sanah',
                    favorite: false,
                    id: '7',
                    img: "https://cdn.haba.usermd.net/music7.jpg",
                    title: 'Etc.',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                }
            ],
            finish: false,
        }
    },
    methods: {
        createTreeData(userid, ) {
            let empty = true
            db.collection(userid).doc('system').get()
                .then((data) => {
                    console.log(data.exists);
                    empty = data.exists
                })
                .then(() => {
                    if (!empty) {
                        this.installationData.packageName = 'createTreeData'
                        this.installationData.step = 4
                        let docsName = ['system', 'todoApp', 'bookmarkApp', 'musicPlayer']
                        let dummy = { dummy: 'dummy' }
                        docsName.forEach((docName) => {
                            db.collection(userid).doc(docName).set({ dummy })
                        })
                        this.createAllAppDataInDB(db.collection(userid).doc('system'))
                        this.createMusicRecommendedDataInDB(db.collection(userid).doc('musicPlayer'))
                    }
                })
                .finally(() => {
                    this.installationData.packageName = 'systemView'
                    this.installationData.step = 6
                    this.finish = true
                })

        },
        createAllAppDataInDB(systemPathToDB) {
            this.installationData.step = 4
            this.installationData.packageName = 'createAllAppDataInDB'
            this.allApps.forEach((item, index) => {
                systemPathToDB.collection('allApp').doc(index.toString()).set(item)
            })
        },
        async createMusicRecommendedDataInDB(systemPathToDB) {
            this.installationData.packageName = 'createRecommendedMusic'
            this.installationData.step = 5
            this.musicPlayerRecommended.forEach((item) => {
                systemPathToDB.collection('dailyRecommended').doc().set(item)
            })
        },
        test() {
            console.log(this.$data);
        }
    }
}