/* eslint-disable import/prefer-default-export */
import VueCard from './VueCard.vue'
import VueNav from './VueNav.vue'
import VueTable from './VueTable.vue'
import VueTableGroup from './VueTableGroup.vue'
import VueChechbox from './VueCheckbox.vue'
import VueDate from './VueDate.vue'
import VueInput from './VueInput.vue'
import VuePaginate from './VuePaginate.vue'
import VueSelect from './VueSelect.vue'
import VueTextarea from './VueTextarea.vue'
import VueRadio from './VueRadio.vue'
import VueBreadcrumb from './VueBreadcrumb.vue'
import VueTreeItem from './VueTreeItem.vue'
import VueTree from './VueTree.vue'
import Vue from 'vue'

let components = {
    'vue-card': VueCard,
    'vue-nav': VueNav,
    'vue-table': VueTable,
    'vue-checkbox': VueChechbox,
    'vue-date': VueDate,
    'vue-input': VueInput,
    'vue-paginate': VuePaginate,
    'vue-select': VueSelect,
    'vue-textarea': VueTextarea,
    'vue-radio': VueRadio,
    'vue-table-group': VueTableGroup,
    'vue-bread-crumb' : VueBreadcrumb,
    'vue-tree-item' : VueTreeItem,
    'vue-tree' :  VueTree

}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
