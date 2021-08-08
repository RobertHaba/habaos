<template>
  <router-view @authenticated="setAuthenticated"></router-view>
</template>
<script>
export default {
  name:'home',
  data(){
    return{
      authenticated:false
    }
  },
  mounted() {
    console.log(sessionStorage.getItem('authenticated'));
    if(sessionStorage.getItem('authenticated') != 'true'){
      if(!this.authenticated || sessionStorage.getItem('authenticated') != 'true') {
        this.$router.replace({ name: "login" });
      }
    }
    
  },
  methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
  }
}
</script>