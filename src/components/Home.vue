<template>
    首页
    <el-button type="primary">Primary</el-button>
    <!-- 为什么子路由的东西显示不出来，没加router-view -->
    <router-view></router-view>
</template>
<script>
  export default {
    name:'HomePage',
    mixins: [],
    components: {},
    props:{},
    data () {
      return {

      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {},
  }
</script>
<style scoped>

</style>