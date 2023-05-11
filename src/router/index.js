import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/views/MainLayout.vue";
import PostList from "@/views/post/PostList.vue";
import PostView from "@/views/post/PostView.vue";
import PostEdit from "@/views/post/PostEdit.vue";
import BoardList from "@/views/board/BoardList.vue";
import BoardView from "@/views/board/BoardView.vue";
import BoardEdit from "@/views/board/BoardEdit.vue";

const routes = [
  {
    path: "/",
    name: "MainLayout",
    redirect: "/board",
    component: MainLayout,
    children: [
      {path: "board", name: "BoardList", component: BoardList},
      {path: "board/edit/:id", name: "BoardEdit", component: BoardEdit},
      {path: "board/edit", name: "BoardInsert", component: BoardEdit},
      {path: "board/view/:id", name: "BoardView", component: BoardView},
      {path: "post/:id", name: "PostList", component: PostList},
      {path: "post/:boardId/view/:id", name: "PostView", component: PostView},
      {path: "post/:boardId/edit/:id", name: "PostEdit", component: PostEdit},
      {path: "post/:boardId/edit", name: "PostInsert", component: PostEdit},
    ]
  },
];

const router = createRouter({
   history : createWebHistory(),
   routes
});

export default router;