<template>
    <div>
        <div class="todo-input-box"><label :for="inputName" >{{inputLabel}}</label> <p v-show="remainingLength != inputMaxLength && inputLength >= inputMinLength" class="validation-alert">Remaining length: {{remainingLength}}</p><p class="validation-alert" v-show="keyPressed && inputLength < inputMinLength">Too short, min length is {{inputMinLength}}</p></div>
        <component :is="inputTag" :type="inputType" :name="inputName" @keyup="getData" :placeholder="inputText" :maxlength="inputMaxLength"> </component>
    </div>
</template>

<script>
    export default {
        model:{
            prop:'title',
            event:'change'
        },
        props:{
            inputName:String,
            inputTag:String,
            inputType:String,
            inputLabel: String,
            inputText: String,
            inputMaxLength: Number,
            inputMinLength: Number,
            getChildData: Function
        },
        data(){
            return{
                inputData:{
                    name:this.inputName,
                    value: ''
                },
                remainingLength:this.inputMaxLength,
                inputLength:0,
                keyPressed: false
            }
        },
        methods:{
            getData(e){
                this.keyPressed = true
                this.lengthCounter(e)
                this.inputData.value = (this.inputLength >= this.inputMinLength && this.inputLength <= this.inputMaxLength)? e.target.value : ''
                
            },
            lengthCounter(e){
                this.remainingLength = this.inputMaxLength - e.target.value.length
                this.inputLength = e.target.value.length
            },
            pushDataToApp(){
                this.keyPressed = (this.inputData.value == '' || this.inputData.value <= this.inputMaxLength)? true : false
                this.emitter.emit('getTodoDate', this.inputData)
            }
        },
        mounted(){
            this.emitter.on('getData',this.pushDataToApp)
        }
    }
</script>

<style scoped>
</style>