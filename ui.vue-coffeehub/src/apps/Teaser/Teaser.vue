<template>
  <div class="cmp-v-teaser">
    <div
      class="cmp-v-teaser__background"
      :style="{ 'background-image': `url('${img}')` }"
    >
      <div class="cmp-v-teaser__mask" :style="{ '--mask-opacity': opacity }"></div>
      <div class="cmp-v-teaser__body">
        <h3 class="cmp-v-teaser__title" v-html="title"></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-teaser",
  props: {
    img: {
      type: String,
      requried: true
    },
    title: {
      type: String,
      requried: true
    },
    opacity: {
      type: Number,
      default: 0.65
    }
  }
};
</script>

<style lang="scss">
.cmp-v-teaser {
  color: white;
  min-height: 100px;
  &__background {
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  &__mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0;
    opacity: var(--mask-opacity);
  }
  &__body {
    z-index: 1;
  }
}
</style>
