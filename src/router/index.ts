import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ContactsList from "@/pages/ContactsList.vue";
import AddContact from "@/pages/AddContact.vue";
import EditContact from "@/pages/EditContact.vue";
import ViewContact from "@/pages/ViewContact.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/contacts'
  },
  {
    path: '/contacts',
    component: ContactsList,
    name: 'ContactsList',
  },
  {
    path: '/contacts/add',
    name: 'AddContact',
    component: AddContact,
  },
  {
    path: '/contacts/edit/:id',
    name: 'EditContact',
    component: EditContact,
  },
  {
    path: '/contacts/view/:id',
    name: 'ViewContact',
    component: ViewContact,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
