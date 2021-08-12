<template>
    <div class="calculator app-container" :class="{'container--dark' : theme == 'dark'}">
        <div class="calculator-container" :class="{'calculator-container--dark' : theme == 'dark'}">
        <div class="calculator-options">
                <button class="switch-button" title="Change theme to Light" aria-label="Change theme to Light" @click="theme = 'light'">
                    <span class="icon i-sun"></span>
                </button>
                <button class="switch-button" title="Change theme to Dark" aria-label="Change theme to Dark" @click="theme = 'dark'">
                    <span class="icon i-moon"></span>
                </button>
        </div>
        <div class="calculator-view">
            <p class="calculations">
                <span class="calculations-text">{{numberFirst}}</span>
                <span class="calculations-operator">{{operator}}</span>
                <span class="calculations-text">{{numberSecond}}</span>
            </p>
            <p class="result" :aria-label='"Math result: "+ result'>{{result}}</p>
        </div>
        <div class="calculator-buttons">
            <button class="btn btn--orange" v-on:click="reset()" title='Click to clear' aria-label="Click to clear">AC</button>
            <button class="btn btn--orange" v-on:click="reverseSign()" title='Click to reverse symbol' aria-label="Click to reverse symbol">+/-</button>
            <button class="btn btn--orange" @click="operator = '%', calculationOf('%')" title='Click to add percentage symbol' aria-label="Click to add percentage symbol" data-key='%'>%</button>
            <button class="btn btn--orange" @click="operator = '/', calculationOf('/')" title='Click to add division symbol' aria-label="Click to add division symbol" data-key='/'>÷</button>
            <button class="btn" v-on:click="addNumber('7')" title='Click to add 7' aria-label="Click to add 7" data-key='7'>7</button>
            <button class="btn" v-on:click="addNumber('8')" title='Click to add 8' aria-label="Click to add 8" data-key='8'>8</button>
            <button class="btn" v-on:click="addNumber('9')" title='Click to add 9' aria-label="Click to add 9" data-key='9'>9</button>
            <button class="btn btn--orange" @click="operator = '*', calculationOf('*')" title='Click to add multiple symbol' aria-label="Click to add multiple symbol" data-key='*'>x</button>
            <button class="btn" v-on:click="addNumber('4')" title='Click to add 4' aria-label="Click to add 4" data-key='4'>4</button>
            <button class="btn" v-on:click="addNumber('5')" title='Click to add 5' aria-label="Click to add 5" data-key='5'>5</button>
            <button class="btn" v-on:click="addNumber('6')" title='Click to add 6' aria-label="Click to add 6" data-key='6'>6</button>
            <button class="btn btn--orange" @click="operator = '-', calculationOf('-')" title='Click to add minus symbol' aria-label="Click to add minus symbol" data-key='-'>-</button>
            <button class="btn" v-on:click="addNumber('1')" title='Click to add 1' aria-label="Click to add 1" data-key='1'>1</button>
            <button class="btn" v-on:click="addNumber('2')" title='Click to add 2' aria-label="Click to add 2" data-key='2'>2</button>
            <button class="btn" v-on:click="addNumber('3')" title='Click to add 3' aria-label="Click to add 3" data-key='3'>3</button>
            <button class="btn btn--orange" @click="operator = '+', calculationOf('+')" title='Click to add plus symbol' aria-label="Click to add plus symbol" data-key='+'>+</button>
            <button class="btn btn--remove btn--orange" v-on:click="removeLastChar()" title='Click to remove last char' aria-label="Click to remove last char" data-key='backspace'> <span class="icon i-arrow"></span> </button>
            <button class="btn" v-on:click="addNumber('0')" title='Click to add 0' aria-label="Click to add 0" data-key='0'>0</button>
            <button class="btn" v-on:click="addNumber('.')" title='Click to add dot symbol' aria-label="Click to add dot symbol" data-key='.'>.</button>
            <button class="btn btn--orange" @click="calculationOf('result')" data-key='Enter'>=</button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name:'Calculator',
    data(){
        return{
            number:'',
            numberFirst:'',
            numberSecond:'',
            result:'0',
            lastOperator: '',
            operator:'',
            theme: 'light'
        }
    },
    methods:{
        reset(){
            let themeColor = this.theme
            Object.assign(this.$data, this.$options.data.apply(this))
            this.theme = themeColor
        },
        removeLastChar(){
            this.number = ''
            if(this.numberSecond == '' && this.operator == ''){
                this.numberFirst = this.numberFirst.toString().slice(0,-1)
                this.number = this.numberFirst
            }
            else if(this.operator !== '' && this.numberSecond == '' ){
                this.operator = ''
            }
            else if(this.operator !== ''){
                this.numberSecond = this.numberSecond.toString().slice(0,-1)
                this.number = this.numberSecond
            }
        },
        addNumber(number){
            if(this.checkNumberLength()){
                if(this.number.slice(-1) !== '.'){
                    this.number += number
                }
                else if(number !== '.'){
                    this.number += number
                }
                this.checkWhereToAddNumber()
            }
        },
        checkWhereToAddNumber(){
            if(this.operator == ''){
                this.numberFirst = this.number
            }
            else{
                this.lastOperator = (this.operator == '')? '' : this.operator
                this.numberSecond = this.number
            }
        },
        checkNumberLength(){
            return (this.number.length < 16 )? true : false;
        },
        calculationOf(operator){
            this.number = ''
            this.operator = (operator == 'result')? '' : this.operator
            if(this.numberSecond !== ''){
                if(this.lastOperator == '+'){
                    this.result = this.mathAdd()
                }
                else if(this.lastOperator == '-'){
                    this.result = this.mathSubtraction()
                }
                else if(this.lastOperator == '*'){
                    this.result = this.mathMultiplication()
                }
                else if(this.lastOperator == '/'){
                    if(this.numberSecond == '0'){
                        this.result = 'Nie można dzielić przez zero'
                    }
                    else{
                        this.result = this.mathDivision()
                    }
                }
                else if(this.lastOperator == '%'){
                    
                    this.result = this.mathPercentage()
                }
                if(typeof(this.result) == 'number' ){
                    this.numberFirst = this.result
                }
                this.numberSecond = ''
            }
        },
        mathAdd(){
            return +this.numberFirst + +this.numberSecond
        },
        mathSubtraction(){
            return +this.numberFirst - +this.numberSecond
        },
        mathMultiplication(){
            return +this.numberFirst * +this.numberSecond
        },
        mathDivision(){
            return +this.numberFirst / +this.numberSecond
        },
        mathPercentage(){
            return (+this.numberSecond / 100) * +this.numberFirst
        },
        reverseSign(){
            if(this.numberSecond == ''){
                this.numberFirst = (this.numberFirst > 0)? -Math.abs(this.numberFirst) : Math.abs(this.numberFirst)
            }
            else{
                this.numberSecond = (this.numberSecond > 0)? -Math.abs(this.numberSecond) : Math.abs(this.numberSecond)
            }
        },
        keyClickEvents(){
            let correctOperators = ['+','-','/','%','*']
            let buttons = document.querySelectorAll('[data-key]')
            document.addEventListener('keydown', function(e){
                if(e.key >= 0 && e.key <= 9 || e.key == '.' || e.key == ','){
                    let keynumber
                    keynumber = (e.key == ',')? '.' : e.key
                    this.setFocusTo(buttons, keynumber)
                    this.addNumber(keynumber)
                }
                else if(e.key == '=' || e.key == 'Enter'){
                    this.setFocusTo(buttons, 'Enter')
                    this.calculationOf('result')
                }
                else if(e.key == 'Backspace'){
                    this.setFocusTo(buttons, 'Backspace')
                    this.removeLastChar()
                }
                correctOperators.forEach((operator)=>{
                    if(e.key == operator){
                    this.setFocusTo(buttons, operator)
                        this.operator = operator
                        this.calculationOf(operator)
                    }
                })
            }.bind(this))
        },
        setFocusTo(buttons,key){
            buttons.forEach((el)=>{
                if(el.dataset.key == key){
                    el.focus()
                }
            })
        },
        checkIfBrowserIsSetToDarkMode(){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark'
            }
        }
    },
    mounted(){
        this.keyClickEvents()
        this.checkIfBrowserIsSetToDarkMode()
    }
}
</script>

<style scoped>

button:focus{
    outline: none !important;
    box-shadow: 0 0 3px 1px #f57621;
    border-radius: 100px;
}
.btn .icon{
    position: relative;
    display: flex;
}
.icon{
    display: block;
    width: 1rem;
    height: 1rem;
    background-size: 100%;
    
}
.i-sun{
    background: url('../assets/icons/sun.svg');
}
.i-moon{
    background: url('../assets/icons/moon.svg');
}
.i-arrow{
    background-image: url('../assets/icons/left-arrow.svg');
}
.container--dark .switch-button .icon{
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
          filter: invert(100%);
}
.app-container{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: 0.5s ease all;
  border-radius: 20px;
}
.calculator-container{
    position: relative;
    display: grid;
    grid-template-rows: 80px 3fr 6fr;
    width: 100%;
    min-width: 330px;
    min-height: 650px;
    height: 100%;
    max-height: 650px;
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.calculator-container--dark{
    background-color: #22252D;
}
.calculator-options{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 80px;
}
.switch-button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 35px;
    border: none;
    transition: 0.5s ease all;
}
.calculator-container--dark .switch-button{
    background-color: #292D36;
}
.switch-button:first-child{
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
}
.switch-button:last-child{
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
}

.switch-button:focus{
    background-color: #DDD;
}

.calculator-container--dark .switch-button:focus{
    background-color: rgb(78, 78, 78);
}

.calculator-view{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    padding: 1rem;
    font-weight: bold;
    text-align: right;
    transition: 0.5s ease all;
}

.calculator-container--dark .calculator-view{
    color: #FFF;
}
.calculations{
    display: flex;
    max-width: 100%;
    text-align: right;
    overflow-x: auto;
    color:rgb(122, 122, 122);
}
*::-webkit-scrollbar {
    height: 10px;
}
 
*::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgb(158, 158, 158);
    border-radius: 10px;
}
 
*::-webkit-scrollbar-thumb {
    background-color: rgb(245, 118, 33);
    border-radius: 10px;
}
.result{
    margin-top: 0.3rem;
    width: 100%;
    overflow-x: auto;
    font-size: 2rem;
}
.calculator-buttons{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    border-radius: 20px;
    transition: 0.5s ease all;
}
.calculator-container--dark .calculator-buttons{
    background-color: #292D36;
}
.btn{
    width: 50px;
    height: 50px;
    border:none;
    border-radius: 100px;
    font-weight: bold;
    transition: 0.5s ease background-color;
}
.calculator-container--dark .btn{
    color:#DDD;
    background-color: #242931;
}
.btn--remove{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn--orange{
    color: rgb(245, 118, 33);
}
.calculator-container--dark .btn--orange{
    color: #f57621;
}
.calculations-operator{
    margin: 0 0.2rem;
    color: rgb(245, 118, 33);
    font-size: 0.9rem;
}
</style>