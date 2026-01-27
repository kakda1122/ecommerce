<template>
  <div class="product-container">
    <h2>Products</h2>
    <div class="products-grid">
      <div 
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
        @click="viewProductDetail(product)"
      >
        <img 
          v-if="product.image" 
          :src="product.image" 
          alt="Product Image" 
          class="product-image"
        />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="rating">Rating: {{ product.rating }}/5</p>
          <p class="size">Size: {{ product.size }}</p>
          <p class="promotion">Promotion: {{ product.promotionAsPercentage }}%</p>
          <p class="category">Category: {{ getCategoryName(product.categoryId) }}</p>
          <p class="sold">Sold: {{ product.countSold }}</p>
          <p class="group">Group: {{ product.group }}</p>
          <p class="price">Price: ${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ProductComponent',
  setup() {
    const router = useRouter()
    const products = ref([]);
    const categories = ref([]);
    const API_BASE_URL = 'http://localhost:3000/api';
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        categories.value = response.data;
        console.log('Fetched categories:', categories.value);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(cat => cat.id == categoryId);
      return category ? category.name : `Category ${categoryId}`;
    };
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`)
        products.value = response.data.map(product => {
          let imagePath = null
          
          // Handle JSON array format like ["uploads\\product\\..."]
          if (product.image) {
            try {
              // If it's a JSON string array, parse it and take the first image
              if (typeof product.image === 'string' && product.image.startsWith('[')) {
                const imageArray = JSON.parse(product.image)
                if (Array.isArray(imageArray) && imageArray.length > 0) {
                  imagePath = imageArray[0]
                }
              } else if (Array.isArray(product.image) && product.image.length > 0) {
                // If it's already an array, take the first image
                imagePath = product.image[0]
              } else {
                // If it's a simple string, use it directly
                imagePath = product.image
              }
              
              // Clean up the path and add server URL
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
        console.log('Fetched products:', products.value)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const viewProductDetail = (product) => {
      router.push(`/products/${product.id}`)
    }

    onMounted(async () => {
      await fetchCategories();
      await fetchProducts();
    })

    return {
      products,
      viewProductDetail,
      getCategoryName
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

.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
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