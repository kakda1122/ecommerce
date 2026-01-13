<template>
  <div class="home">
    <CategoryComponent />
    <PromotionComponent />
    <ProductComponent />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/product.js'
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
    const productStore = useProductStore()

    onMounted(async () => {
      await productStore.initializeData()
    })

    return {}
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
