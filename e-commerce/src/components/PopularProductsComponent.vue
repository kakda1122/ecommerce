<!-- <template>
  <div class="popular-products">
    <h2>Popular Products</h2>
    <div v-if="popularProducts.length > 0" class="products-grid">
      <div 
        class="product-card"
        v-for="product in popularProducts"
        :key="product.id"
        @click="viewProductDetail(product)"
      >
        <img 
          v-if="product.image" 
          :src="product.image" 
          alt="Product Image" 
          class="product-image"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div v-else class="no-image-placeholder">
          <p>No Image</p>
          <small>Debug: {{ product.image || 'No image path' }}</small>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="rating">Rating: {{ product.rating }}/5 ⭐</p>
          <p class="sold">Sold: {{ product.countSold }} units</p>
          <p class="popular-badge">🔥 Popular</p>
        </div>
      </div>
    </div>
    <div v-else class="no-popular">
      <p>No popular products available yet.</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product.js'

export default {
  name: 'PopularProductsComponent',
  setup() {
    const router = useRouter()
    const productStore = useProductStore()

    // Using computed property to call getter as requested by teacher
    const popularProducts = computed(() => {
      return productStore.getPopularProducts().map(product => {
        let imagePath = null
        
        // Handle different image formats
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
        
        console.log('PopularProduct:', product.name, 'Original image:', product.image, 'Processed path:', imagePath)
        return {
          ...product,
          image: imagePath
        }
      })
    })

    const viewProductDetail = (product) => {
      router.push(`/products/${product.id}`)
    }

    const handleImageError = (event) => {
      console.error('Popular product image failed to load:', event.target.src)
      event.target.style.display = 'none'
    }

    const handleImageLoad = (event) => {
      console.log('Popular product image loaded successfully:', event.target.src)
    }

    onMounted(async () => {
      await productStore.initializeData()
    })

    return {
      popularProducts,
      viewProductDetail,
      handleImageError,
      handleImageLoad
    }
  }
}
</script>

<style scoped>
.popular-products {
  margin: 20px 0;
}

.popular-products h2 {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 2px solid #e74c3c;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.2s;
}

.product-image:hover {
  transform: scale(1.05);
}

.no-image-placeholder {
  width: 100%;
  height: 180px;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.no-image-placeholder p {
  margin: 0 0 5px 0;
  font-weight: bold;
}

.no-image-placeholder small {
  font-size: 0.7rem;
  color: #999;
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

.popular-badge {
  color: #e74c3c;
  font-weight: bold;
  font-size: 0.9rem;
}

.no-popular {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .popular-products h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style> -->
