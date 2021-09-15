<template>
<div class="form-item" v-if='itemData'>
    <label class="form-item__label" :for="itemData.label">{{itemData.label}}</label>
    <component :is="itemData.tag" class="form-item__input" :type="itemData.type" :name="itemData.label" :id="itemData.id" :placeholder="itemData.placeholder" :minlength="itemData.minLght" :maxlength="itemData.maxLght" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keyup="validation(itemData.validation)" />
    <div class="form-item__wrapper form-item-wrapper">
        <p class="form-item-wrapper__message" v-if="(sendStatus && itemData.value.length == 0) || (sendStatus && itemData.validationStatus === false)">{{itemData.validationMessage}}</p>
        <p class="form-item-wrapper__message" v-if="(itemData.value.length !== 0)">Remaining: {{availableCharacters}}</p>
    </div>
</div>
</template>

<script>
export default {
    props: {
        inputProps: Object,
        modelValue: String,
        sendStatus: Boolean
    },
    data() {
        return {
            itemData: this.inputProps,
        }
    },
    computed: {
        availableCharacters: function () {
            return this.itemData.maxLght - this.itemData.value.length
        }
    },
    methods: {
        validation(functionName) {
            if(functionName){
                let input = this.itemData
                this[functionName](input)
            }
        },
        validationByLght(input) {
            input.validationStatus = (input.value.length >= input.minLght && input.value.length <= input.maxLght) ? true : false
            if (input.value.length <= input.minLght) {
                input.validationMessage = `Please enter more than ${input.minLght} signs.`
            }
        },
        validationByRegex(input){
            input.validationStatus = input.regexData.regex.test(input.value)
            input.validationMessage = input.regexData.message 
        },
    },

}
</script>

<style scoped>

</style>
