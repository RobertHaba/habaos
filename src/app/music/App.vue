<template>
  <musicHome />
</template>

<script>
import musicHome from './components/musicHome.vue'

export default {
  name: 'App',
  components: {
    musicHome
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
ul,li{
  list-style-type: none;
}
a{
    text-decoration: none;
}
h3{
  font-size: 16px;
}
h4{
  font-size: 12px;
}
button{
  border:unset;
  background:unset;
  cursor: pointer;
}
::-webkit-scrollbar {
 width: 0px;
 height: 7px;
}
::-webkit-scrollbar-thumb {
 background: linear-gradient(154deg, #ffb77e 8%, #ff5ba3 62%);
 border-radius: 15px;
}
::-webkit-scrollbar-track{
 background: #ffffff;
 border-radius: 15px;
 box-shadow: inset 7px 10px 12px #f0f0f0;
}
/*Chrome*/
input[type=range] {
    margin: auto;
    outline: none;
    padding: 0;
    width: 640px;
    height: 2px;
    background-color: #dedede;
    background-image: linear-gradient(to right, #ffb77e, #ff5ba3);
    background-size: 0% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
}


input[type=range]::-webkit-slider-thumb {
    height: 14px;
    width: 14px;
    border: 0;
    background: #ff5ba3;
    border-radius: 10px;
    -webkit-appearance: none;
}
</style>
