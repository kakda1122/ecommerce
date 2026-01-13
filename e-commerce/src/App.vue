<template>
 <HeaderComponent />
  <div id="app">
   
    <CategoryComponent />
    <PromotionComponent />
    <ProductComponent />
  </div>
  <FooterComponent />
</template>

<script>
import { onMounted } from 'vue'
import { useProductStore } from './stores/product.js'
import CategoryComponent from './components/CategoryComponent.vue';
import PromotionComponent from './components/PromotionComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



export default {
  name: 'App',
  components: {
    HeaderComponent,
    CategoryComponent,
    PromotionComponent,
    ProductComponent,
    FooterComponent
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column; 
  background-color: white;
}
</style> 