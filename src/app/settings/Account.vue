<template>
<section class="account settings-container app-container" v-if="render">
    <settingsHeader imgURL="https://cdn.haba.usermd.net/os/icons/user.svg" title="Account" />
    <div class="settings-body" v-if="userData !== ''">
        <subTitle text="What do you want to change?" />
        <div class="settings-form-container" v-for="form in content.body" :key="form._id">
            <formTitle :title="form.title" :imgURL="form.icon" />
            <component :is="form.component" :formProps="form.props"></component>
            <hr class="horizontal-line line--light-color">
        </div>
    </div>
    <settingsFooter />
</section>
</template>

<script>
import {
    db
} from '@/firebaseDB';
import data from '@/data/data.json'
import settingsHeader from './components/accountHeader.vue'
import settingsFooter from './components/accountFooter.vue'
import subTitle from './components/accountSubtitle.vue'
import formTitle from './components/forms/accountTitle.vue'
import formImage from './components/forms/accountFormImage.vue'
import formText from './components/forms/accountFormText.vue'
import formSelect from './components/forms/accountFormSelect.vue'
export default {
    data() {
        return {
            name: 'accountSettings',
            render: true,
            userData: '',
            newData: [],
            content: {
                body: [{
                        _id: 'form-avatar',
                        component: 'formImage',
                        title: 'Avatar',
                        icon: 'https://cdn.haba.usermd.net/os/icons/picture.svg',
                        props: {
                            img: '',

                        }
                    },
                    {
                        _id: 'form-text',
                        component: 'formText',
                        title: 'Name',
                        icon: 'https://cdn.haba.usermd.net/os/icons/picture.svg',
                        props: {}
                    },
                    {
                        _id: 'form-city',
                        component: 'formSelect',
                        title: 'City',
                        icon: 'https://cdn.haba.usermd.net/os/icons/pin.svg',
                        props: {
                            id: 'settings-account-user',
                            cities: data.locations
                        }
                    },
                ]
            }
        }
    },
    components: {
        settingsHeader,
        settingsFooter,
        subTitle,
        formTitle,
        formImage,
        formText,
        formSelect,
    },
    inject: ['account'],
    methods: {
        async getUserDatabase() {
            await db.collection(this.account).doc('user').get().then(snapshot => {
                this.userData = snapshot.data()
            })
            this.content.body[0].props.img = this.userData.avatar
            this.content.body[1].props.name = this.userData.name
            this.content.body[2].props.city = this.userData.location
        },
        async pushDataToDatabase() {
            this.newData.forEach((item) => {
                db.collection(this.account).doc('user').update({
                    [item[0]]: item[1]
                }).then(() => {
                    this.updateMemberData()
                    this.emitter.emit('getUserData')
                })
            })

        },
        updateMemberData(){
            let memberUsersStorage = JSON.parse(localStorage.getItem('memberUsers'))
            let sessionEmail = sessionStorage.getItem('email')
            if(memberUsersStorage !== null){
                if(!Array.isArray(memberUsersStorage)){
                    memberUsersStorage = [memberUsersStorage]
                }
                memberUsersStorage.forEach((member) =>{
                    if(member.email.toLowerCase() == sessionEmail.toLowerCase()){
                        member.avatarSrc = (this.newData[0][0] == 'avatar')? this.newData[0][1]:member.avatarSrc
                        member.name = (this.newData[0][0]  == 'name')? this.newData[0][1]:member.name
                        member.name = (this.newData[1] && this.newData[1][0]  == 'name')? this.newData[1][1]:member.name
                    }
                })
                localStorage.setItem('memberUsers',JSON.stringify(memberUsersStorage))
            }
        },
        getDataFromForm() {
            let formInputsArray = document.querySelectorAll('[data-account-data-get=true] > [data-account-value]')
            let newDataArray = []
            formInputsArray.forEach((input) => {
                newDataArray.push(
                    [input.dataset.accountInputName, input.value]
                )
            })
            if (newDataArray.length != 0) {
                this.newData = newDataArray
                this.pushDataToDatabase()
            }
        },
        forceRerender() {
            this.render = false;
            this.$nextTick(() => {
                this.render = true;
            });
        }
    },
    mounted() {
        this.getUserDatabase()
        this.emitter.on('accountSaveData', () => {
            this.getDataFromForm()
        })
        this.emitter.on('cancelData', async () => {
            await this.getUserDatabase()
            await this.forceRerender()
        })
    }
}
</script>

<style scoped>
.settings-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    background-image: var(--bg-theme);
    color: var(--font-main-color);
    border-radius: 20px;
    transition: 0.5s ease all;
}

.settings-body {
    height: calc(650px - 140px);
    overflow: auto;
    padding: 1rem;
}
</style>
