<template>
<div class="register-content__form register-form">
    <h3 class="register-form__title">SignUP to Falcon<span class="logo-red">One</span></h3>
    <div class="register-form__wrapper">
        <div class="register-form-item" v-for="item in formItems" :key="item.id">
            <label class="register-form-item__label" :for="item.label">{{item.label}}</label>
            <input class="register-form-item__input" :type="item.type" :name="item.label" :id="item.id" :placeholder="item.placeholder">
        </div>
        <div class="register-form-item">
            <label class="register-form-item__label" for="location">Location</label>
            <select class="register-form-item__select form-item-select" name="location" id="singup-location">
                <option class="form-item-select__option" v-for="location in locations" :value="location.value" :key="location.name">{{location.name}}</option>
            </select>
        </div>
    </div>
    
</div>
</template>

<script>
import data from '@/data/data.json'
console.log(data);
export default {
    data() {
        return {
            formItems: [{
                    id: 'signup-login',
                    label: 'Login',
                    placeholder: 'ex. RocketMan',
                    type: 'text'
                },
                {
                    id: 'signup-password',
                    label: 'Password',
                    placeholder: 'Min. length 5 signs',
                    type: 'password'
                },
                {
                    id: 'signup-name',
                    label: 'Name',
                    placeholder: 'ex. Joe',
                    type: 'text'
                }
            ],
            locations:data.locations
        }
    }
}
</script>

<style scoped>
.logo-red{
    color: var(--register-second-color);
}
.register-content__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 550px;
    padding: 3rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
}

.register-form__title {
    font-size: 1.35rem;
}

.register-form__wrapper {
    width: 100%;
    padding: 2rem 0;
}

.register-form-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
}

.register-form-item__label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.register-form-item__input,
.register-form-item__select {
    padding-bottom: 0.4rem;
    color: #FFF;
    background-color: unset;
    border:none;
    border-bottom: 2px solid var(--register-second-color);
}
.form-item-select__option{
    background-color: var(--register-main-color);
}
</style>
