<template>
    <div class="drop-small-menu">
        <button class="drop-small-menu__button" v-for="button in buttonsOption" :key="button.id" @click="choseFunctionForParent(button.functionName)" :title="button.title"><span class="icon drop-small-menu-icon" :style="{'background-image':'url('+ button.url+')'}"></span></button>
    </div>
</template>

<script>
    export default {
        props:{
            buttonsOption:{
                type:Array
            }
        },
        methods:{
            choseFunctionForParent(functionName){
                this.$emit("dropMenuEmitFunction", functionName)
            }
        }
    }
</script>

<style scoped>
.drop-small-menu{
    position: absolute;
    height: 40px;
    padding-left: 1rem;
    padding-right: 0px;
    cursor: default;
}
.drop-small-menu__button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 1rem;
    background-color: rgba(0, 0, 0, 0.418);
    border-radius: 10px;
}
.drop-small-menu-icon{
    width: 16px;
    height: 16px;
    filter: invert(99%) sepia(100%) saturate(0%) hue-rotate(285deg) brightness(110%) contrast(101%);
}
</style>