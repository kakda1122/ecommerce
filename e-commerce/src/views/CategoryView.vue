<template>
  <div class="category-view">
    <h1>Categories</h1>
    <div v-if="Object.keys(groupedCategories).length > 0" class="categories-by-group">
      <div 
        v-for="(categories, groupName) in groupedCategories" 
        :key="groupName"
        class="category-group"
      >
        <h2 class="group-title">{{ groupName }}</h2>
        <div class="category-grid">
          <div
            v-for="category in categories"
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

    const groupedCategories = computed(() => {
      return productStore.getCategoriesByGroup
    })

    const navigateToCategory = (category) => {
      router.push(`/categories/${category.id}`)
    }

    onMounted(async () => {
      await productStore.fetchCategories()
      loading.value = false
    })

    return {
      groupedCategories,
      loading,
      navigateToCategory
    }
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
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.categories-by-group {
  max-width: 1200px;
  margin: 0 auto;
}

.category-group {
  margin-bottom: 50px;
}

.group-title {
  color: #3498db;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
  display: flex;
  align-items: center;
}

.group-title::before {
  content: "📂";
  margin-right: 10px;
  font-size: 1.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid #e9ecef;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.category-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-info h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #2c3e50;
  line-height: 1.3;
}

.product-count {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
}

.loading, .no-categories {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
  font-size: 1.2rem;
}

/* Group-specific colors */
.category-group:nth-child(1) .group-title::before { content: "🥬"; }
.category-group:nth-child(2) .group-title::before { content: "🥤"; }
.category-group:nth-child(3) .group-title::before { content: "🍪"; }
.category-group:nth-child(4) .group-title::before { content: "🥩"; }
.category-group:nth-child(5) .group-title::before { content: "🥛"; }
.category-group:nth-child(6) .group-title::before { content: "🍎"; }
.category-group:nth-child(7) .group-title::before { content: "🍫"; }
.category-group:nth-child(8) .group-title::before { content: "🐕"; }

@media (max-width: 768px) {
  .category-view {
    padding: 15px;
  }
  
  .category-view h1 {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  .group-title {
    font-size: 1.5rem;
  }
  
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .category-card {
    padding: 15px;
    min-height: 180px;
  }
  
  .category-image {
    width: 70px;
    height: 70px;
  }
  
  .category-info h3 {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  
  .category-card {
    padding: 12px;
    min-height: 160px;
  }
  
  .category-image {
    width: 60px;
    height: 60px;
  }
  
  .group-title {
    font-size: 1.3rem;
  }
}
</style>
