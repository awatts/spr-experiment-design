<template>
  <section class="footer">
      <span class='level-count'>You have a {{levelCounts}} level design with {{trialCount}} items and {{fillerCount}}
      fillers per list. You have requested {{participants}} participants.</span>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'levels-footer',
  computed: {
    ...mapState(['trialCount', 'fillerCount', 'participants']),
    levelCounts () { return this.$store.state.manipulations.map((e) => e.items.length).join(' x ') }
  }
}
</script>

<style scoped>
  .footer {
    position: relative;
    height: 1.3em;
    color: #777;
    z-index: 1;
    text-align: center;
    background: #f9f9f9;
    padding: 0.5em;
    border-top: 1px dotted #adadad;
  }

  .level-count {
    float: left;
    text-align: left;
  }
</style>
