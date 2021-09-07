<template>
<div class="register-header">
    <h1 class="register-header__title">
        {{headerData.title}}
    </h1>
    <div class="register-header__logo-container">
        <div class="logo-column">
            <h2 class="logo-title">Rocket<span class="logo-red">OS</span></h2>
            <h3 class="logo-version">Falcon<span class="logo-red">One</span></h3>
        </div>
        <div class="logo-column logo-column--icon">
            <span class="icon icon--logo">

            </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        headerData:Object
    }
}
</script>

<style scoped>

.register-header{
    display: grid;
    grid-template-columns: 8fr 4fr;
    margin-bottom: 6rem;

}
.register-header__title{
    font-size: 3rem;
}
.register-header__logo-container{
    display: flex;
    justify-content: flex-end;
    height: 60px;
}
.logo-column{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-right: 0.5rem;
}
.logo-column--icon{
    align-items: center;
    justify-content: center;
    margin: 0;
}
.logo-title{
    font-size: 1.8rem;
}
.logo-version{
    width: 120px;
    padding: 0.1rem 0;
    text-align: center;
    color:var(--register-main-color);
    background-color: #FFF;
    border-radius: 100px;
}
.logo-red{
    color: var(--register-second-color);
}
.icon--logo{
    width: 45px;
    height: 45px;
}
</style>
