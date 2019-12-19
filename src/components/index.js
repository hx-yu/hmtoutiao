import layoutHeader from './home/layout_header'
import layoutAside from './home/layout_aside'
export default {
  install (Vue) {
    Vue.component('layoutheader', layoutHeader)
    Vue.component('layoutaside', layoutAside)
  }
}
