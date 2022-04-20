<script setup lang="ts">
import { onMounted } from 'vue';
import { login, getList } from '@api/home';
import type { DefaultOption } from '@types';
import SearchBox from '@/components/Form/SearchBox/index.vue';
import LineChart from '@/components/LineChart/index.vue'

const options: DefaultOption[] = [
  {
    type: 'input',
    label: '订单编号',
    value: '',
    key: ['outOrderNo'],
  },
  {
    type: 'select',
    label: '人员',
    value: '',
    key: ['userName'],
  },
  {
    type: 'input',
    label: '手机号码',
    value: '',
    key: ['mobile'],
  },
  {
    type: 'dateRange',
    label: '时间',
    key: ['startTime', 'endTime'],
    value: [],
  },
];
const getParams = (params) => {
  console.log('params', params);
};
const loginFunc = async (userName: string, password: string) => {
  const data = await login({
    email: userName,
    passWord: password,
  });
  console.log('data', data);
};

const getFriendList = async () => {
  const data = await getList({
    pageNo: 1,
    pageSize: 10,
  });
  console.log('data', data);
};

onMounted(() => {
  
});
</script>

<template>
  <div>
    <SearchBox :options="options" @search="getParams"></SearchBox>
    <el-button @click="loginFunc('1292094030@qq.com', '123456')">正常登录</el-button>
    <el-button @click="loginFunc('1292094030@qq.com', '1234561')">错误登录</el-button>
    <el-button @click="getFriendList()">获取列表</el-button>
    <el-button>新增按钮</el-button>
    <LineChart width="100%" height="400px"></LineChart>
  </div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
</style>
