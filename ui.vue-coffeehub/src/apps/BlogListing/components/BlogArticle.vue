<template>
<div class="cmp-v-blog-listing__article">
  <div class="cmp-article">
    <div class="cmp-article__image">
      <div @click="navigateToLink" class="cmp-image">
        <img :src="article.image" 
        class="cmp-image__image" 
        :alt="article.imageAltText" 
        :title="article.imageTitle"
        >
        <meta itemprop="caption" :content="article.imageAltText">
      </div>
    </div>
    <div class="cmp-article__content">
      <div class="cmp-article__category-wrapper" >
        <div class="cmp-article__category" v-for="category in  article.category" :key="category.value">
          {{ category.tag }}
        </div>
      </div>
      <h2 @click="navigateToLink" class="cmp-article__title" v-bind:id="'blog-listing__title-' + id">{{ article.title }}</h2>
      <div class="cmp-article__description">
        <p>{{ article.summary }}</p>
      </div>
      <div class="cmp-article__action-container">
        <a class="cmp-article__action-link" v-bind:id="'blog-listing__link-' + id" v-bind:aria-labelledby="'blog-listing__title-' + id +  ' blog-listing__link-' + id" :href="article.link">{{ article.readMore }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'v-blog-article',
  props: {
    article: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
    };
  },
  methods:{
    navigateToLink(){
      window.location.href = this.article.link;
    }
   }
};
</script>

<style lang="scss">
.cmp-v-blog-listing__article {
}
</style>
