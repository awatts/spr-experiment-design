import Vue from 'vue'
import Router from 'vue-router'
import ExperimentDesign from '@/components/ExperimentDesign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ExperimentDesign',
      component: ExperimentDesign
    }
  ]
})
