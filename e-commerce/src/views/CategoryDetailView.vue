<template>
  <div class="category-detail">
    <!-- Debug Info (can be removed in production) -->
    <div v-if="false" class="debug-info">
      <p>Category ID: {{ categoryId }}</p>
      <p>Loading: {{ loading }}</p>
      <p>Category: {{ category }}</p>
      <p>Products Count: {{ products.length }}</p>
    </div>

    <div v-if="category" class="category-header">
      <div class="category-info">
        <img v-if="category.image" :src="category.image" alt="Category Image" class="category-image" />
        <div class="category-details">
          <h1>{{ category.name }}</h1>
          <p class="description">{{ category.description || `Browse our ${category.name} collection` }}</p>
          <p class="product-count">{{ category.productCount || products.length }} Products Available</p>
          <p class="category-group" v-if="category.group">Group: {{ category.group }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="loading">
      <p>Loading category details...</p>
    </div>

    <div v-else class="error">
      <p>Category not found or error loading category.</p>
      <p>Category ID: {{ categoryId }}</p>
      <button @click="goBack" class="back-btn">Go Back</button>
    </div>

    <div v-if="category" class="products-section">
      <div class="section-header">
        <h2>Products in {{ category.name }}</h2>
        <div class="filter-options">
          <select v-model="sortBy" class="sort-select">
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="sold">Sort by Best Selling</option>
            <option value="promotion">Sort by Promotion</option>
          </select>
        </div>
      </div>

      <div v-if="filteredProducts.length > 0" class="products-grid">
        <div 
          class="product-card"
          v-for="product in filteredProducts"
          :key="product.id"
          @click="viewProductDetail(product)"
        >
          <img v-if="product.image" :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="rating">Rating: {{ product.rating }}/5 ⭐</p>
            <p class="size">Size: {{ product.size }}</p>
            <p class="promotion" v-if="product.promotionAsPercentage">
              {{ product.promotionAsPercentage }}% OFF
            </p>
            <p class="sold">Sold: {{ product.countSold }}</p>
          </div>
        </div>
      </div>

      <div v-else class="no-products">
        <h3>No products found in this category</h3>
        <p>Check back later for new products in {{ category?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product.js'
import axios from 'axios'

export default {
  name: 'CategoryDetailView',
  props: {
    categoryId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    
    const category = ref(null)
    const products = ref([])
    const loading = ref(true)
    const sortBy = ref('name')
    
    const API_BASE_URL = 'http://localhost:3000/api'

    const fetchCategory = async () => {
      try {
        console.log('Getting category with ID:', props.categoryId)
        
        // Use store getter instead of API call
        const categoryFromStore = productStore.getCategoryById(props.categoryId)
        if (categoryFromStore) {
          let imagePath = null
          
          // Handle JSON array format like ["uploads\\category\\..."]
          if (categoryFromStore.image) {
            try {
              if (typeof categoryFromStore.image === 'string' && categoryFromStore.image.startsWith('[')) {
                const imageArray = JSON.parse(categoryFromStore.image)
                if (Array.isArray(imageArray) && imageArray.length > 0) {
                  imagePath = imageArray[0]
                }
              } else if (Array.isArray(categoryFromStore.image) && categoryFromStore.image.length > 0) {
                imagePath = categoryFromStore.image[0]
              } else {
                imagePath = categoryFromStore.image
              }
              
              if (imagePath) {
                imagePath = imagePath.replace(/\\\\/g, '/').replace(/\\/g, '/')
                imagePath = `http://localhost:3000/${imagePath}`
              }
            } catch (error) {
              console.error('Error parsing image for category:', categoryFromStore.name, error)
              imagePath = null
            }
          }
          
          category.value = {
            ...categoryFromStore,
            image: imagePath,
          }
          console.log('Found category in store:', category.value)
        } else {
          console.log('Category not found in store either')
        }
      } catch (error) {
        console.error('Error getting category:', error)
      }
    }

    const fetchProductsByCategory = async () => {
      try {
        console.log('Fetching products for category ID:', props.categoryId)
        
        // Use the store getter first (teacher's requirement)
        const categoryProducts = productStore.getProductsByCategory(props.categoryId)
        
        if (categoryProducts.length > 0) {
          products.value = categoryProducts.map(product => {
            let imagePath = null
            
            // Handle JSON array format like ["uploads\\product\\..."]
            if (product.image) {
              try {
                if (typeof product.image === 'string' && product.image.startsWith('[')) {
                  const imageArray = JSON.parse(product.image)
                  if (Array.isArray(imageArray) && imageArray.length > 0) {
                    imagePath = imageArray[0]
                  }
                } else if (Array.isArray(product.image) && product.image.length > 0) {
                  imagePath = product.image[0]
                } else {
                  imagePath = product.image
                }
                
                if (imagePath) {
                  imagePath = imagePath.replace(/\\\\/g, '/').replace(/\\/g, '/')
                  imagePath = `http://localhost:3000/${imagePath}`
                }
              } catch (error) {
                console.error('Error parsing image for product:', product.name, error)
                imagePath = null
              }
            }
            
            return {
              ...product,
              image: imagePath
            }
          })
          console.log('Using products from store getter:', products.value)
          return
        }
        
        // Fallback to API if no products in store
        const response = await axios.get(`${API_BASE_URL}/products?categoryId=${props.categoryId}`)
        products.value = response.data.map(product => ({
          ...product,
          image: product.image ? `http://localhost:3000/${product.image.replace(/\\/g, '/')}` : null,
        }))
        console.log('Fetched products from API:', products.value)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const filteredProducts = computed(() => {
      let sorted = [...products.value]
      
      switch(sortBy.value) {
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'rating':
          sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'sold':
          sorted.sort((a, b) => (b.countSold || 0) - (a.countSold || 0))
          break
        case 'promotion':
          sorted.sort((a, b) => (b.promotionAsPercentage || 0) - (a.promotionAsPercentage || 0))
          break
      }
      
      return sorted
    })

    const viewProductDetail = (product) => {
      router.push(`/products/${product.id}`)
    }

    const goBack = () => {
      router.go(-1)
    }

    onMounted(async () => {
      // Initialize store data first (teacher's requirement)
      await productStore.initializeData()
      console.log('CategoryDetailView - Store initialized')
      
      // Then fetch specific category and its products
      await Promise.all([
        fetchCategory(),
        fetchProductsByCategory()
      ])
      
      loading.value = false
    })

    return {
      category,
      products,
      loading,
      sortBy,
      filteredProducts,
      viewProductDetail,
      goBack
    }
  }
}
</script>

<style scoped>
.category-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.category-header {
  margin-bottom: 40px;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-details h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.category-details .description {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.6;
}

.category-details .product-count {
  color: #3498db;
  font-weight: bold;
  font-size: 1.1rem;
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

.products-section {
  margin-top: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 2rem;
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;
  margin-bottom: 15px;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #2c3e50;
}

.product-info p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
}

.rating {
  color: #f39c12;
  font-weight: bold;
}

.promotion {
  color: #e74c3c;
  font-weight: bold;
}

.no-products {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.category-group {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 5px;
}

.debug-info {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-family: monospace;
  font-size: 0.8rem;
}

.no-products {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
}

.no-products h3 {
  color: #e74c3c;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .category-info {
    flex-direction: column;
    text-align: center;
  }
  
  .category-details h1 {
    font-size: 2rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .category-detail {
    padding: 15px;
  }
  
  .category-info {
    padding: 20px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
