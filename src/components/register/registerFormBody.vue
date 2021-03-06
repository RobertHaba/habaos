<template>
<div class="register-content__form register-form box-shadow-dark" v-if="!sendStatus">
    <h3 class="register-form__title">SignUP to Falcon<span class="logo-red">One</span></h3>
    <div class="register-form__wrapper">
        <template v-for="item in formItems" :key="item.id">
            <formInput :inputProps="item" v-model="item.value" :sendStatus="validationError" />
        </template>
        <div class="form-item">
            <label class="form-item__label" for="location">Location</label>
            <select class="form-item__select form-item-select" name="location" id="singup-location" v-model="userLocation">
                <option class="form-item-select__option" v-for="location in locations" :value="location.value" :key="location.name">{{location.name}}</option>
            </select>
        </div>
        <div class="form-item">
            <p class="form-item__title">Theme</p>
            <div class="form-item-wrapper">
                <template v-for="theme in ['light','dark']" :key="theme">
                    <button class="form-button" :class="themeClass(theme)" @click="userTheme = theme">{{theme}}</button>
                </template>
            </div>
        </div>
    </div>
    <div class="form-footer">
        <button class="form-button form-subbmit" :disabled="trySendStatus" @click="sendData()">Join to Rocket<span class="logo-red">OS</span></button>
        <p class="form-footer-text">Do you have an account? <router-link class="form-footer-text__link" to="/login">Login</router-link>
        </p>
    </div>

</div>
</template>

<script>
import {
    fBase
} from '@/firebaseDB';
import data from '@/data/data.json'
import formInput from '../assets/form/form-input.vue'
import createUserDataMixin from '@/components/system/settings/systemCreateUserData.js'
export default {
    mixins: [createUserDataMixin],
    props: {
        headerData: Object,
        installationDataProp: Object
    },
    data() {
        return {
            formItems: [{
                    id: 'signup-email',
                    tag: 'input',
                    label: 'Email',
                    placeholder: 'ex. tommy@mail.com',
                    minLght: 2,
                    maxLght: 999,
                    type: 'text',
                    value: '',
                    validation: 'validationByRegex',
                    validationStatus: false,
                    validationMessage: 'Please enter email',
                    regexData: {
                        regex: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email ex. ex@ex.ex'
                    },

                },
                {
                    id: 'signup-password',
                    tag: 'input',
                    label: 'Password',
                    placeholder: 'Length 6-12',
                    minLght: 6,
                    maxLght: 12,
                    type: 'password',
                    value: '',
                    validation: 'validationByRegex',
                    validationStatus: false,
                    validationMessage: 'Please enter password',
                    regexData: {
                        regex: /^(?=.*\d)(?=.*[a-zA-Z])(?=.).{6,}$/,
                        message: 'Please enter min.6 chars, one letter and one number.'
                    },
                },
                {
                    id: 'signup-name',
                    tag: 'input',
                    label: 'Name',
                    placeholder: 'ex. Tommy',
                    minLght: 2,
                    maxLght: 20,
                    type: 'text',
                    value: '',
                    validation: 'validationByLght',
                    validationStatus: false,
                    validationMessage: 'Please enter name'
                }
            ],
            userID: '',
            userLocation: 'Gdansk',
            userTheme: 'dark',
            trySendStatus: false,
            validationError: false,
            sendStatus: false,
            locations: data.locations,
            newAccountData: Object,
            header: this.headerData,
            installationData: this.installationDataProp
        }
    },
    computed: {

    },
    components: {
        formInput
    },
    methods: {
        async sendData() {
            this.trySendStatus = true
            this.validationError = false
            await this.checkAllRequiredInputs()
            if (await this.trySendStatus) {
                this.createUserAccount()
            } else {
                this.trySendStatus = false
            }

        },
        checkAllRequiredInputs() {
            this.formItems.forEach(item => {
                if (!item.validationStatus) {
                    this.sendStatus = false
                    this.validationError = true
                    this.trySendStatus = false
                }
            })
        },
        createUserAccount() {
            fBase.auth().createUserWithEmailAndPassword(this.formItems[0].value, this.formItems[1].value)
                .then((data) => {
                    this.installationData.installation = true
                    this.installationData.packageName = 'createUserAccount'
                    this.installationData.step = 1
                    this.userID = data.user.uid
                    this.createAccountData()
                })
                .catch(err => {
                    console.log(err);
                    this.trySendStatus = false
                    this.formItems[0].validationStatus = false
                    this.validationError = true
                    this.formItems[0].validationMessage = 'This account is already assigned to OS.'
                })
        },
        async createAccountData() {
            this.installationData.packageName = 'createAccountData'
            this.installationData.step = 2

            this.newAccountData = await {
                avatar: 'https://cdn.haba.usermd.net/os/img/user.webp',
                location: this.userLocation,
                name: this.formItems[2].value,
                theme: this.userTheme,
            }
            this.createAccountDataInDB()

        },
        createAccountDataInDB() {
            fBase.firestore().collection(this.userID).doc('user').set(this.newAccountData)
                .then(() => {
                    this.installationData.packageName = 'createAccountDataInDB'
                    this.installationData.step = 3
                    this.createTreeData(this.userID)
                })
            this.sendStatus = true
        },
        themeClass(theme) {
            let className = 'form-button--' + theme
            let classNameActive = (this.userTheme == theme) ? 'form-button--active' : ''
            return className + ' ' + classNameActive
        }
    },
    watch: {
        finish: {
            deep: true,
            handler() {
                localStorage.setItem('email', this.formItems[0].value)
                let userObjects = {
                    email: this.formItems[0].value,
                    name: this.formItems[2].value,
                    avatarSrc: 'https://cdn.haba.usermd.net/os/img/user.webp',

                }
                let memberUsersFromStorage = localStorage.getItem('memberUsers')
                if (memberUsersFromStorage !== null) {
                    let memberUsersArray
                    memberUsersArray = (Array.isArray(JSON.parse(memberUsersFromStorage))) ? JSON.parse(memberUsersFromStorage) : [JSON.parse(memberUsersFromStorage)]
                    memberUsersArray.unshift(userObjects)
                    localStorage.setItem('memberUsers', JSON.stringify(memberUsersArray))
                } else {
                    localStorage.setItem('memberUsers', JSON.stringify(userObjects))
                }
                localStorage.setItem('uid', this.userID)
                this.$router.push({
                    path: 'login'
                })
            }
        }
    }
}
</script>

<style scoped>
.register-content__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 330px;
    min-height: 550px;
    padding: 3rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
}

.register-form__title {
    font-size: 1.35rem;
}

.register-form__wrapper {
    width: 100%;
    padding: 2rem 0 1rem 0;
}

.form-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
}

.form-item-select__option {
    background-color: var(--subpage-main-color);
}

.form-button {
    position: relative;
    padding: 0.3rem 1.5rem;
    background-color: #FFF;
    color: var(--subpage-main-color);
    font-weight: bold;
    border-radius: 30px;
}

.form-button--light {
    background-image: #FFF;
}

.form-button--dark {
    color: #FFF;
    background-image: var(--bg-theme);
}

.form-button::first-letter {
    text-transform: uppercase;
}

.form-button--active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 100%;
    border-bottom: 2px solid var(--subpage-second-color);
}

.form-button:hover {
    border-radius: 3px;
    transition: 0.5s ease all;
}

.form-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.form-footer-text {
    font-size: 0.8em;
    margin-top: 0.5rem;
}

.form-footer-text__link {
    color: var(--subpage-second-color);
}
</style><style>
.form-item__label,
.form-item__title {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-item__input,
.form-item__select {
    padding-bottom: 0.4rem;
    color: #FFF;
    background-color: unset;
    border: none;
    border-bottom: 2px solid var(--subpage-second-color);
}

.form-item-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 0.2rem;
}

.form-item-wrapper__message {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.7);
}
</style>
