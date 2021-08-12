<template>
    <section class="account settings-container app-container">

    </section>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

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
  color: #445b77;
  border-radius: 20px;
}
.container--dark{
    background-color: #373b49;
}
.app-container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
    border-radius: 20px;
}
.music-container{
    position: relative;
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 650px;
    padding: 3rem 1.5rem;
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.14);
    transition: 0.5s ease all;
}
.music-container--dark{
    background-color: #22252D;
    color: #FFF;
}
</style>