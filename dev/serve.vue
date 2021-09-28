<script>
import Vue from "vue";
import VueCard from "../src/lib-components/VueCard.vue";
import VueInput from "../src/lib-components/VueInput.vue";
import "./assets/css/style.css";
// Uncomment import and local "components" registration if library is not registered globally.
// import { ErpUiElementSample } from '@/entry.esm';

export default Vue.extend({
  components: { VueCard, VueInput },
  name: "ServeDev",
  data() {
    return {
      config: [
        {
          label: "Số máy/Acc",
          filterAble: true,
          key: "ma_tb",
        },
        {
          label: "Tên thuê bao",
          filterAble: true,
          key: "ten_tb",
        },
      ],
      options: [
        {
          id: '0323',
          ma_tb: 'kypham',
          ten_tb: 'kypham'
        },
        {
          id: '23232',
          ma_tb: 'kypham 2',
          ten_tb: 'kypham 2'
        },
        {
          id: '332',
          ma_tb: 'kypham 3',
          ten_tb: 'kypham 3'
        }
      ]
    };
  },
});
</script>

<template>
  <div id="app">
    <div class="page-content">
      <vue-card label="test">
        <vue-input label="test">
        </vue-input>
      </vue-card>
    </div>
  </div>
</template>
