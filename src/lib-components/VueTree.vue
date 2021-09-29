<template>
  <div>
    <div class="input-icon-right">
      <input type="text" class="form-control" />
      <span class="icon nc-icon-outline ui-1_zoom"></span>
    </div>
    <div class="form-control text h-auto">
      <div class="tree-plus tree-icon" style="height: 400px; overflow: auto">
        <vue-tree-item @change="value => $emit('change', value)" :options="options" :labelField="labelField" :valueField="valueField"  />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    labelField: String,
    valueField: String
  }
}
</script>