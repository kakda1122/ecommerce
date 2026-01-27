<template>
  <div class="product-detail">
    <!-- Debug Info (can be removed in production) -->
    <div v-if="false" class="debug-info">
      <p><strong>Product ID:</strong> {{ productId }}</p>
      <p><strong>Loading:</strong> {{ loading }}</p>
      <p><strong>Product Found:</strong> {{ product ? 'Yes' : 'No' }}</p>
      <p><strong>Store Products Count:</strong> {{ productStore.products.length }}</p>
      <p><strong>Store Categories Count:</strong> {{ productStore.categories.length }}</p>
      <details>
        <summary>All Product IDs in Store:</summary>
        <ul>
          <li v-for="p in productStore.products" :key="p.id">
            ID: {{ p.id }} - {{ p.name }}
          </li>
        </ul>
      </details>
    </div>

    <div v-if="product" class="product-container">
      <div class="product-image-section">
        <img v-if="product.image" :src="product.image" alt="Product Image" class="main-product-image" />
        <div v-else class="no-image-placeholder">
          <p>No Image Available</p>
        </div>
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
      <p>Product ID: {{ productId }}</p>
      <p>Please check if the product exists in the database.</p>
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
        console.log('Fetching product with ID:', props.productId)
        
        // Use the store getter first (teacher's requirement)
        const storeProduct = productStore.getProductById(props.productId)
        if (storeProduct) {
          product.value = processProductImage(storeProduct)
          console.log('Using product from store:', product.value)
          return
        }
        
        console.log('Product not found in store, fetching from API')
        const response = await axios.get(`${API_BASE_URL}/${props.productId}`)
        product.value = processProductImage(response.data)
        console.log('Fetched product from API:', product.value)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        loading.value = false
      }
    }

    const processProductImage = (productData) => {
      let imagePath = null
      
      // Handle JSON array format like ["uploads\\product\\..."]
      if (productData.image) {
        try {
          if (typeof productData.image === 'string' && productData.image.startsWith('[')) {
            const imageArray = JSON.parse(productData.image)
            if (Array.isArray(imageArray) && imageArray.length > 0) {
              imagePath = imageArray[0]
            }
          } else if (Array.isArray(productData.image) && productData.image.length > 0) {
            // If it's already an array, take the first image
            imagePath = productData.image[0]
          } else {
            // If it's a simple string, use it directly
            imagePath = productData.image
          }
          
          // Clean up the path and add server URL
          if (imagePath) {
            imagePath = imagePath.replace(/\\\\/g, '/').replace(/\\/g, '/')
            imagePath = `http://localhost:3000/${imagePath}`
          }
        } catch (error) {
          console.error('Error parsing image for product:', productData.name, error)
          imagePath = null
        }
      }
      
      return {
        ...productData,
        image: imagePath
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
      // Initialize store data first
      await productStore.initializeData()
      console.log('ProductDetailView - Store initialized')
      console.log('Products in store:', productStore.products.length)
      console.log('Looking for product ID:', props.productId)
      
      // Then fetch specific product
      await fetchProduct()
    })

    return {
      product,
      loading,
      quantity,
      productStore,
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

.debug-info {
  background: #f8f9fa;
  border: 2px solid #007bff;
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.debug-info p {
  margin: 8px 0;
  font-weight: bold;
}

.debug-info details {
  margin: 10px 0;
}

.debug-info summary {
  cursor: pointer;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 8px;
}

.debug-info ul {
  margin: 8px 0;
  padding-left: 20px;
}

.debug-info li {
  margin: 4px 0;
  color: #333;
}

.debug-info pre {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.8rem;
  color: #000;
}

.no-image-placeholder {
  width: 100%;
  height: 400px;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1.1rem;
}

.error p {
  margin: 10px 0;
}

.error p:first-child {
  font-weight: bold;
  color: #e74c3c;
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
