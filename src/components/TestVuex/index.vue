<script lang="ts">

import { defineComponent, onMounted } from 'vue'
import { routeStoreHooks } from '@/hooks'


export default defineComponent({
  setup() {
    let hook = routeStoreHooks()
    console.log('hook', hook)
  },
})
</script>

<template>
  <div>
    <p>这是测试Vuex用的组件</p>
  </div>
</template>