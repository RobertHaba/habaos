<template>
<div class="register-content__form register-form" v-if="!sendStatus">
    <h3 class="register-form__title">SignUP to Falcon<span class="logo-red">One</span></h3>
    <div class="register-form__wrapper">
        <template v-for="item in formItems" :key="item.id">
            <formInput :inputProps="item" v-model="item.value" :sendStatus="trySendStatus" />
        </template>
        <div class="form-item">
            <label class="form-item__label" for="location">Location</label>
            <select class="form-item__select form-item-select" name="location" id="singup-location">
                <option class="form-item-select__option" v-for="location in locations" :value="location.value" :key="location.name">{{location.name}}</option>
            </select>
        </div>
        <div class="form-item">
            <p class="form-item__title">Theme</p>
            <div class="form-item-wrapper">
                <button class="form-button " @click="trySendStatus = true">Light</button>
                <button class="form-button form-button--theme" @click="trySendStatus = true">Dark</button>
            </div>
        </div>
    </div>
    <div class="form-footer">
        <button class="form-button form-subbmit" @click="sendData()">Join to Rocket<span class="logo-red">OS</span></button>
    </div>

</div>
</template>

<script>
import {
    db
} from '@/firebaseDB';
import data from '@/data/data.json'
import formInput from './form-input.vue'
export default {
    data() {
        return {
            formItems: [{
                    id: 'signup-login',
                    tag: 'input',
                    label: 'Login',
                    placeholder: 'ex. RocketMan',
                    minLght: 2,
                    maxLght: 20,
                    type: 'text',
                    value: '',
                    validation: 'validationByLght',
                    validationStatus: false,
                    validationComunicat: 'Please enter login'
                },
                {
                    id: 'signup-password',
                    tag: 'input',
                    label: 'Password',
                    placeholder: 'Min. length 6 signs',
                    minLght: 6,
                    maxLght: 20,
                    type: 'password',
                    value: '',
                    validation: 'validationPassword',
                    validationStatus: false,
                    validationComunicat: 'Please enter password'
                },
                {
                    id: 'signup-name',
                    tag: 'input',
                    label: 'Name',
                    placeholder: 'ex. Joe',
                    minLght: 2,
                    maxLght: 20,
                    type: 'text',
                    value: '',
                    validation: 'validationByLght',
                    validationStatus: false,
                    validationComunicat: 'Please enter name'
                }
            ],
            trySendStatus: false,
            sendStatus: false,
            locations: data.locations,
            newAccountData: Object,
        }
    },
    components: {
        formInput
    },
    methods: {
        async sendData() {
            this.trySendStatus = true
            await this.checkAllRequiredInputs()
            if (await this.trySendStatus) {
                this.checkLogin()
            }

        },
        checkLogin() {
            let loginInput = this.formItems[0]
            db.collection(loginInput.value).get()
                .then((res) => {
                    this.trySendStatus = res.empty
                    loginInput.validationStatus = res.empty
                    loginInput.validationComunicat = 'This login is already assigned to OS.'
                    if (res.empty) {
                        this.createAccountData()
                    }
                })
        },
        checkAllRequiredInputs() {
            this.formItems.forEach(item => {
                if (!item.validationStatus) {
                    this.sendStatus = false
                    this.trySendStatus = false
                }
            })
        },
        async createAccountData() {
            this.newAccountData = await {
                avatar: 'https://imgproxy.ohmydev.pl/WxZTX2DX9QNQxKrsIuI13d6ZMDdN_6WvvGRLNzg0_Hk/pr:profile_mini/plain/https://bucket.ohmydev.pl/images/posts/1a238cac09f0b5da543534876694b987.jpg',
                location: 'Gdynia',
                password: this.formItems[1].value,
                name: this.formItems[2].value,
            }
            this.createAccountInDB()

        },
        createUser(){
            
        },
        createAccountInDB(){
            db.collection(this.formItems[0].value).doc('user').set(this.newAccountData)
            this.sendStatus = true
        }
    }
}
</script>

<style scoped>
.logo-red {
    color: var(--register-second-color);
}

.register-content__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
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
    background-color: var(--register-main-color);
}

.form-button {
    padding: 0.3rem 1.5rem;
    background-color: #FFF;
    color: var(--register-main-color);
    font-weight: bold;
    border-radius: 30px;
}

.form-button--theme {
    color: #FFF;
    background-image: var(--bg-theme);
}

.form-footer {
    display: flex;
    justify-content: center;
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
    border-bottom: 2px solid var(--register-second-color);
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
