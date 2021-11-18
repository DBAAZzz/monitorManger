<script setup lang="ts" >
import { reactive } from 'vue';
import { menuType } from './type'

const menuList = reactive<menuType[]>([
  {
    menuName: '用户中心',
    id: 1,
    path: '/user',
    menuList: [
      {
        menuName: '用户列表',
        id: 2,
        path: '',
        menuList: [
          {
            menuName: '测试',
            id: 3,
            path: '/home',
            menuList: []
          },
        ],
      },
    ],
  },
  {
    menuName: '异常监控',
    id: 4,
    path: '/activity',
    menuList: [
      {
        menuName: 'issue 看板',
        id: 5,
        path: '/issueBoard',
        menuList: [],
      },
      {
        menuName: 'issue 列表',
        id: 6,
        path: '/issueList',
        menuList: [],
      },
      {
        menuName: 'api 请求错误列表',
        id: 7,
        path: '/apiError',
        menuList: []
      },
      {
        menuName: '错误报告',
        id: 8,
        path: 'errorReport',
        menuList: []
      }
    ],
  }
]);
</script>

<template>
  <el-row class="menu">
    <el-col class="menu-col">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        text-color="#fff"
        router
      >
        <template v-for="menuItem in menuList" :key="menuItem.id">
          <el-sub-menu v-if="menuItem.menuList.length != 0" :index="menuItem.path">
            <template #title>
              <span>{{ menuItem.menuName }}</span>
            </template>
            <template v-for="subMenu in menuItem.menuList" :key="subMenu.id">
              <el-sub-menu v-if="subMenu.menuList.length != 0" :index="menuItem.path">
                <template #title>
                  <span>{{ subMenu.menuName }}</span>
                </template>
                <el-menu-item
                  v-for="(subMenuItem, subMenuItemIndex) in subMenu.menuList"
                  :index="subMenuItem.path"
                  :key="subMenuItemIndex"
                >
                  <span>{{ subMenuItem.menuName }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subMenu.path">
                <span>{{ subMenu.menuName }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="menuItem.path">
            <span>{{ menuItem.menuName }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
.menu {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  background: #545c64;
  :deep(.el-menu) {
    border-right: none;
  }
  &-col {
    width: 100%;
  }
}
a {
  color: #fff;
  text-decoration: none;
}
.link {
  display: block;
  width: 100%;
}
</style>
