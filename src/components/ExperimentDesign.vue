<template>
  <div>
    <div class="grid-x">
      <div class="messages large-6 cell end" id="errorlist">
        <vue-alert v-for="(alert, index) in alerts"
                   v-bind:key="index"
                   v-bind:message="alert.message"
                   v-bind:type="alert.type"
                   v-on:remove="removeAlert(index)">
        </vue-alert>
      </div>
    </div>
    <section>
      <label for="listcount">Experiment Name</label>
      <input class='new-factor' v-on:keydown='inputKeypress' id="experimentName" placeholder='Experiment name' v-model="experimentName" autofocus>
    </section>
    <section>
      <label for="participants">Number of participants</label>
      <input type="number" min="0" class='new-factor' :value="participants" @input="setParticipants" @keydown='inputKeypress' id="participants" placeholder='Number of participants'  autofocus>
    </section>
    <section>
      <label for="listcount">Number of critical items (Usually the same as number of critical items per list)</label>
      <input type="number" min="0" class='new-factor' :value="trialCount" @input="setTrialCount" @keydown='inputKeypress' v-on:blur='checkCounts' id="listcount" placeholder='Number of list items' autofocus>
    </section>
    <section>
      <label for="fillercount">Number of filler items (Usually the same as number of filler items per list)</label>
      <input type="number" min="0" class='new-factor' :value="fillerCount" @input="setFillerCount" @keydown='inputKeypress' v-on:blur='checkCounts' id="fillercount" placeholder='Number of filler items'  autofocus>
    </section>
    <hr/>
    <h4>Manipulations</h4>
    <p>Hover over any manipulation or level to to delete it with the <span style="color:red;font-size: 22px;">&#xd7;</span>.</p>
    <p>You can double click any manipulation or level text to edit its name.</p>
    <header>
      <input class='new-factor' v-on:keydown='inputKeypress' v-on:change='createManipulation($event)' placeholder='Add a manipulation to the design'>
    </header>
    <section class='main'>
      <ul class='factor-list'>
        <manipulations v-for="(manip, index) in manipulations"
                       v-bind:key="manip.name"
                       v-bind:name="manip.name"
                       v-bind:levels="manip.items"
                       v-bind:index="index"
                       v-on:remove-manipulation="removeManipulation(index)">
        </manipulations>
      </ul>
    </section>
    <levels-footer></levels-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueAlert from '@/components/VueAlert'
import Manipulations from '@/components/Manipulations'
import LevelsFooter from '@/components/LevelsFooter'

export default {
  name: 'ExperimentDesign',
  components: {
    VueAlert,
    Manipulations,
    LevelsFooter
  },
  computed: {
    ...mapState(['experimentName', 'manipulations', 'trialCount', 'fillerCount', 'participants', 'alerts'])
  },
  methods: {
    inputKeypress: function () {
    },
    setParticipants (e) {
      this.$store.commit('setParticipants', e.target.value)
    },
    setTrialCount (e) {
      this.$store.commit('setTrialCount', e.target.value)
    },
    setFillerCount (e) {
      this.$store.commit('setFillerCount', e.target.value)
    },
    createManipulation (e) {
      console.log(`Creating a new manipulation: ${e.target.value}`)
      this.$store.commit('addManipulation', e.target.value)
      event.target.value = ''
    },
    removeManipulation (index) {
      console.log(`Removing manipulation at index: ${index}`)
      this.$store.commit('removeManipulation', index)
    },
    removeAlert (index) {
      this.$store.commit('removeAlert', index)
    },
    checkCounts: function () {
      console.log('Checking counts')
      // FIXME: should this be called by a watch method on the vars with a debounce instead of on-blur?
      if (this.trialCount > this.fillerCount) {
        this.$store.commit('addAlert', {
          'message':
            `It seems like you have more items than fillers. This is not recommended, since it can make it more likely that
           participants will implicitly or explicitly infer the purpose of your experiment. Consider adding more fillers.`,
          'type': 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
  header {
    padding: 0;
    margin: 0;
  }

  h4 {
    position: relative;
    right: 3rem;
  }

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

  .factor-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
