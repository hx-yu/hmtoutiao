import layoutHeader from './home/layout_header'
import layoutAside from './home/layout_aside'
import breadCrumb from './common/breadcrumb'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import coverImg from './publish/cover_img.vue'
import previewImg from './publish/preview.vue'
export default {
  install (Vue) {
    Vue.component('layoutheader', layoutHeader)
    Vue.component('layoutaside', layoutAside)
    Vue.component('breadcrumb', breadCrumb)
    Vue.component('quilleditor', quillEditor)
    Vue.component('coverimg', coverImg)
    Vue.component('previewimg', previewImg)
  }
}
