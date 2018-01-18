<template>
  <div data-closable v-bind:class="{callout: true, active: true, success: type === 'success', alert: type === 'error', warning: type === 'warning'}">
    {{message}}
    <button v-on:click="$emit('remove')" class="close-button" aria-label="Dismiss alert" type="button" data-close>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'vue-alert',
  props: {
    message: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: 'warning',
      required: true
    }
  }
}
</script>

<style scoped>

</style>
