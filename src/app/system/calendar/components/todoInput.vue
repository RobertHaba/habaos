<template>
    <div>
        <div class="todo-input-box"><label :for="inputName" >{{inputLabel}}</label> <p v-show="remainingLength != inputMaxLength && inputLength >= inputMinLength" class="validation-alert">Remaining length: {{remainingLength}}</p><p class="validation-alert" v-show="keyPressed && inputLength < inputMinLength">Too short, min length is {{inputMinLength}}</p></div>
        <component :is="inputTag" :type="inputType" :name="inputName" @keyup="getData" :placeholder="inputText" :maxlength="inputMaxLength" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"  v-bind="$attrs"> </component>
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
            modelValue: String,
            inputMaxLength: Number,
            inputMinLength: Number,
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
                if(this.inputData.value !== '' || this.inputData.value >= this.inputMaxLength){
                    this.emitter.emit('getTodoDate', this.inputData)
                }
                
            }
        },
        watch:{
            modelValue: function(newValue){
                this.inputData.value= newValue
            }
        },
        mounted(){
            this.inputData.value = this.modelValue
            this.emitter.on('getDataTodoInput',this.pushDataToApp)
            this.emitter.all.forEach((emitFunctionArray,emitName)=>{
                    if(emitName == 'getDataTodoInput' && emitFunctionArray.length >2){
                        emitFunctionArray.splice(0,2)
                }
            }) //<--- FIX Multiple emitter function on every mounted 
            
            this.emitter.all.forEach((emitFunctionArray,emitName)=>{
                    if(emitName == 'getTodoDate' && emitFunctionArray.length >1){
                        emitFunctionArray.splice(0,1)
                }
            }) //<--- FIX Multiple emitter function on every mounted 
        }
    }
</script>

<style scoped>
</style>