<template>
  <div class="category-view">
    <h1>Categories</h1>
    <CategoryComponent />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/product.js'
import CategoryComponent from '../components/CategoryComponent.vue';

export default {
  name: 'CategoryView',
  components: {
    CategoryComponent
  },
  setup() {
    const productStore = useProductStore()

    onMounted(async () => {
      await productStore.fetchCategories()
    })

    return {}
  }
}
</script>

<style scoped>
.category-view {
  padding: 20px;
  min-height: 100vh;
}

.category-view h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5rem;
}
</style>
