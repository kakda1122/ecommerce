<template>
  <div class="category-view">
    <h1>Categories</h1>
    <div v-if="!loading && allCategories.length > 0" class="category-grid">
      <div
        v-for="category in allCategories"
        :key="category.id"
        class="category-card"
        @click="navigateToCategory(category)"
        :style="{ backgroundColor: category.color || '#f8f9fa' }"
      >
        <img v-if="category.image" :src="category.image" alt="Category Image" class="category-image" />
        <div class="category-info">
          <h3>{{ category.name }}</h3>
          <p class="product-count">{{ category.productCount || 0 }} Products</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="loading" class="loading">
      <p>Loading categories...</p>
    </div>
    
    <div v-else class="no-categories">
      <p>No categories available.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product.js'

export default {
  name: 'CategoryView',
  setup() {
    const router = useRouter()
    const productStore = useProductStore()
    const loading = ref(true)

    const allCategories = computed(() => {
      return productStore.categories.map(category => {
        let imagePath = null
        
        if (category.image) {
          try {
            if (typeof category.image === 'string' && category.image.startsWith('[')) {
              const imageArray = JSON.parse(category.image)
              if (Array.isArray(imageArray) && imageArray.length > 0) {
                imagePath = imageArray[0]
              }
            } else if (Array.isArray(category.image) && category.image.length > 0) {
              imagePath = category.image[0]
            } else {
              imagePath = category.image
            }
            
            if (imagePath) {
              imagePath = imagePath.replace(/\\\\/g, '/').replace(/\\/g, '/')
              imagePath = `http://localhost:3000/${imagePath}`
            }
          } catch (error) {
            console.error('Error parsing image for category:', category.name, error)
            imagePath = null
          }
        }
        
        return {
          ...category,
          image: imagePath
        }
      })
    })

    const navigateToCategory = (category) => {
      router.push(`/categories/${category.id}`)
    }

    onMounted(async () => {
      await productStore.initializeData()
      loading.value = false
    })

    return {
      allCategories,
      loading,
      navigateToCategory
    }
  }
}
</script>

<style scoped>
.category-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-view h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.category-card {
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
}

.category-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-info h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 10px 0;
  color: #2c3e50;
}

.product-count {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 5px 0;
}

.loading, .no-categories {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .category-view {
    padding: 15px;
  }
  
  .category-view h1 {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-card {
    padding: 20px;
    min-height: 180px;
  }
  
  .category-image {
    width: 70px;
    height: 70px;
  }
  
  .category-info h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .category-card {
    padding: 15px;
    min-height: 160px;
  }
  
  .category-image {
    width: 60px;
    height: 60px;
  }
  
  .category-info h3 {
    font-size: 1rem;
  }
}
</style>
