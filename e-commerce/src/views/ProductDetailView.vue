<template>
  <div class="product-detail">
    <div v-if="product" class="product-container">
      <div class="product-image-section">
        <img v-if="product.image" :src="product.image" alt="Product Image" class="main-product-image" />
      </div>
      <div class="product-info-section">
        <h1>{{ product.name }}</h1>
        <div class="product-details">
          <p class="rating">Rating: {{ product.rating }}/5 ⭐</p>
          <p class="size">Size: {{ product.size }}</p>
          <p class="promotion" v-if="product.promotionAsPercentage">
            Promotion: {{ product.promotionAsPercentage }}% OFF
          </p>
          <p class="category">Category: {{ getCategoryName(product.categoryId) }}</p>
          <p class="sold">Sold: {{ product.countSold }} units</p>
          <p class="group">Group: {{ product.group }}</p>
        </div>
        <div class="product-actions">
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              v-model="quantity" 
              min="1" 
              max="99"
              class="quantity-input"
            />
          </div>
          <button @click="addToCart" class="add-to-cart-btn">
            Add to Cart
          </button>
          <button @click="buyNow" class="buy-now-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="loading">
      <p>Loading product details...</p>
    </div>
    <div v-else class="error">
      <p>Product not found or error loading product.</p>
      <button @click="goBack" class="back-btn">Go Back</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product.js'
import axios from 'axios'

export default {
  name: 'ProductDetailView',
  props: {
    productId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    
    const product = ref(null)
    const loading = ref(true)
    const quantity = ref(1)
    const API_BASE_URL = 'http://localhost:3000/api/products'

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${props.productId}`)
        product.value = {
          ...response.data,
          image: response.data.image ? `http://localhost:3000/${response.data.image.replace(/\\/g, '/')}` : null,
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        loading.value = false
      }
    }

    const getCategoryName = (categoryId) => {
      const category = productStore.categories.find(cat => cat.id === categoryId)
      return category ? category.name : `Category ${categoryId}`
    }

    const addToCart = () => {
      if (product.value) {
        console.log(`Adding ${quantity.value} of ${product.value.name} to cart`)
        // TODO: Implement cart functionality
        alert(`Added ${quantity.value} ${product.value.name}(s) to cart!`)
      }
    }

    const buyNow = () => {
      if (product.value) {
        console.log(`Buying ${quantity.value} of ${product.value.name}`)
        // TODO: Implement checkout functionality
        alert(`Proceeding to checkout with ${quantity.value} ${product.value.name}(s)!`)
      }
    }

    const goBack = () => {
      router.go(-1)
    }

    onMounted(async () => {
      await productStore.fetchCategories()
      await fetchProduct()
    })

    return {
      product,
      loading,
      quantity,
      getCategoryName,
      addToCart,
      buyNow,
      goBack
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.product-image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-product-image {
  max-width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-info-section h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.product-details {
  margin-bottom: 30px;
}

.product-details p {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #555;
}

.rating {
  color: #f39c12;
  font-weight: bold;
}

.promotion {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.2rem;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-selector label {
  font-weight: bold;
  color: #333;
}

.quantity-input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.add-to-cart-btn, .buy-now-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn {
  background-color: #3498db;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.buy-now-btn {
  background-color: #e74c3c;
  color: white;
}

.buy-now-btn:hover {
  background-color: #c0392b;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #7f8c8d;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .main-product-image {
    height: 300px;
  }
  
  .product-info-section h1 {
    font-size: 2rem;
  }
}
</style>
