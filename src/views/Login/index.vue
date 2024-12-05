<template>
  <div class="login-page">
    <el-card class="login-card">
      <template #header>面经运营后台</template>
      <div>
        <div>内容</div>
        <div>内容</div>
        <div>内容</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex'
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 420px;
  margin: 0 auto;
  ::v-deep .el-card__header {
    text-align: center;
    background-color: #727cf5;
    color: white;
  }
}
</style>
