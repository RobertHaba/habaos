<template>
    <div class="subtitle-container">
        <div class="subtitle-wrapper">
            <p class="subtitle-text">{{text}}</p>
            <hr class="horizontal-line line--light-color"/>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            text:String
        }
    }
</script>

<style scoped>
.subtitle-container{
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    width: 100%;
    opacity: 0.7;
}
.subtitle-wrapper{
    width: 100%;
    max-width: 230px;
}
.subtitle-text{
    text-align: center;
    margin-bottom: 1rem;
}
</style>