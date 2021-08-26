<template>
    <div class="window-addForm-cover window-addForm-cover--dark" @click.self="closeTodoEditor()">
        <div class="window-addForm-container" >
            <windowHeader :headerTitle="headerTitleText" />
            <div class="window-addForm-main" >
                <template v-for="(input,index) in addSettings.inputs" :key="input.inputName">
                    <windowInput class="window-addForm-main__column" :inputProps="input" v-model="addFormEditData[index]"/>
                </template>

                <div class="window-addForm-main__column" >
                    <div class="addForm-input-box"><p class="window-addForm-column-title">Priority</p><p class="validation-alert" v-if="this.priorityData.validation === false">Chose priority</p></div>
                    <div class="window-addForm-buttons-wrapper">
                        <template v-for="tag in addSettings.tagValues" :key="tag" >
                            <windowBtn class="addForm-button" :class="{'addForm-button--active':priorityData.value == tag.title}" :btnTitle="tag.title" :btnBgColor="tag.bgColor" @click="priorityData.value = tag.title"/>
                        </template>
                    </div>
                </div>
                <div class="window-addForm-footer">
                    <windowBtn class="addForm-button" btnTitle="Save" btnBgColor="#4CAF50" @click="callToInput"/>
                </div>
            </div>
        </div>
        <defaultModal :modalProps="modalData" v-if="modalData !== ''"/>
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import windowHeader from './windowHeader.vue'
import windowInput from './windowInput.vue'
import windowBtn from './windowBtn.vue'
import defaultModal from '@/components/modals/defaultModal.vue'
    export default {
        props:{
            activeDate: String,
            addSettings: Object
        },
        components:{
            windowHeader,
            windowInput,
            windowBtn,
            defaultModal
        },
        data(){
            return{
                addFormData:[],
                priorityData:this.addSettings.tagData,
                validationStatus:[],
                addFormDate: this.activeDate.split('.'),
                addFormId: Date.now().toString(),
                modalData:'',
                headerTitleText:this.addSettings.title,
                addFormEditData:[],
                editMode: this.addSettings.editMode
            }
        },
        methods:{
            async getTodoData(addFormChildData){
                this.addFormData.push(addFormChildData)
            },
            async checkData(){
                this.validationStatus = true
                this.modalData = ""
                await this.addFormData.forEach(data => {
                    data.validation = true
                    if(data.value == ''){
                        this.validationStatus = false
                        data.validation = false
                    }
                });
                console.log(this.addFormData);
                if(await this.validationStatus && this.addFormData.length == (this.addSettings.inputs.length + 1)){
                    this.sendToDB()
                }
                else{

                    this.modalData = {
                        title:'Failed',
                        text:'Complete the form correctly',
                        icon:'http://cdn.haba.usermd.net/os/icons/sad-face.svg',
                        timeout:4000
                    }
                }
            },
            async callToInput(){
                this.addFormData = []
                this.addFormData.push(this.priorityData)
                this.emitter.emit(this.addSettings.emits.input)
                setTimeout(()=>{
                    this.checkData()
                },200)
                
            },
            sendToDB(){
                console.log('Sending to DB ID: ' +this.addFormId + ' with data:');
                console.log(this.addFormData);
                if(this.addSettings.app == 'todoApp'){
                    let objectTodoData = {
                        id: this.addFormId,
                        title: this.addFormData[1].value,
                        description: this.addFormData[2].value,
                        priority: this.addFormData[0].value,
                        createAt: this.addFormDate.toString()
                    } // Tu trzeba zrobić zmiany
                    this.dummyFields()
                    db.collection('admin').doc('todoApp').collection('todo').doc(this.addFormDate[0]).collection(this.addFormDate[1].replace('0','')).doc(this.addFormDate[2]).collection('lists').doc(this.addFormId).set(
                        objectTodoData
                    )
                    .then(()=>{
                        console.log('Data with ID: ' +this.addFormId + ' is successfully sent!');
                        this.modalData = {
                            title:'Succes',
                            text:'Your data has been successfully sent!',
                            icon:'http://cdn.haba.usermd.net/os/icons/happy-face.svg',
                            timeout:4000
                        }
                        this.headerTitleText = 'Edit task'
                    })
                    .catch(()=>{
                        this.modalData = {
                            title:'Error',
                            text:'Your data has not been sent!',
                            icon:'http://cdn.haba.usermd.net/os/icons/sad-face.svg',
                            timeout:4000
                        }
                    })
                }
            },
            dummyFields(){
                db.collection('admin').doc('todoApp').collection('todo').doc(this.addFormDate[0]).set({dummy:'dummy'})
                db.collection('admin').doc('todoApp').collection('todo').doc(this.addFormDate[0]).collection(this.addFormDate[1].replace('0','')).doc(this.addFormDate[2]).set({dummy:'dummy'})
            },
            closeTodoEditor(){
                console.log('zamykanie');
                this.emitter.emit(this.addSettings.emits.resetData)
                this.emitter.emit(this.addSettings.emits.openEditor,false)
            }
        },
        mounted(){
            console.log('Załadowano');
            this.addFormEditData.length = 0
            this.priorityData.value = ''
            this.addFormData.length = 0
            this.emitter.on(this.addSettings.emits.getData, this.getTodoData)
            this.emitter.on(this.addSettings.emits.edit,(data)=>{
                this.headerTitleText = this.addSettings.editorTitle
                this.addFormEditData = data
                this.addFormId = this.addFormEditData[this.addFormEditData.length -1]
                console.log('Edytowanie addForm');
                this.priorityData.value = data[this.addFormEditData.length -2]
                console.log(this.addFormEditData);
            })
        }
        
    }
</script>

<style>
.window-addForm-cover,
.window-addForm-container,
.window-addForm-main{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    background-color: #FFF;
    border-radius: 20px;
    transition: 0.5s ease all;
}
.window-addForm-cover--dark{
    background-color: #3e424da2;
    color: #FFF;
}
.window-addForm-container{
    position: absolute;
    bottom: 0;
    padding: 2rem 1.5rem 1.5rem;
    height: 480px;
    background-color: #662B65;
}
.window-addForm-main{
    bottom: 0;
    max-height: 400px;
    border-radius: 20px;
    padding: 2rem 1.5rem 1.5rem;
    background-color: #22252d;

}
.window-addForm-main__column{
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7rem;
}
.window-addForm-main__column--column{
    flex-direction: row;
}
.window-addForm-main__column label{
    margin-bottom: 0.5rem;
}
.window-addForm-main__column input,
.window-addForm-main__column textarea{
    padding: 0.3rem;
    background-color: rgba(255, 255, 255, 0);
    color: #FFF;
    border-bottom:1px solid #662B65;
}
.window-addForm-main__column textarea{
    resize: none;
    height: 90px;
}
.window-addForm-column-title,
.window-addForm-main__column label {
    font-size: 0.9rem;
    font-weight: bold;
}

.window-addForm-main__column input[type=radio]{
    display: none;
}
.window-addForm-buttons-wrapper{
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
}
.addForm-button{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    height: 30px;
    border-radius: 100px;
    color:#FFF;
}
.addForm-button--active{
    transition: 0.5s ease width;
    border-radius: 100px;
    width: 90px;
    border:2px solid rgb(255, 255, 255);
}
.window-addForm-footer{
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 100%;
    height: 70px;
    background-color: #2C2F36;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

}
.addForm-input-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.validation-alert{
    font-size: 0.7rem;
}
</style>