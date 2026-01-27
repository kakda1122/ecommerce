<template>
  <div class="category-container">
    <div
        class="category"
        v-for="(category, index) in categories"
        :key="index"
        :style="{ backgroundColor: category.color }"
        @click="navigateToCategory(category)"
      >
      <img v-if="category.image" :src="category.image" alt="Category Image" />
      <h1>{{ category.name }}</h1>
      <p>Products: {{ category.productCount }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CategoryComponent',
  setup() {
    const router = useRouter()
    const categories = ref([]);
    const API_BASE_URL = 'http://localhost:3000/api/categories';

    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        categories.value = response.data.map(cat => ({
          ...cat,
          image: cat.image ? `http://localhost:3000/${cat.image.replace(/\\\\/g, '/')}` : null,
        }));

        console.log('Fetched categories:', categories.value); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const navigateToCategory = (category) => {
      router.push(`/categories/${category.id}`)
    }

    onMounted(fetchCategories);

    return {
      categories,
      navigateToCategory
    };
  }
}
</script>

<style scoped>
.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
  font-size: small;
  color: black;
}
.category {
  text-align: center;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.category h1 {
  font-size: 14px;
  margin-top: 10px;
}
.category p {
  font-size: 12px;
  color: gray;
}
.category img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
@media (max-width: 768px) {
  .category {
    width: calc(33.33% - 20px); 
  }
}
@media (max-width: 480px) {
  .category {
    width: calc(50% - 20px); 
  }
}
</style>