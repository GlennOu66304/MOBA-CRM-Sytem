const menuList = [
  {
    id: 666,
    authName: "首页",
    path: "welcome",
    children: [
      {
        id: 667,
        authName: "Welcome",
        path: "welcome",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 107,
    authName: "分类管理",
    path: "category",
    children: [
      {
        id: 108,
        authName: "创建分类",
        path: "category/create",
        children: [],
        order: null,
      },
      {
        id: 109,
        authName: "分类列表",
        path: "category/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 117,
    authName: "物品管理",
    path: "item",
    children: [
      {
        id: 118,
        authName: "创建物品",
        path: "item/create",
        children: [],
        order: null,
      },
      {
        id: 119,
        authName: "物品列表",
        path: "item/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 127,
    authName: "英雄管理",
    path: "hero",
    children: [
      {
        id: 128,
        authName: "创建英雄",
        path: "hero/create",
        children: [],
        order: null,
      },
      {
        id: 129,
        authName: "英雄列表",
        path: "hero/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 137,
    authName: "文章管理",
    path: "article",
    children: [
      {
        id: 138,
        authName: "创建文章",
        path: "article/create",
        children: [],
        order: null,
      },
      {
        id: 139,
        authName: "文章列表",
        path: "article/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 147,
    authName: "广告管理",
    path: "ad",
    children: [
      {
        id: 148,
        authName: "创建广告",
        path: "ad/create",
        children: [],
        order: null,
      },
      {
        id: 149,
        authName: "广告列表",
        path: "ad/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 157,
    authName: "管理员管理",
    path: "admin",
    children: [
      {
        id: 158,
        authName: "创建管理员",
        path: "admin/create",
        children: [],
        order: null,
      },
      {
        id: 159,
        authName: "管理员列表",
        path: "admin/list",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
];

export default menuList;
