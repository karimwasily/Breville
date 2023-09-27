<template>
  <button @click='handleClick' class="button--default-theme">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: "v-button",
  props: {
    onClick: {
      type: Function,
      required: false
    }
  },
  methods: {
    handleClick: () => window.alert('clicked')
  }
};
</script>

<style lang="scss">
button.button--default-theme {
  background-color: black;
  color: white;
  min-width: 80px;
}
</style>
