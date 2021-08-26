<template>
    <div>
        <div class="addForm-input-box"><label :for="inputProps.inputName" >{{inputProps.inputName}}</label> <p v-show="remainingLength != inputProps.inputMaxLength && inputLength >= inputProps.inputMinLength" class="validation-alert">Remaining length: {{remainingLength}}</p><p class="validation-alert" v-show="keyPressed && inputLength < inputProps.inputMinLength">Too short, min length is {{inputProps.inputMinLength}}</p></div>
        <component :is="inputProps.inputTag" :type="inputProps.inputType" :name="inputProps.inputName" @keyup="getData" :placeholder="inputProps.inputPlaceholder" :maxlength="inputProps.inputMaxLength" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"  v-bind="$attrs"> </component>
    </div>
</template>

<script>
    export default {
        model:{
            prop:'title',
            event:'change'
        },
        props:{
            modelValue: String,
            inputProps:Object
        },
        data(){
            return{
                inputData:{
                    name:this.inputProps.inputName,
                    value: ''
                },
                remainingLength:this.inputProps.inputMaxLength,
                inputLength:0,
                keyPressed: false
            }
        },
        methods:{
            getData(e){
                this.keyPressed = true
                this.lengthCounter(e)
                this.inputData.value = (this.inputLength >= this.inputProps.inputMinLength && this.inputLength <= this.inputProps.inputMaxLength)? e.target.value : ''
                
            },
            lengthCounter(e){
                this.remainingLength = this.inputProps.inputMaxLength - e.target.value.length
                this.inputLength = e.target.value.length
            },
            pushDataToApp(){
                if(this.inputData.value !== '' || this.inputData.value >= this.inputProps.inputMaxLength){
                    this.emitter.emit(this.inputProps.emitUseName, this.inputData)
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
            this.emitter.on(this.inputProps.emitCreateName,this.pushDataToApp)
            this.emitter.all.forEach((emitFunctionArray,emitName)=>{
                    if(emitName ==this.inputProps.emitCreateName && emitFunctionArray.length >2){
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