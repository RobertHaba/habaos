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
                        active: false
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
                    author: 'DBL',
                    favorite: false,
                    id: '1',
                    img: "https://cdn.haba.usermd.net/music1.jpg",
                    title: 'Muchacho',
                    url: 'https://cdn.haba.usermd.net/os/songs/song1.mp3'
                },
                {
                    author: 'Noname',
                    favorite: false,
                    id: '2',
                    img: "https://cdn.haba.usermd.net/music2.jpg",
                    title: 'Stop Being Yourself',
                    url: 'https://cdn.haba.usermd.net/os/songs/song2.mp3'
                },
                {
                    author: 'Juice WRLD ft. Marshmello',
                    favorite: false,
                    id: '3',
                    img: "https://cdn.haba.usermd.net/music3.jpg",
                    title: 'Come & Go',
                    url: 'https://cdn.haba.usermd.net/os/songs/song3.mp3'
                },
                {
                    author: 'Twocolors',
                    favorite: false,
                    id: '4',
                    img: "https://cdn.haba.usermd.net/music4.jpg",
                    title: 'Lovefool',
                    url: 'https://cdn.haba.usermd.net/os/songs/song4.mp3'
                },
                {
                    author: 'Young T & Bugsey',
                    favorite: false,
                    id: '5',
                    img: "https://cdn.haba.usermd.net/music5.jpg",
                    title: "Don 't Rush Remix",
                    url: 'https://cdn.haba.usermd.net/os/songs/song5.mp3'
                },
                {
                    author: 'Tujamo, VIZE, MAJAN',
                    favorite: false,
                    id: '6',
                    img: "https://cdn.haba.usermd.net/music6.jpg",
                    title: 'Lonely',
                    url: 'https://cdn.haba.usermd.net/os/songs/song6.mp3'
                },
                {
                    author: 'Trevor Daniel',
                    favorite: false,
                    id: '7',
                    img: "https://cdn.haba.usermd.net/music7.jpg",
                    title: 'Forgot',
                    url: 'https://cdn.haba.usermd.net/os/songs/song7.mp3'
                },
                {
                    author: 'NICOLOSI',
                    favorite: false,
                    id: '8',
                    img: "https://cdn.haba.usermd.net/music8.jpg",
                    title: 'Wasted Time',
                    url: 'https://cdn.haba.usermd.net/os/songs/song8.mp3'
                },
            ],
            finish: false,
        }
    },
    methods: {
        createTreeData(userid, ) {
            let empty = true
            db.collection(userid).doc('system').get()
                .then((data) => {
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
    }
}