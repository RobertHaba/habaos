<template>
    <section class="account settings-container app-container" :class="'settings-container--' + theme" v-if="render">
        <settingsHeader imgURL="http://cdn.haba.usermd.net/os/icons/user.svg" title="Account"/>
        <div class="settings-body" v-if="userData !== ''">
            <subTitle text="What do you want to change?" />
            <div class="settings-form-container" v-for="form in content.body" :key="form._id">
                <formTitle :title="form.title" :imgURL="form.icon"/>
                <component :is="form.component" :formProps="form.props"></component>
                <hr class="horizontal-line line--light-color">
            </div>
        </div>
        <settingsFooter />
    </section>
</template>

<script>
import { db } from '@/firebaseDB';
import settingsHeader from './components/header.vue'
import settingsFooter from './components/footer.vue'
import subTitle from './components/subtitle.vue'
import formTitle from './components/forms/title.vue'
import formImage from './components/forms/formImage.vue'
import formText from './components/forms/formText.vue'
import formSelect from './components/forms/formSelect.vue'
import formPassword from './components/forms/formPassword.vue'
    export default {
        data(){
            return{
                theme:'dark',
                name:'accountSettings',
                render:true,
                userData:'',
                newData:[],
                content:{
                    body:[
                        {
                            _id:'form-avatar',
                            component:'formImage',
                            title:'Avatar',
                            icon:'http://cdn.haba.usermd.net/os/icons/picture.svg',
                            props:{
                                img:'',
                                
                            }
                        },
                        {
                            _id:'form-text',
                            component:'formText',
                            title:'Name',
                            icon:'http://cdn.haba.usermd.net/os/icons/picture.svg',
                            props:{
                            }
                        },
                        {
                            _id:'form-city',
                            component:'formSelect',
                            title:'City',
                            icon:'http://cdn.haba.usermd.net/os/icons/pin.svg',
                            props:{
                                id:'settings-account-user',
                                cities:[
                                    {
                                        id:0,
                                        name:'Gdynia',
                                    },{
                                        id:1,
                                        name:'Warszawa',
                                    },{
                                        id:2,
                                        name:'Szczecin',
                                    },{
                                        id:3,
                                        name:'Krakow',
                                    },{
                                        id:4,
                                        name:'Wroclaw',
                                    },{
                                        id:5,
                                        name:'Poznan',
                                    },
                                ]
                            }
                        },
                        {
                            _id:'form-password',
                            component:'formPassword',
                            title:'Password',
                            icon:'http://cdn.haba.usermd.net/os/icons/lock.svg',
                            props:{
                                label1:'Old',
                                label2:'New'
                            }
                        },
                    ]
                }
            }
        },
        components:{
            settingsHeader,
            settingsFooter,
            subTitle,
            formTitle,
            formImage,
            formText,
            formSelect,
            formPassword,
        },
        methods:{
            async getUserDatabase(){
                await db.collection('admin').doc('user').get().then(snapshot =>{
                    this.userData = snapshot.data()
                })
                this.content.body[0].props.img = this.userData.avatar
                this.content.body[1].props.name = this.userData.name
                this.content.body[2].props.city = this.userData.location
                this.content.body[3].props.oldPassword = this.userData.password
            },
            async pushDataToDatabase(){
                this.newData.forEach((item)=>{
                    db.collection('admin').doc('user').update({[item[0]] :item[1]}).then(()=>{
                        this.emitter.emit('getUserData')
                    })
                })
                
            },
            getDataFromForm(){
                let formInputsArray = document.querySelectorAll('[data-account-data-get=true] > [data-account-value]')
                let newDataArray = []
                formInputsArray.forEach((input)=>{
                    newDataArray.push(
                        [input.dataset.accountInputName, input.value]
                    )
                })
                console.log(newDataArray);
                console.log(formInputsArray);
                if(newDataArray.length != 0){
                    this.newData = newDataArray
                    this.pushDataToDatabase()
                }
            },
            forceRerender(){
                this.render = false;
                this.$nextTick(() => {
                    this.render = true;
                });
            }
        },
        mounted(){
            this.getUserDatabase()
            this.emitter.on('accountSaveData', () =>{
                    this.getDataFromForm()
            })
            this.emitter.on('cancelData', async () =>{
                    await this.getUserDatabase()
                    await this.forceRerender()
            })
        }
    }
</script>

<style scoped>
.settings-container{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    background-color: #FFF;
    border-radius: 20px;
    transition: 0.5s ease all;
}
.settings-container--dark{
    background-color: #22252D;
    background-image: linear-gradient(135deg, #622c66, #443272); /* <- wybrać theme*/
    color: #FFF;
}
.settings-body{
    height: calc(650px - 140px);
    overflow: auto;
    padding: 1rem;
}
</style>