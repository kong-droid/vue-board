<template>
  <div class="wrapper">
    <header>
      <HeaderLayout />
    </header>
    <aside>
      <AsideLayout />
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderLayout from "@/views/HeaderLayout.vue";
import AsideLayout from "@/views/AsideLayout.vue";
export default {
  components: { HeaderLayout, AsideLayout },
  setup() {}
}
</script>
