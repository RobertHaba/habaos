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
    margin-bottom: 6em;

}
.register-header__title{
    font-size: 3em;
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
    margin-right: 0.5em;
}
.logo-column--icon{
    align-items: center;
    justify-content: center;
    margin: 0;
}
.logo-title{
    font-size: 1.8em;
}
.logo-version{
    width: 120px;
    padding: 0.1em 0;
    text-align: center;
    font-size: 1em;
    color:var(--subpage-main-color);
    background-color: #FFF;
    border-radius: 100px;
}
.icon--logo{
    width: 45px;
    height: 45px;
}

@media (max-width:1050px) {
    .register-header{
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        font-size: 12px;
    }
    .register-header__title{
        text-align: center;
        font-size: 2.5em;
    }
    .logo-column{
        justify-content: space-evenly;
    }
    
}
</style>
