import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";
import CategoryCreate from "../views/CategoryCreate.vue";
import CategoryList from "../views/CategoryList.vue";
import ItemCreate from "../views/ItemCreate.vue";
import ItemList from "../views/ItemList.vue";
import HeroCreate from "../views/HeroCreate.vue";
import HeroList from "../views/HeroList.vue";
import ArticleCreate from "../views/ArticleCreate.vue";
import ArticleList from "../views/ArticleList.vue";
import AdCreate from "../views/AdCreate.vue";
import AdList from "../views/AdList.vue";
import AdminCreate from "../views/AdminCreate.vue";
import AdminList from "../views/AdminList.vue";
import Funds from "../views/Funds.vue";
import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/home",
  //   redirect: "/",
  // },

  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: Welcome,
      },
      {
        path: "/category/list",
        name: "categoryList",
        component: CategoryList,
      },
      {
        path: "/category/create",
        name: "createcategory",
        component: CategoryCreate,
      },
      {
        path: "/category/create/:id",
        name: "createcategory",
        component: CategoryCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/item/list",
        name: "itemList",
        component: ItemList,
      },
      {
        path: "/item/create",
        name: "createItem",
        component: ItemCreate,
      },
      {
        path: "/item/create/:id",
        name: "createItem",
        component: ItemCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/hero/list",
        name: "heroList",
        component: HeroList,
      },
      {
        path: "/hero/create",
        name: "createHero",
        component: HeroCreate,
      },
      {
        path: "/hero/create/:id",
        name: "createHero",
        component: HeroCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/article/list",
        name: "articleList",
        component: ArticleList,
      },
      {
        path: "/article/create",
        name: "createArticle",
        component: ArticleCreate,
      },
      {
        path: "/article/create/:id",
        name: "createArticle",
        component: ArticleCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/ad/list",
        name: "adList",
        component: AdList,
      },
      {
        path: "/ad/create",
        name: "createAd",
        component: AdCreate,
      },
      {
        path: "/ad/create/:id",
        name: "createAd",
        component: AdCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/admin/list",
        name: "adminList",
        component: AdminList,
      },
      {
        path: "/admin/create",
        name: "createAdmin",
        component: AdminCreate,
      },
      {
        path: "/admin/create/:id",
        name: "createAdmin",
        component: AdminCreate,
        // send the id data to the this path
        props:true
      },
      {
        path: "/funds",
        name: "funds",
        component: Funds,
      },
      {
        path: "/info",
        name: "info",
        component: Info,
      },
    ],
  },
];

// initainl a new vue Router
const router = new VueRouter({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes,
});

// // private router guard
router.beforeEach((to, from, next) => {
  // condition check, if the local storage has the jwt_token
  const isLogin = window.sessionStorage.token ? true : false;

  //if the router path is login, then just head to the login path
  if (to.path == "/login") {
    next();
  } else {
    // else, check if it localstorage contains the token, yes go to the dash board page, other wise go back to the login page
    isLogin ? next() : next("/login");
  }
});

export default router;
