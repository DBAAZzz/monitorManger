<script setup lang="ts">
import userPic from '@/assets/images/user.gif';

</script>

<template>
  <div class="header">
    <div class="header_user">
      <img class="header_user_pic" :src="userPic" />
      <p class="header_user_name">DBAAZzz</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
.header {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #545c64;
  &_user {
    position: absolute;
    display: flex;
    right: 100px;
    align-items: center;
    cursor: pointer;
    &_pic {
      width: 40px;
      height: 40px;
    }
    &_name {
      margin-left: 10px;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
