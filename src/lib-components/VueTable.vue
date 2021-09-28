<template>
  <div>
    <div class="table-content">
      <table class="table-result table-gachle">
        <thead class="center">
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="multiple === true">
              <div class="check-action">
                  <input @change="filterCheckbox($event)" type="checkbox" class="check">
                  <span class="name"></span>
              </div>
            </th>
            <th v-bind:key="'col1' + i" v-for="(item, i) in config">{{item.label}}</th>
          </tr>
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="multiple === true">
              <div class="check-action">
                  <input type="checkbox" disabled="" class="check">
                  <span class="name"></span>
              </div>
            </th>
            <th :style="item.width ? ('width: ' + item.width) : ''" v-bind:key="'col2' + i" v-for="(item, i) in config">
              <div v-if="item.filterAble" class="input-icon-right">
                <input @input="filterItem($event, item.key)" type="text" class="form-control" />
                <span class="icon nc-icon-outline ui-1_zoom"></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!loading">
          <tr v-bind:key="option[unique] ? (option[unique] + page) : ('col4' + j + page)" v-for="(option, j) in options_perpage" :class="current == option[unique] ? 'highlight' : ''">
            <td @click="chooseItem(option[unique], option)" class="w20 center">
              <span v-if="current == option[unique]" class="fa fa-play text-main"></span>
            </td>
            <td class="w30 center" v-if="multiple === true">
              <div class="check-action">
                  <input :checked="multiple_value ? multiple_value[option[unique]] : false" type="checkbox" @change="pushItem(option, option[unique])" class="check">
                  <span class="name"></span>
              </div>
            </td>
            <td :class="item.align ? ('text-' + item.align) : ''" :style="item.width ? ('width: ' + item.width) : ''" @click="chooseItem(option[unique], option)" v-bind:key="'col3' + i" v-for="(item, i) in config">
              {{option[item.key]}}
            </td>
          </tr>
          </template>
          <template v-else>
          <tr class="text-center">
            <td colspan="75%">
              <b-spinner class="mt-3 mb-3" variant="primary" label="Spinning"></b-spinner>
            </td>
          </tr>
          </template>
        </tbody>
      </table>
      <vue-paginate v-model="page" :per_page="10" :total="temp_options.length"></vue-paginate>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    temp_options: [],
    options_perpage: [],
    page: 1,
    current: 0,
    multiple_value: {},
    current_value: {}
  }),
  props: {
    value: [Object],
    options: Array,
    config: Array,
    unique: String,
    loading: Boolean,
    multiple: Boolean
  },
  created() {
    this.current_value = this.value
  },
  watch: {
    options: { 
      handler() {
        this.temp_options = this.options
        this.multiple_value = {}
      },
      deep: true
    },
    temp_options: { 
      handler() {
        this.page = 1
        this.getItem(this.page)
      },
      deep: true
    },
    page (val) {
      this.getItem(this.page)
    },
    value: {
      handler(val) {
        this.current        = val[this.unique]
        this.current_value  = val
        this.multiple_value = val.listItem ? val.listItem : {}
      },
      deep: true
    }
  },
  methods: {
    filterCheckbox(event) {
      if(event.target.checked === true) {
        this.temp_options = Object.values(this.multiple_value)
      } else {
        this.temp_options = this.options
      }
      this.page = 1
    },
    filterItem (event, key) {
      let text = event.target ? event.target.value : event
      text = text.toLowerCase()
      this.page = 1
      this.temp_options = this.options.filter(option => {
        if (option[key]) {
          return option[key].toLowerCase().includes(text)
        }
      })
      this.getItem(this.page)
    },
    getItem (page) {
      this.options_perpage = this.temp_options.slice((page - 1) * 10, page * 10)
    },
    pushItem(option, index) {
      if(this.multiple === true) {
        if(!this.multiple_value[index])
          this.multiple_value[index] = option
        else
          delete this.multiple_value[index]

        this.current_value.listItem = this.multiple_value
        this.$emit('input', this.current_value)
      }
    },
    chooseItem(index, option) {
      this.current = index
      this.current_value = option
      this.$emit('input', this.current_value)
    }
  }
}
</script>