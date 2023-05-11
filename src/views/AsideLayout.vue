<template>
  <div class="aside-top">
    <ul class="aside-menu">
      <li class="aside-parents"><a href="/board">게시판</a></li>
      <li class="aside-parents"><a href="#">게시글</a></li>
      <ul
        v-for="view in boardList"
        v-bind:key="view.id"
      >
        <li class="aside-children">
          <a @click="movePage(view.id)">{{view.title}}</a>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import { getBoard } from "@/assets/api/board";
import { ref } from "vue";

export default {
    name: "AsideLayout",
    setup() {
      const boardList = ref([]);
      getBoard(0, 20, {}).then(res => {
        boardList.value = res.data.list;
      });

      const movePage = (id) => {
        location.href = "/post/" + id;
      }

      return {
        boardList,
        movePage
      };
    }
}
</script>