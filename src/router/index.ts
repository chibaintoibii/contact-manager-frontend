import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import ContactsList from "@/pages/ContactsList.vue";
import AddContact from "@/pages/AddContact.vue";
import EditContact from "@/pages/EditContact.vue";
import ViewContact from "@/pages/ViewContact.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/contacts'
    // component: App
  },
  {
    path: '/contacts',
    component: ContactsList,
    name: 'ContactsList',
    meta: {requiresAuth: true}
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
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
  },

    // last route
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/auth/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
