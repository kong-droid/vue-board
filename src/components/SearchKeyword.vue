<template>
  <div class="col-3">
    <input type="text" class="form-control" placeholder="검색어를 입력하세요." v-model="keyword" @keyup.enter="onSearchKeyword"/>
  </div>
  <div class="col-2">
    <button type="button" class="btn btn-secondary" @click="onSearchKeyword">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
      검색
    </button>
    <button type="button" class="btn btn-dark search-btn" @click="onRegister">등록</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";

export default {
  // emit만 있어도 됨
  name: "SearchKeyword",
  emits: ["onSearchKeyword"],
  setup(props, { emit }){
    let keyword = ref("");
    const onSearchKeyword = () => {
      emit("onSearchKeyword", keyword.value);
    };

    const onRegister = () => {
      router.push(location.pathname.indexOf("board") === 1 ? "/board/edit" : location.pathname + "/edit" );
    };

    onMounted(onSearchKeyword);
    return {
      keyword,
      onSearchKeyword,
      onRegister
    };
  }
}
</script>
