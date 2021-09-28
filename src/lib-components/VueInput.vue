<template>
  <div class="info-row">
    <div v-if="checkbox" :class="'key' + ' w' + (labelWidth ? labelWidth : '80')">
      <div class="check-action">
        <input v-model="checkbox_value" type="checkbox" class="check" />
        <span class="name">{{ label }}</span>
        <span class="required" v-if="required">*</span>
      </div>
    </div>
    <div :class="'key' + ' w' + (labelWidth ? labelWidth : '80')" v-else-if="radio">
      <div class="check-action">
        <input type="radio" class="check" />
        <span class="name">{{ label }}</span>
        <span class="required" v-if="required">*</span>
      </div>
    </div>
    <div :class="'key' + ' w' + (labelWidth ? labelWidth : '80')" v-else>
      <span class="name">{{ label }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="value">
        <input
          :disabled="disableInput"
          v-model="current_value"
          type="text"
          class="form-control"
          :class="highlight ? 'highlight' : ''"
          v-on:keyup.enter="$emit('enter', $event.target.value)"
        />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    checkbox_value: false,
  }),
  props: {
    label: String,
    checkbox: Boolean,
    radio: Boolean,
    value: [String, Number],
    labelWidth: String,
    required: Boolean,
    disable: Boolean,
    highlight: Boolean
  },
  computed: {
    current_value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    disableInput() {
      if ((!this.checkbox_value && this.checkbox) || this.disable === true) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.key {
  white-space: nowrap;
}
.required {
  color: red;
}
</style>
