import Vue from 'vue'
import 'element-ui/lib/theme-chalk/display.css' // element-ui基于断点的隐藏类
import {
  Backtop,
  Pagination,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Dialog,
  Drawer,
  Form,
  FormItem,
  Message,
} from 'element-ui'

Vue.use(Backtop)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$message = Message