import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Button,
  Container,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Header,
  Main,
  Table,
  TableColumn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Upload,
  Select,
  Option,
  Card,
  Avatar,
  checkbox,
  Pagination,
  PageHeader,
  Divider,
  Tabs,
  TabPane,
  Drawer,
  Notification,
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Header)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.use(Avatar)
Vue.use(checkbox)
Vue.use(Pagination)
Vue.use(PageHeader)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Drawer)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
