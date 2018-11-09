<template>
  <div class="hello">
    <v-ons-navigator
            :page-stack="pageStack"
            :options="{animation: 'slide'}"
            @push="pageStack.push($event)"
    >
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item>
            <v-ons-list-item>
              <v-ons-input class="center" v-model="cardId" placeholder="00000000" type="text"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button @click="save($event)">Save</v-ons-button>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button @click="logout($event)">Logout</v-ons-button>
            </v-ons-list-item>
          </v-ons-list-item>
        </v-ons-list>
     </v-ons-page>
    </v-ons-navigator>
  </div>
</template>

<script>
import axios from 'axios';
import {globalApp} from '../main'

export default {
  name: 'Settings',
  data () {
      return {
        cardId: '',
      }
  },
  methods: {
    save() {
      let self = this
      axios
        .put(
          'https://api.padmiss.com/api/users/' + globalApp.loginData.userId + "/edit", {
            token: globalApp.loginData.token,
            rfidUid: self.cardId,
        })
        .then((response) => {
          console.log(response.data)
        })
    },
    logout (e) {
      globalApp.logout()
    }
  },
  components: {

  }
}
</script>
