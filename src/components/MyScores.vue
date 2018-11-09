<template>
  <div class="hello">
      <v-ons-page items>
        <v-ons-toolbar>
          <div class="center">My scores</div>
        </v-ons-toolbar>
        <v-ons-list>
          <v-ons-list-header>Scores</v-ons-list-header>
          <v-ons-list-item v-for="item in items" v-bind:data="item" v-bind:key="item._id" @click="push(item._id)">
            <v-ons-col>{{item.playedAt | moment("Y-m-d H:M:s")}}</v-ons-col>
            <v-ons-col>{{item.stepChart.song.artist}} :: {{item.stepChart.song.title}}</v-ons-col>
            <v-ons-col>{{Math.round(item.scoreValue * 10000)/100}}%</v-ons-col>
          </v-ons-list-item>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </v-ons-list>
      </v-ons-page>
  </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import Score from './Scores/Score.vue'
import {globalApp} from '../main'

export default {
  name: 'MyScores',
  data () {
      return {
          items: [],
          pageStack: [this]
      }
  },
  props: {
    msg: String
  },
  mounted () {
    if(globalApp.loginData.playerId !== null) {
      axios
        .get('https://api.padmiss.com/api/scores?populate=player&populate=stepChart&sort=-playedAt&limit=30&player=' + globalApp.loginData.playerId)
        .then(response => (this.items = response.data))
    }
  },
  methods: {
      infiniteHandler($state) {
        if(globalApp.loginData.playerId !== null) {
          axios
            .get('https://api.padmiss.com/api/scores?populate=player&populate=arcadeCab&populate=stepChart&sort=-playedAt&limit=' + (this.items.length + 5)+'&player=' + globalApp.loginData.playerId)
            .then((response) => {
              this.items = response.data;
              $state.loaded();
            })
        }
        console.log(globalApp)
      },
      push(id) {
          console.log("sending");
          this.$emit('push-page', {extends: Score, onsNavigatorProps: {itemId: id}});
      }
  },
  components: {
      InfiniteLoading
  }
}
</script>
