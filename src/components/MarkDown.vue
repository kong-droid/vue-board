<template>
  <div class="markdown-div">
    <textarea v-if="isView" id="markdown-text" class="markdown-text" v-model="textArea" placeholder="내용을 입력하세요."></textarea>
    <div class="markdown-view" v-html="markDown"></div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { marked } from "marked";

export default {
  name: "MarkDown",
  props: {
    content: {
      type: String,
      required: true
    },
    isView: {
      type : Boolean,
      required: true,
      default: true
    }
  },
  setup(props){
    const textArea = ref(props.content);

    // 컴포지션 api 사용 시 데이터 업데이트 감지
    watch(() => props.content, (value) => textArea.value = value)

    // 마크다운이 수정될 때 마다 실행 computed
    let markDown = computed(() => marked(textArea.value === "undefined" || textArea.value === "" ? "" : textArea.value));

    return {
      textArea,
      markDown,
    };
  }
}
</script>