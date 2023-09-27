<template>
  <div class="cmp-v-blog-listing__nav">
    <ul
      :class="{
        'cmp-v-blog-listing__nav-group': true,
        'cmp-v-blog-listing__nav-group-default': visible,
        'cmp-v-blog-listing__nav-group-firstelement': selectedcategory ? false: true,
      }"
    >
      <li
       v-on:keyup.tab = "outline = true"
       v-show="visible"
         :class="{
          'cmp-v-blog-listing__nav-item': true,
          'cmp-v-blog-listing__nav-item--all-categories': true,
          'cmp-v-blog-listing-outline': outline,
        }"
        v-on:click="show" tabIndex="0" role="link" v-on:keypress.enter = "show"
      >
        {{ selected ? selected : categories[0].value }}
      </li>
      <li
       v-on:keyup.tab = "outline = true"
        tabIndex="0" role="link"
        v-for="category in categories"
        :key="category.tag"
        v-on:click="filter(category.value)"
        v-on:keypress.enter = "filter(category.value)"
        :class="{
          'cmp-v-blog-listing__nav-item-focus': category.value == selectedcategory,
          'cmp-v-blog-listing-outline': outline,
        }"
      >
        {{ category.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-blog-nav',
  props: {
    categories: {
      type: Array,
      required: false,
    },
    selectedcategory: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selected: undefined,
      visible: true,
      outline: false,
    };
  },
  methods: {
    filter: function (value) {
      this.selected = value;
      value == "All" ? (this.firstValue = true) : (this.firstValue = false);
      this.$emit("clicked", this.selected);
      this.outline = false;
      this.visible = true;
    },
    show: function () {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
  },
};
</script>
