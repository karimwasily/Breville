<template>
  <div class="cmp-v-blog-listing">
    <BlogNav
      v-if="showCategoryNav"
      @clicked="setFilter"
      :categories="categories"
      :selectedcategory="filter"
    />
    <div class="cmp-v-blog-listing__content">
      <!-- // todo: get article ID to use instead of index -->
      <!-- flip -->
      <div v-for="(article, idx) in layoutArticles[0]" :key="idx">
        <div
          v-if="idx % 2 === 0"
          class="cmp-v-blog-listing--article-one-row cmp-v-blog-listing--article-one-row-flip"
        >
          <BlogArticle :article="article" :id="idx" />
        </div>
        <!-- standard -->

        <div v-else class="cmp-v-blog-listing--article-one-row">
          <BlogArticle :article="article" :id="idx"/>
        </div>
      </div>
      <!-- two -->
      <div class="cmp-v-blog-listing--article-two-row">
        <BlogArticle
          v-for="(article, idx) in layoutArticles[1]"
          :key="idx"
          :article="article"
          :id="idx"
        />
      </div>
      <!-- three -->
      <div class="cmp-v-blog-listing--article-three-row">
        <BlogArticle
          v-for="(article, idx) in layoutArticles[2]"
          :key="idx"
          :article="article"
          :id="idx"
        />
      </div>
    </div>
    <BlogLoadMore
      v-if="loadMoreButton && !enableInfiniteScroll && !hideButton"
      @clicked="loadMoreArticles"
      :loadMoreButton="loadMoreButton"
      :viewMoreHref="viewMoreHref"
    />
    <infinite-loading
      v-if="loadMore"
      :identifier="infiniteId"
      @infinite="infiniteHandler"
    >
    </infinite-loading>
  </div>
</template>

<script>
import BlogArticle from './components/BlogArticle';
import BlogNav from './components/BlogNav';
import BlogLoadMore from './components/BlogLoadMore';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'v-blog-listing',
  components: { BlogArticle, BlogNav, BlogLoadMore, InfiniteLoading },
  props: {
    categories: {
      type: Array,
      required: false,
    },
    // All articles (provided by back-end)
    articles: {
      type: Array,
      required: false,
    },
    // Should the Category Navigation be shown
    showCategoryNav: {
      type: Boolean,
      default: true,
    },
    // The text of the button to show at the bottom of the page to either load more items or link to a page
    loadMoreButton: {
      type: String,
      required: false,
    },
    // If set, the "loadMoreButton" link to another page instead of loading more article (used on homepage)
    viewMoreHref: {
      type: String,
      required: false,
    },
    // No of rows of "full row" articles to display
    noFullRows: {
      type: Number,
      default: 2,
    },
    // No of rows of "1/2" articles to display
    noHalfRows: {
      type: Number,
      default: 1,
    },
    // No of rows of "3 per row" articles to display
    noThirdsRows: {
      type: Number,
      default: 1,
    },
    // Number of element to load on the next page (must be a multiple of 3)!
    loadMoreNoOfItems: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      filter: "",
      shownArticles: [],
      resultOffset: 0,
      page: 1,
      infiniteId: 0,
      enableInfiniteScroll: false,
      loadMore: true,
      hideButton: false,
      nextResults: [],
    };
  },
  methods: {
    setFilter(value) {
      this.filter = value === "All" ? "" : value;
      if (this.filter && this.filter != window.location.hash.substr(1)) {
        window.location.hash = this.filter;
      } else if (window.location.hash.substr(1)) {
        window.location.hash = "";
      }
      this.reset();
    },

    onHashChange() {
     let findFilterItem = this.categories.filter(function(item) { return item.value === window.location.hash.substr(1); });
     if(findFilterItem.length){
        this.filter = window.location.hash.substr(1);
      }
      else{
        this.filter = "";
      }
      this.reset();
    },

    // Reset the view
    reset() {
      this.shownArticles = [];
      this.page = 1;
      this.resultOffset = 0;
      this.infiniteId += 1;
      this.enableInfiniteScroll = false;
      this.loadMore = true;
      this.hideButton = false;
      this.nextResults = [];
    },

    sortArticles: function (array, key) {
      // return the sorted array by publication rank in descending order
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    },

    filterByTag(article) {
      let tagList = new Array();
      if(article.category) {
        article.category.forEach( pageTag => {
          tagList.push(pageTag.value);
        });
      }
      return tagList.includes(this.filter);
    },

    getAllArticlesToBeShown() {
      if (this.filter != "" && window.location.hash.substr(1) != this.filter) {
        window.location.hash = this.filter;
      } else if (this.filter === "" && window.location.hash.substr(1) != "") {
        window.location.hash = "";
      }

      if (!this.filter) {
        return this.articles;
      }
      let categoryList = this.articles.filter(this.filterByTag);
      let featuredArticlesList = categoryList.filter(
        (article) => article.featuredArticle == "true"
      );
      let nonFeaturedArticles = categoryList.filter(
        (article) => !article.featuredArticle
      );
      let filteredArticlesList = [];
      if (featuredArticlesList.length) {
        featuredArticlesList = this.sortArticles(
          featuredArticlesList,
          "publicationRank"
        );
        let filterdList = featuredArticlesList;
        if (nonFeaturedArticles.length) {
          filterdList = featuredArticlesList.concat(nonFeaturedArticles);
        }
        filteredArticlesList = filterdList;
      } else {
        filteredArticlesList = nonFeaturedArticles;
      }
      return filteredArticlesList;
    },

    // Sets the value of sliced array that we show on the page
    getNextPageOfArticles() {
      let getNumberOfArticlesToShowOnFirstPage = () => {
        return (
          this.noFullRows * 1 + this.noHalfRows * 2 + this.noThirdsRows * 3
        );
      };
      let articles = this.getAllArticlesToBeShown();
      let limit =
        this.page == 1
          ? getNumberOfArticlesToShowOnFirstPage()
          : this.loadMoreNoOfItems;
      let ret = articles.slice(this.resultOffset, this.resultOffset + limit);
      this.resultOffset += ret.length;
      this.nextResults = articles.slice(this.resultOffset, this.resultOffset + limit);
      return ret;
    },

    infiniteHandler($state) {
        let results = this.getNextPageOfArticles();
        if(!this.nextResults.length){
          this.hideButton = true;
        }
        if (results.length) {
          this.page = this.page + 1;
          this.shownArticles = [...this.shownArticles, ...results];
          $state.loaded();
          this.loadMore = this.page == 2 ? false : true;
        } else {
          $state.complete();
        }
    },

    loadMoreArticles() {
      this.enableInfiniteScroll = true;
      this.loadMore = true;
    },
  },
  computed: {
    layoutArticles: function () {
      const layoutArticles = [];
      // full row
      const full = this.shownArticles.slice(0, this.noFullRows);
      layoutArticles.push(full);
      //  two row
      const half = this.shownArticles.slice(
        this.noFullRows,
        this.noFullRows + this.noHalfRows * 2
      );
      layoutArticles.push(half);
      // three
      const offset = this.noFullRows + this.noHalfRows * 2;
      const third = this.shownArticles.slice(offset, this.shownArticles.length);
      layoutArticles.push(third);
      return layoutArticles;
    },
    showButton: function () {
      return this.loadMoreButton;
    },
  },
  mounted() {
    this.filter = window.location.hash.substr(1);
    window.addEventListener("hashchange", this.onHashChange);
  },
  destroyed() {
    window.removeEventListener("hashchange", this.onHashChange);
  },
};
</script>

<style lang="scss">
.cmp-v-blog-listing {
  // Base Styling and Layout goes here
}
</style>
