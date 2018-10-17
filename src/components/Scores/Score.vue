<template>
  <div class="item">
    <v-ons-page item>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-back-button>Back</v-ons-back-button>
        </div>
        <div class="center">Item {{item.itemId}}</div>
      </v-ons-toolbar>
      <template v-if="loaded">
        Chart name: {{item.stepChart.playMode}}
      </template>
      <template v-else>
        <ons-progress-circular indeterminate></ons-progress-circular>
      </template>
    </v-ons-page>
  </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'Score',
  data () {
      let itemId = this.$props.itemId

      return {
          item: {
              itemId: itemId
          },
          loaded: false
      }
  },
  mounted () {

  },
  props: {
      itemId: String
  },
  onsNavigatorOptions: {
      animation: 'fade'
  }
}
</script>
