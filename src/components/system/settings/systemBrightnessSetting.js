export default {
    data(){
        return{
            themes:[
                [
                    ['--bg-theme','linear-gradient(135deg, rgba(98, 44, 102, 0.98), rgba(68, 50, 114, 0.98))'],
                    ['--bg-theme--first','rgba(98, 44, 102, 1)'],
                    ['--bg-theme--second','rgba(68, 50, 114, 1)'],
                    ['--bg-theme--app','#22252D'],
                    ['--bg-theme--app-second','#393939'],
                    ['--bg-theme--app-hover','#505050'],
                    ['--font-main-color','#FFF'],
                    ['--font-second-color','rgba(255, 255, 255, 0.7)'],
                    ['--font-reverse-color','#22252D'],
                    ['--icon-reverse-color','invert(100%) sepia(0%) saturate(3979%) hue-rotate(42deg) brightness(99%) contrast(107%)'],
                    
                ],
                [
                    ['--bg-theme','linear-gradient(135deg, #ffffff, #FFF)'],
                    ['--bg-theme--first','#FFF'],
                    ['--bg-theme--second','#FFF'],
                    ['--bg-theme--app','#FFF'],
                    ['--bg-theme--app-second','#EFEFEF'],
                    ['--bg-theme--app-hover','#E0E0E0'],
                    ['--font-main-color','#22252D'],
                    ['--font-second-color','rgba(0, 0, 0, 0.7)'],
                    ['--font-reverse-color','#FFF'],
                    ['--icon-reverse-color','invert(30%) sepia(0%) saturate(3979%) hue-rotate(42deg) brightness(99%) contrast(107%)'],
                ]
            ]
        }
    },
    methods:{
        changeBrightness(themeID){
            this.themes[themeID].forEach((theme)=>{
                document.documentElement.style.setProperty(theme[0], theme[1]);
            })
        }
    }
}