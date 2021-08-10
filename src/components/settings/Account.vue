<template>
    <section class="account settings-container" :class="'settings-container--' + theme">
        <settingsHeader imgURL="http://cdn.haba.usermd.net/os/icons/user.svg" title="Account"/>
        <div class="settings-body">
            <subTitle text="What do you want do change?" />
            <div class="settings-form-container" v-for="form in content.body" :key="form._id">
                <formTitle :title="form.title" :imgURL="form.icon"/>
                <component :is="form.component" :formProps="form.props" ></component>
                <hr class="horizontal-line line--light-color">
            </div>
        </div>
        <settingsFooter />
    </section>
</template>

<script>
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
                content:{
                    body:[
                        {
                            _id:'form-avatar',
                            component:'formImage',
                            title:'Avatar',
                            icon:'http://cdn.haba.usermd.net/os/icons/picture.svg',
                            props:{
                                img:'http://cdn.haba.usermd.net/os/img/admin.png'
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
                                        name:'Kraków',
                                    },{
                                        id:4,
                                        name:'Wrocław',
                                    },{
                                        id:5,
                                        name:'Poznań',
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
            formPassword
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
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.settings-container--dark{
    background-color: #22252D;
    color: #FFF;
}
.settings-body{
    height: calc(650px - 140px);
    overflow: auto;
    padding: 1rem;
}
</style>