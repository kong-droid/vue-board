<template>
  <button class="btn btn-dark back-btn" @click="backStack">
    <font-awesome-icon
      :icon="['fas', 'arrow-left']"
      id="file-icon"
    />
    뒤로가기
  </button>
</template>

<script>
export default {
  name: "BackButton",
  components: {},
  setup() {
    const backStack = () => {
      history.back();
    }
    return {
      backStack,
    };
  }
}
</script>