import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter); 
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isLoggedIn"]) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/update-profile',
    name: 'update-profile',
    props: true,
    component: () => import('../components/UpdateUser.vue')
  },
  {
    path: '/view-users',
    name: 'view-users',
    props: true,
    component: () => import('../components/ViewUsers.vue')
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/About.vue")
  },
  {
    path: "/create-task",
    name: "create-task",
    component: () => import("../components/tasks/CreateTask.vue")
  },
  {
    path: "/task-details",
    name: "task-details",
    component: () => import("../components/tasks/TaskDetails.vue")
  }]; 
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes}); 
export default router;