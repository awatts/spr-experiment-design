<template>
  <li class="item">
    <div v-if="currentlyEditing" class='edit-container'>
      <input class='edit' ref='nameinput' v-focus v-bind:value='name' v-on:blur='updateManipulationName()'>
    </div>
    <div v-else class='view'>
      <label v-on:dblclick='currentlyEditing = true'>{{name}}</label>
      <button v-on:click="$emit('remove-manipulation')" class='destroy'></button>
    </div>
    <div class="levels">
      <h5>Factor levels for manipulation <i>{{name}}</i></h5>
      <p>(these are the condition names that will be used to auto-generate a stimulus
        file; these same names will also be used in the result report we will auto-generate
        for you)
      </p>
    </div>
    <header>
      <input class='new-factor' v-on:change='createFactor($event)' v-bind:placeholder='addLevelMessage(name)'>
    </header>
    <hr/>
    <section class='main'>
      <ul class='factor-list'>
        <levels v-for="(level, idx) in levels"
                v-bind:level_name="level"
                v-bind:key="level"
                v-bind:index="idx"
                v-on:remove-factor="removeFactor(idx)">
        </levels>
      </ul>
    </section>
  </li>
</template>

<script>
import Levels from '@/components/Levels'

export default {
  name: 'manipulations',
  components: {
    Levels
  },
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    levels: {
      type: Array,
      default: () => [],
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
    addLevelMessage: (manipname) => `Add a level to ${manipname}`,
    updateManipulationName () {
      console.log(`Updating manipulation ${this.name} to ${this.$refs.nameinput.value}`)
      this.$store.commit('updateManipulationName', {name: this.$refs.nameinput.value, index: this.index})
      this.currentlyEditing = false
    },
    createFactor (e) {
      console.log(`Adding factor ${e.target.value} to ${this.name} on parent index ${this.index}`)
      this.$store.commit('addFactorToManipulation', {index: this.index, name: e.target.value})
      event.target.value = ''
    },
    removeFactor (factoridx) {
      console.log(`Removing factor @ index ${factoridx} on parent index ${this.index}`)
      this.$store.commit('removeFactorFromManipulation', {factoridx: factoridx, parentidx: this.index})
    }
  }
}
</script>

<style scoped>
  .new-factor,
  .edit {
    margin: 0;
    width: 66%;
    font-size: 24px;
    font-family: inherit;
    outline: none;
    color: inherit;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .new-factor {
    padding: 16px 16px 16px 60px;
    border: 1px dotted #ddd;
  }

  .edit {
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
  }

  .view {
    padding: 0 40px;
  }

  .levels {
    margin-left: 3rem;
  }

  .levels p {
    font-size: small;
  }

  /* These come from Levels */

  button.destroy, button.destroy:hover, button.destroy:active, button.destroy:focus {
    border: none;
    background: none;
    margin: 0;
  }

  .factor-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    position: relative;
    /*font-size: 24px; */
    border-bottom: 1px dotted #ccc;
    margin: 0;
  }

  .item .destroy {
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

  .item .destroy:hover {
    opacity: 1;
  }

  .item .destroy:after {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    content: '\274C';
    line-height: 1;
  }

  .item:hover .destroy {
    display: block;
  }

  .item:last-child {
    border-bottom: none;
  }

  .item.edit-container {
    border-bottom: none;
    padding: 0;
  }

  .item.edit-container .edit {
    display: block;
    width: 100%;
    padding: 13px 17px 12px 61px;
    margin: 0;
  }

  .item.edit-container .view {
    display: none;
  }

  .item label {
    word-break: break-all;
    padding: 15px;
    margin-left: 5px;
    display: block;
    line-height: 1.2;
    -webkit-transition: color 0.4s;
    -moz-transition: color 0.4s;
    -ms-transition: color 0.4s;
    -o-transition: color 0.4s;
    transition: color 0.4s;
  }
</style>
