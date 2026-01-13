<template>
  <div class="product-container">
    <h2>Products</h2>
    <div class="products-grid">
      <div 
        class="product-card"
        v-for="(product, index) in displayedProducts"
        :key="index"
      >
        <img v-if="product.image" :src="product.image" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="rating">Rating: {{ product.rating }}/5</p>
          <p class="size">Size: {{ product.size }}</p>
          <p class="promotion">Promotion: {{ product.promotionAsPercentage }}%</p>
          <p class="category">Category ID: {{ product.categoryId }}</p>
          <p class="sold">Sold: {{ product.countSold }}</p>
          <p class="group">Group: {{ product.group }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ProductComponent',
  setup() {
    const products = ref([]);
    const API_BASE_URL = 'http://localhost:3000/api/products';
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_BASE_URL)
        products.value = response.data.map(product => ({
          ...product,
          image: product.image ? `http://localhost:3000/${product.image.replace(/\\/g, '/')}` : null,
        }))
        console.log('Fetched products:', products.value)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    onMounted(fetchProducts)

    return {
      displayedProducts: products
    }
  }
}
</script>

<style scoped>
.product-container {
  margin: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 15px; 
}

/* Each card will have these styles */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  margin-top: 10px;
}

h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
}

.rating,
.size,
.promotion,
.category,
.sold,
.group {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.promotion {
  font-weight: bold;
  color: #e74c3c; 
}
</style>