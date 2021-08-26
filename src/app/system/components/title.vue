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
            styleProps:{
                fontColor: {
                    type: String,
                    default: '#FFFFFF'
                },
                fontSize: {
                    type: String,
                    default: '1rem'
                },
                padding: {
                    type: String,
                    default: '0'
                },
            }
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