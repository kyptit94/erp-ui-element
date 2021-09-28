<template>
  <div>
    <div class="table-content">
      <table class="table-result table-gachle">
        <thead class="center">
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="multiple === true">
              <div class="check-action">
                  <input
                  v-bind:key="'page' + page"
                  @click="checkAllItem($event)"
                  type="checkbox"
                  class="check">
                  <span class="name"></span>
              </div>
            </th>
            <th v-bind:key="'col1' + i" v-for="(item, i) in config">{{item.label}}</th>
          </tr>
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="multiple === true">
              <div class="check-action">
                  <input @change="filterCheckbox($event)" type="checkbox" class="check">
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
          <tr v-bind:key="option[unique] ? (option[unique] + page) : ('col4' + j + page)" v-for="(option, j) in options_perpage" :class="compare(option, choose) ? 'highlight' : ''">
            <td @click="chooseItem(option)" class="w20 center">
              <span v-if="compare(option, choose)" class="fa fa-play text-main"></span>
            </td>
            <td class="w30 center" v-if="multiple === true">
              <div class="check-action">
                  <input :checked="multiple_value.includes(option)" type="checkbox" @change="pushItem(option)" class="check">
                  <span class="name"></span>
              </div>
            </td>
            <td :class="item.align ? ('text-' + item.align) : ''" :style="item.width ? ('width: ' + item.width) : ''" @click="chooseItem(option)" v-bind:key="'col3' + i" v-for="(item, i) in config">
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
      <vue-paginate v-model="page" :per_page="numPerPage" :total="temp_options.length"></vue-paginate>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    temp_options: [],
    page: 1,
    multiple_value: [],
    choose: {}
  }),
  props: {
    value: [Object],
    options: Array,
    config: Array,
    unique: String,
    loading: Boolean,
    multiple: Boolean,
    perpage: [Number, String]
  },
  computed: {
    numPerPage() {
      return this.perpage ? Number(this.perpage) : 10
    },
    options_perpage() {
      return this.temp_options.slice((this.page - 1) * this.numPerPage, this.page * this.numPerPage)
    },
    current_value() {
      let data      = this.choose
      data.listItem = this.multiple_value 
      return data
    }
  },
  mounted() {
    this.chooseItem(this.value)
    this.multiple_value = this.value.listItem ? this.value.listItem : []
  },
  watch: {
    options: { 
      handler() {
        this.temp_options = this.options
        this.multiple_value = []
      },
      deep: true
    },
    temp_options: { 
      handler() {
        this.page = 1
      },
      deep: true
    },
    value: {
      handler() {
        this.chooseItem(this.value)
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
    checkAllItem(event) {
      if(event.target.checked === true) {
        this.options_perpage.forEach(item => {
          this.multiple_value.push(item)
        })
      } else {
        this.multiple_value = []
      }
      this.$emit('input', this.current_value)
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
    pushItem(option) {
      if(this.multiple === true) {
        this.multiple_value.push(option)
        this.$emit('input', this.current_value)
      }
    },
    chooseItem(option) {
      for(let i in option) {
        if(i !== 'listItem') {
          this.$set(this.choose, i, option[i])
        }
      }
      this.$emit('input', this.current_value)
    },
    compare(a,b) {
      for(let i in a) {
        if(i !== 'listItem') {
          if(a[i] != b[i]) {
            return false
          } 
        }
      }
      return true
    }
  }
}
</script>