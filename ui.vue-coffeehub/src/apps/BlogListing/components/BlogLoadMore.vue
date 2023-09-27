<template>
<div :class="{'cmp-v-blog-listing__load-more': true, 'cmp-v-blog-listing__load-more-inspiration': !viewMoreHref}" 
  v-on:click = "checkFunctionality" v-on:keypress.enter ="checkFunctionality" tabIndex="0" role="button"
>
  {{loadMoreButton}}
</div>
</template>

<script>
export default {
  name: 'v-blog-load-more',
  props: {
    loadMoreButton: {
      type: String,
      required: false,
    },
    viewMoreHref: {
      type: String,
      required: false,
    },  
  },  
  data() {
    return {
    };
  },
   methods:{
     checkFunctionality(){
       if(this.viewMoreHref){
         window.location.href = this.viewMoreHref + ".html";
       }else{
         this.$emit('clicked' , this.loadMore);
       }

     }
   }
};
</script>

<style lang="scss">
.cmp-v-blog-listing__load-more {
}
</style>
