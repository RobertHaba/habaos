
import { db } from '@/firebaseDB';
export const createUserData = {
    data(){
        return{
            allApps:[
                {
                    id:0,
                    positionInList:null,
                    title:'Calcualtor',
                    appName:'calculator',
                    widget:{
                        id:null,
                        component: 'widgetBookmark',
                        ready:'',
                        active:false
                    },
                    favorite:{
                        id:null,
                        active:false,
                    },
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calculator.svg",
                    emitToApp:'osAppRun-calculator',
                    pinned:true,
                },
                {
                    id:1,
                    positionInList:null,
                    title:'Music',
                    appName:'music',
                    widget:{
                        id:null,
                        component: 'widgetMusic',
                        ready:'',
                        active:true
                    },
                    favorite:{
                        id:null,
                        active:false,
                    },
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/music.svg",
                    emitToApp:'osAppRun-music',
                    pinned:true,
                },
                {
                    id:2,
                    positionInList:null,
                    title:'Weather',
                    appName:'weather',
                    widget:{
                        id:null,
                        component: 'widgetWeather',
                        ready:'',
                        active:true
                    },
                    favorite:{
                        id:null,
                        active:true,
                    },
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/weather.svg",
                    emitToApp:'osAppRun-weather',
                    pinned:true,
                },
                {
                    id:3,
                    positionInList:null,
                    title:'Calendar',
                    appName:'calendar',
                    widget:{
                        id:null,
                        component: 'widgetCalendar',
                        ready:'',
                        active:false
                    },
                    favorite:{
                        id:null,
                        active:false,
                    },
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calendar.svg",
                    emitToApp:'osAppRun-calendar',
                    pinned:true,
                },
                {
                    id:4,
                    positionInList:null,
                    title:'Bookmarks',
                    appName:'bookmark',
                    widget:{
                        id:null,
                        component: 'widgetBookmark',
                        ready:'',
                        active:true
                    },
                    favorite:{
                        id:null,
                        active:true,
                    },
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/bookmark.svg",
                    emitToApp:'osAppRun-bookmark',
                    pinned:true,
                },
            ],
        }
    },
    methods:{
        createTreeData(user){
            let empty = true
            db.collection(user).get()
            .then((data)=>{
                empty = data.empty
            })
            if(!empty){
                let docsName = ['system','todoApp','bookmarkApp','musicPlayer']
                let dummy = {dummy:'dummy'}
                docsName.forEach((docName)=>{
                    db.collection(user).doc(docName).set({dummy})
                })
                this.createAllAppDataInDB(db.collection(user).doc('system'))
            }
        },
        createAllAppDataInDB(systemPathToDB){
            createUserData.data().allApps.forEach((item,index)=>{
                systemPathToDB.collection('allApp').doc(index.toString()).set(item)
            })
        }
    }
}