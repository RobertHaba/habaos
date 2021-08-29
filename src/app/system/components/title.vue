<template>
    <div class="app-section-title">
        <p class="app-section-title__text">
            {{sectionTitle}}
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            sectionTitle: String,
            styleProps:Object
        }
    }
</script>

<style scoped>
.app-section-title{
    padding: v-bind(styleProps.padding);
}
.app-section-title__text{
    font-size: v-bind(styleProps.fontSize);
    color: v-bind(styleProps.fontColor);
    font-weight:bold;
}
</style>