<template>
  <div class="info-row">
    <template v-if="checkbox">
      <div :class="'key' + ' w' + labelWidth">
        <div class="label-checkbox">
          <span class="name">{{ label }}
          </span>
          <span v-if="required" class="required">*</span>
        </div>
      </div>
      <div class="value w20 padt7">
        <div class="check-action">
          <input v-model="checkbox_value" type="checkbox" class="check" />
          <span class="name"></span>
        </div>
      </div>
    </template>
    <div v-else :class="'key' + ' w' + labelWidth">{{ label }} <span v-if="required" class="required">*</span></div>
    <div class="value">
        <date-picker 
        :format="dateFormat" 
        :value-type="dateFormat" 
        :append-to-body="true"  
        :time-title-format="dateFormat" 
        v-model="time" 
        :disabled="disable"
        :type="typeFormat">
          <template #icon-calendar>
            <span class="icon one-calendar"></span>
          </template>
        </date-picker>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/vi.js';
export default {
  data: () => ({
    checkbox_value: false
  }),
  components: { DatePicker },
  props: {
    label: String,
    value: String,
    checkbox: Boolean,
    labelWidth: String,
    format: String, // default 'DD/MM/YYYY HH:mm:ss'
    type: String, // date|datetime|year|month|time|week : default 'datetime'
    required: Boolean,
    disable: Boolean
  },
  computed: {
    dateFormat() {
      return this.format ? this.format : 'DD/MM/YYYY HH:mm:ss'
    },
    typeFormat() {
      return this.type ? this.type : 'datetime'
    },
    time: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
<style>
  .mx-datepicker {
    width: 100% !important;
  }
  .mx-icon-calendar {
    font-style: normal !important;
  }
  .required {
    color: red;
  }
</style>