
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
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calculator.svg",
                    emitToApp:'osAppRun-calculator',
                    favorite:false,
                    favoriteID:0,
                    pinned:true,
                },
                {
                    id:1,
                    positionInList:null,
                    title:'Music',
                    appName:'music',
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/music.svg",
                    emitToApp:'osAppRun-music',
                    favorite:false,
                    favoriteID:1,
                    pinned:true,
                },
                {
                    id:2,
                    positionInList:null,
                    title:'Weather',
                    appName:'weather',
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/weather.svg",
                    emitToApp:'osAppRun-weather',
                    favorite:true,
                    favoriteID:2,
                    pinned:true,
                },
                {
                    id:3,
                    positionInList:null,
                    title:'Calendar',
                    appName:'calendar',
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/calendar.svg",
                    emitToApp:'osAppRun-calendar',
                    favorite:false,
                    favoriteID:3,
                    pinned:true,
                },
                {
                    id:4,
                    positionInList:null,
                    title:'Bookmarks',
                    appName:'bookmark',
                    iconURL:"http://cdn.haba.usermd.net/os/icons/apps/bookmark.svg",
                    emitToApp:'osAppRun-bookmark',
                    favorite:true,
                    favoriteID:4,
                    pinned:true,
                },
            ],
        }
    },
    methods:{
        createTreeData(user){
            console.log(user);
            let empty = true
            db.collection(user).get()
            .then((data)=>{
                empty = data.empty
            })
            if(!empty){
                console.log('run');
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