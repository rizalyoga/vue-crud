import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Recipes from "../pages/Recipes.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipe/:slug",
    name: "Recipe",
    component: Recipes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
