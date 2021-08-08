<template>
  <div>
    <WeatherApp />
  </div>
</template>

<script>
import WeatherApp from '@/components/WeatherApp';
export default {
  name: 'App',
  components: {
    WeatherApp
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
</style>
