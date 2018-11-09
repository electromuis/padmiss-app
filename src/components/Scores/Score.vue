<template>
  <div class="item">
    <v-ons-page item>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-back-button>Back</v-ons-back-button>
        </div>
        <div class="center">{{name}}</div>
      </v-ons-toolbar>
      <div class="content">
        <v-ons-list v-if="item">
          <v-ons-list-header>Song</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-col>Name</v-ons-col>
            <v-ons-col>{{item.stepChart.song.title}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Artist</v-ons-col>
            <v-ons-col>{{item.stepChart.song.artist}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Length</v-ons-col>
            <v-ons-col>{{item.stepChart.durationSeconds}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-header>Chart</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-col>Artist</v-ons-col>
            <v-ons-col>{{item.stepChart.stepArtist}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Level</v-ons-col>
            <v-ons-col>{{item.stepChart.difficultyLevel}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Type</v-ons-col>
            <v-ons-col>{{item.stepChart.playMode}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-header>Score</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-col>Score</v-ons-col>
            <v-ons-col>{{Math.round(item.scoreValue * 10000)/100}}%</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Fantastics</v-ons-col>
            <v-ons-col>{{item.scoreBreakdown.fantastics}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Excellents</v-ons-col>
            <v-ons-col>{{item.scoreBreakdown.excellents}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Greats</v-ons-col>
            <v-ons-col>{{item.scoreBreakdown.greats}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Misses</v-ons-col>
            <v-ons-col>{{item.scoreBreakdown.misses + item.scoreBreakdown.decents + item.scoreBreakdown.wayoffs}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-header>Player</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-col>Name</v-ons-col>
            <v-ons-col>{{item.player.nickname}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Level</v-ons-col>
            <v-ons-col>{{item.player.playerLevel}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Cab</v-ons-col>
            <v-ons-col>{{item.arcadeCab.name}}</v-ons-col>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-col>Played at</v-ons-col>
            <v-ons-col>{{item.playedAt | moment("Y-m-d H:M:s")}}</v-ons-col>
          </v-ons-list-item>
        </v-ons-list>
        <ons-progress-circular indeterminate v-show="loading"></ons-progress-circular>
      </div>
    </v-ons-page>
  </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'Score',
  data () {
      return {
          name: 'Loading',
          loading: true,
          item: false
      }
  },
  mounted () {
      let self = this

      axios
          .get('https://api.padmiss.com/api/scores?populate=player&populate=arcadeCab&populate=stepChart&limit=1&_id=' + this.$props.itemId)
          .then((response) => {
              let item = response.data[0]
              self.item = item
              self.name = item.stepChart.song.artist + " :: " + item.stepChart.song.title
              self.loading = false
              console.log("Done loading");
          })
  },
  props: {
      itemId: String
  },
  onsNavigatorOptions: {
      animation: 'fade'
  }
}
</script>
