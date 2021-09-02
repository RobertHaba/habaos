<template>
  <div v-if="false">
    
  </div>
</template>
<script>
export default {
  methods: {
    async bookmarkURLValidation(emitProps) {
      let siteUrlInput = emitProps[0]
      let expressionURL =
        // eslint-disable-next-line no-useless-escape
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      let regexURL = new RegExp(expressionURL);
      let expressionHTTP = /^(http|https):/;
      let regexHTTP = new RegExp(expressionHTTP);
      let validationTest = false
      if (!siteUrlInput.match(regexURL) || siteUrlInput === "") {
        validationTest = false
      } else {
        let fullSiteUrl;
        fullSiteUrl = "http://" + siteUrlInput;
        siteUrlInput = siteUrlInput.match(regexHTTP)
          ? siteUrlInput
          : fullSiteUrl;
          validationTest = true
      }
      this.emitter.emit(emitProps[1], [await validationTest, await siteUrlInput])
    },
  },
  mounted() {
    this.emitter.on("bookmarkURLValidation", (value) => {
      this.bookmarkURLValidation(value);
    });
  },
};
</script>
