<template>
    <ul>
      <li @click="$emit('change', item[valueField])" v-for="(item, key) in options" v-bind:key="key" :class="item.children ? 'haschild open' : ''">
        <a> {{item[labelField]}} </a>
        <vue-tree-item :options="item.children" :labelField="labelField" :valueField="valueField"  />
      </li>
    </ul>
</template>
<script>
export default {
  props: {
    options: Array,
    labelField: String,
    valueField: String
  },
  name: 'vue-tree-item',
  methods: {
  }
}
</script>