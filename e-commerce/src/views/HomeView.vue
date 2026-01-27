<template>
  <div class="home">
    <CategoryComponent />
    <PromotionComponent />
    <ProductComponent />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import CategoryComponent from '../components/CategoryComponent.vue';
import PromotionComponent from '../components/PromotionComponent.vue';
import ProductComponent from '../components/ProductComponent.vue';

export default {
  name: 'HomeView',
  components: {
    CategoryComponent,
    PromotionComponent,
    ProductComponent
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
