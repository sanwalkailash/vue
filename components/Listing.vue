<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        show-expand
        single-expand
        item-key="name"
        :search="search"
        @item-expanded="loadDetails">
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <div class="row">
                    <div class="col-auto">
                        <img :src="item.details.image_url" style="height:120px" class="mx-4" />
                    </div>
                    <div class="col">
                        <h6>Foods</h6>
                        <div v-for="(food, index) in item.details.food_pairing" v-bind:key="index">
                            {{ food }}
                        </div>
                    </div>
                </div>
            </td>
        </template>
      </v-data-table>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  middleware: ['isAuthenticated'],
  data () {
    return {
      search: '',
      items: [],
      headers: [
        { text: 'Beer', align: 'left', filterable: false, value: 'name' },
        { text: 'Desc', value: 'tagline' },
        { text: 'ABV', value: 'abv' },
        { text: 'IBU', value: 'ibu' },
      ],
    }
  },
  mounted () {
    axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=10')
        .then(response => {
          this.items = response.data.map((item) => {
              return {
                details: {},
                ...item
              }
          })
     })
  },
  methods: {
    loadDetails({item}) {
        axios.get('https://api.punkapi.com/v2/beers/' + item.id)
            .then(response => {
              item.details = response.data[0]
        })
    }
  }
}
</script>
