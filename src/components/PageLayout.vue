<template>
  <ul class="pagination">
    <li class="page-item"><button class="page-link" @click="goFirst" :disabled="isFirst">&lt;&lt;</button></li>
    <li class="page-item"><button class="page-link" @click="goPrev" :disabled="isFirst">&lt;</button></li>
    <li class="page-item"
      v-for="page in pageGroup"
      :key="page"
      :class="{active: isActive(page)}"
      @click="onChangePage(page)">
      <button class="page-link">{{ page+1 }}</button>
    </li>
    <li class="page-item"><button class="page-link" @click="goNext" :disabled="isLast">&gt;</button></li>
    <li class="page-item"><button class="page-link" @click="goLast" :disabled="isLast">&gt;&gt;</button></li>
  </ul>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
export default {
  name: "PageLayout",
  props: {
    totalPages: {
      type: Number,
      default: 0
    },
    pageUnit: {
      type: Number,
      default: 10
    },
    groupUnit: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  emits: ["onChangePage"],
  setup(props, {emit}) {

    let pageUnit = ref(props.pageUnit).value;
    let groupUnit = ref(props.groupUnit).value;

    const totalPages = ref(props.totalPages).value;
    const changeCurrent = ref(props.currentPage);
    const pageGroup = ref([]);

    const initPageArray = () => {
      let pages = pageUnit;
      if(totalPages < pageUnit) {
        pages = totalPages;
      }

      let group = Math.floor(changeCurrent.value / groupUnit);

      let isLastGroup = changeCurrent.value >= totalPages - totalPages % groupUnit;
      if(isLastGroup) {
          pages = totalPages % groupUnit;
      }

      let currentGroup = Array.from({length: pages}, (_, i) => i + (group * groupUnit));
      if(pageGroup.value !== currentGroup){
        pageGroup.value = currentGroup;
      }
    };

    const goFirst = () => onChangePage(0);
    const goPrev = () => onChangePage(Math.max(0, changeCurrent.value - 1));
    const goNext = () => onChangePage(Math.min(totalPages - 1, changeCurrent.value + 1));
    const goLast = () => onChangePage(totalPages - 1);

    // 값이 변경될 때 마다 수정함
    const isFirst = computed(() => changeCurrent.value === 0 && totalPages > 0);
    const isLast = computed(() => changeCurrent.value === (totalPages - 1) && totalPages > 0);

    const isActive = (page) => changeCurrent.value === page;
    const onChangePage = (page) => {
        changeCurrent.value = page;
        emit("onChangePage", page);
    };

    // 모든 상황에 따라 수정되어야 함
    watch(() => changeCurrent.value, initPageArray);
    watch(() => props.currentPage, (val) => { changeCurrent.value = val });
    onMounted(initPageArray);

    return {
      pageGroup,
      changeCurrent,
      isFirst,
      isLast,
      goFirst,
      goNext,
      goPrev,
      goLast,
      onChangePage,
      isActive
    };
  }
}
</script>