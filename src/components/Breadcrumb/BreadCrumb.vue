<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link :to="item.path" v-if="index == 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();
const breadList = computed(() => route.matched);
</script>
