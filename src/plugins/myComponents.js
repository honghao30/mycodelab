import Title from "@/components/element/PageTitle.vue"
import Button from "@/components/element/ButtonCmp.vue"
import ModalView from "@/components/modal/ModalView.vue"
import ToolTip from "@/components/modal/Tooltip.vue"
import MySelect from "@/components/form/CustomSelect.vue"
import MyInput from "@/components/form/input.vue"
import InputEl from "@/components/form/inputEl.vue"
import MyTable from "@/components/element/tableCmp.vue"

export default {
  install(app) {
    app.component('Title', Title)
    app.component('Button', Button)    
    app.component('ModalView', ModalView)  
    app.component('ToolTip', ToolTip)  
    app.component('MySelect', MySelect) 
    app.component('MyInput', MyInput) 
    app.component('InputEl', InputEl) 
    app.component('MyTable', MyTable) 
  }
}