<template>
    <v-layout row>
        <v-flex xs12 sm12>
            <v-card>
                <v-card-title>
                   Filter Options
                    <v-spacer></v-spacer>
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
                    item-key="name"
                    :search="search"
                    loading-text="Loading... Please wait"
                    @item-expanded="loadDetails">
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length" ripple>
                            <div class="row">
                                <div class="col-auto">
                                    <img :src="item.details.image_url" style="height:120px" class="mx-4" />
                                </div>
                                <v-icon>mdi-dots-vertical</v-icon>
                                <v-divider vertical inset></v-divider>
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
        </v-flex>
    </v-layout>
</template>

<script>
import client from '../http'
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
        { text: 'IBU', value: 'ibu' }
      ]
    }
  },
  mounted () {
    client.get('https://api.punkapi.com/v2/beers?page=1&per_page=10')
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
    loadDetails ({ item }) {
      client.get('https://api.punkapi.com/v2/beers/' + item.id)
        .then(response => {
          item.details = response.data[0]
        })
    }
  }
}
</script>
