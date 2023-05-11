<template>
  <div class="container">
    <div class="row">
      <div class="col-7">
        <h3>게시판</h3>
      </div>
      <SearchKeyword @on-search-keyword="onSearchKeyword"/>
    </div>
    <div>
      <table class="table caption-top">
        <caption>총 {{totalCount}}건</caption>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">게시판명</th>
            <th scope="col">닉네임</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody v-if="totalCount > 0" v-for="(view, index) in list" v-bind:key="index">
          <tr>
            <th scope="row">{{index + 1}}</th>
            <td><router-link :to="`/board/view/${view.id}`">{{view.title}}</router-link></td>
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
        :total-pages="totalPages"
        :key="totalPages"
        :page-unit="pageCurrent.size"
        :curren-page="pageCurrent.page"
        @on-change-page="onChangePage"
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

import { getBoard } from "@/assets/api/board";


export default {
  name: "BoardList",
  components: { EmptyData, PageLayout, SearchKeyword },
  setup() {
    // 리스트 처리
    let pageCurrent = ref({
      page : 0,
      size : 10
    });

    let keyword = ref({
      keyword : ""
    });
    const list = ref([]);
    const totalCount = ref(0);
    const totalPages = ref(0);
    const readData = (page, size, params) => {
      getBoard(page, size, params).then(res => {
        list.value = res.data.list;
        totalCount.value = res.data.totalCount;
        totalPages.value = res.data.totalPages;
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
      list,
      totalCount,
      totalPages,
      pageCurrent,
      onChangePage,
      onSearchKeyword
    }
  }
}
</script>
