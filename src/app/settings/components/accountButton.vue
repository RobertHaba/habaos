<template>
    <button class="btn" :class="btnClass">
        <div class="btn-icon">
            <span class="icon" :style="{'background-image' : 'url(' + imgURL + ')'}"></span>
        </div>
        <div class="btn-text">
            <p>{{btnText}}</p>
        </div>
    </button>
</template>

<script>
    export default {
        props:{
            btnClass:String,
            imgURL: String,
            btnText: String
        }
    }
</script>

<style scoped>
.btn{
    display: flex;
    width: auto;
    height: 30px;
    font-size: 0.75rem;
    font-weight: bold;
    color: #FFF;
    border-radius: 10px;
}
.btn--positive{
    background-color: #1EAD23;
}
.btn--negative{
    background-color: #AD1E1E;
}
.btn-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 2rem;
    background-color: #00000033;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.icon{
    display: block;
    width: 0.9rem;
    height: 0.9rem;
}
.btn-text{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 1.5rem 0 1rem;
    text-align: center;
}
</style>