<script setup lang="ts">
import Menu from './component/menu.vue';
import Header from './component/header.vue';
</script>

<template>
  <div>
    <Header></Header>
    <div class="main">
      <Menu></Menu>
      <div class="body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
.main {
  display: flex;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: $pageColor;
  .body {
    padding: 20px;
    width: 100%;
  }
}
</style>
