<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <User></User>
        
        <!-- <router-view/> -->
      </div>
    </div>
  </div>
</template>

<script>
import User from "./views/User.vue";

export default {
  name: "app",
  components: { User }
};
</script>

<style lang="scss">
  @import "node_modules/bootstrap/scss/bootstrap";
  @import "node_modules/bootstrap-vue/src/index.scss";
  .vertical-centre {
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .todo__row {
    width: 400px;
  }
</style>