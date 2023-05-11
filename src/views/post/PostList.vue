<template>
  <div class="container">
    <div class="row">
      <div class="col-7">
        <h3>{{boardTitle}}</h3>
      </div>
      <SearchKeyword @onSearchKeyword="onSearchKeyword"/>
    </div>
    <div>
      <table class="table caption-top">
        <caption>총 {{totalCount}}건</caption>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">닉네임</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody v-if="totalCount > 0" v-for="(view, index) in list" v-bind:key="index">
          <tr>
            <th scope="row">{{index + 1}}</th>
            <td><router-link :to="`/post/${view.boardId}/view/${view.id}`">{{view.title}}</router-link></td>
            <td>{{view.nickName}}</td>
            <td>{{view.createdDate}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <EmptyData />
        </tbody>
      </table>
    </div>
    <div class="page-div">
      <PageLayout
        :totalPages="totalPages"
        :key="totalPages"
        :pageUnit="pageCurrent.size"
        :currentPage="pageCurrent.page"
        @onChangePage="onChangePage"
      />
    </div>
  </div>
</template>

<script>
// component
import PageLayout from "@/components/PageLayout.vue";
import SearchKeyword from "@/components/SearchKeyword.vue";
import EmptyData from "@/components/EmptyData.vue";

// ref, route.. etc
import { ref } from "vue";
import { useRoute } from "vue-router";

// api
import { getPost } from "@/assets/api/post";


export default {
  name: "PostList",
  components: {EmptyData, PageLayout, SearchKeyword },
  setup() {
    const route = useRoute();
    const id = route.params.id;

    // 리스트 처리
    let pageCurrent = ref({
        page : 0,
        size : 10
    });

    let keyword = ref({
      keyword : "",
      boardId : id
    });

    const list = ref([]);
    const totalCount = ref(0);
    const totalPages = ref(0);
    const boardTitle = ref("");
    const readData = (page, size, params) => {
      getPost(page, size, params).then(res => {
        list.value = res.data.list;
        totalCount.value = res.data.totalCount;
        totalPages.value = res.data.totalPages;
        boardTitle.value = res.data.boardTitle;
      });
    }

    readData(pageCurrent.value.page, pageCurrent.value.size, keyword.value);
    const onChangePage = (page) => {
      pageCurrent.value.page = page;
      readData(pageCurrent.value.page, pageCurrent.value.size, keyword.value);
    };

    const onSearchKeyword = (word) => {
      pageCurrent.value.page = 0;
      keyword.value.keyword = word;
      readData(pageCurrent.value.page, pageCurrent.value.size,keyword.value);
    }

    return {
      boardTitle,
      list,
      totalCount,
      totalPages,
      pageCurrent,
      onChangePage,
      onSearchKeyword,
    }
  }
}
</script>
