<template>
  <li class='item'>
    <div v-if="currentlyEditing" class='edit-container'>
      <input class='edit' ref='factorinput' v-focus :value='level_name' @blur='updateFactorName()'>
    </div>
    <div v-else class='view'>
      <label v-on:dblclick='currentlyEditing = true;'>{{level_name}}</label>
      <button v-on:click="$emit('remove-factor')" class='destroy'></button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'levels',
  props: {
    level_name: {
      type: String,
      default: '',
      required: true
    },
    index: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: () => ({currentlyEditing: false}),
  methods: {
    updateFactorName () {
      console.log(`Updating factor ${this.level_name} to ${this.$refs.factorinput.value}`)
      this.$store.commit('updateFactorName', {parentidx: this.$parent.index, factoridx: this.index, name: this.$refs.factorinput.value})
      this.currentlyEditing = false
    }
  }
}
</script>

<style scoped>
  button.destroy, button.destroy:hover, button.destroy:active, button.destroy:focus {
    border: none;
    background: none;
    margin: 0;
  }

  .view {
    padding: 0 40px;
  }

  .view .destroy {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-size: 22px;
    color: rgb(180,0,0);
    opacity: 0.3;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .view .destroy:hover {
    opacity: 1;
  }

  .view .destroy:after {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    content: '\274C';
    line-height: 1;
  }

  .view:hover .destroy {
    display: block;
  }
</style>
