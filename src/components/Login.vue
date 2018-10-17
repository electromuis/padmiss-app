<template>
  <div class="hello">
    <v-ons-navigator
            :page-stack="pageStack"
            :options="{animation: 'slide'}"
            @push="pageStack.push($event)"
    >
      <v-ons-page>
       Hello, login plz
     </v-ons-page>
    </v-ons-navigator>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
      return {
          items: [],
          pageStack: [this]
      }
  },
  components: {

  }
}
</script>
