<template>
  <div class="promotion-container">
    <div class="promotion" v-for="(promotion, index) in promotions" :key="index">
      <img :src="promotion.image" alt="Promotion Image" class="promotion-image" />
      <div class="promo-content">
        <h3>{{ promotion.title }}</h3>
        <ButtonComponent 
          :label="promotion.buttonText" 
          :color="promotion.buttonColor" 
          @click="shopNow(promotion)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PromotionComponent',
  components: {
    ButtonComponent
  },
  setup() {
    const router = useRouter()
    const promotions = ref([]);
    const API_BASE_URL = 'http://localhost:3000/api/promotions';

    const fetchPromotions = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        // Format the image paths if necessary
        promotions.value = response.data.map(promo => ({
          ...promo,
          image: promo.image ? `http://localhost:3000/${promo.image.replace(/\\/g, '/')}` : null,
        }));
        console.log('Fetched promotions:', promotions.value); // Log for debugging
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    onMounted(fetchPromotions);

    const shopNow = (promotion) => {
      // Navigate to a product or category related to the promotion
      if (promotion.productId) {
        router.push(`/products/${promotion.productId}`);
      } else if (promotion.categoryId) {
        router.push(`/categories/${promotion.categoryId}`);
      } else {
        // Navigate to deals page or home
        router.push('/');
      }
    };

    return {
      promotions,
      shopNow
    };
  }
}
</script>

<style scoped>

.promotion-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
}
.promotion {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  margin: 10px;
}
.promotion-image {
  width: 100%;  
  height: 200px;
  object-fit: cover;
  padding: 10px;
  border-radius: 25px;
}
.promo-content {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px;
  background-color: rgba(205, 200, 200, 0.5);
  border-radius: 10px;
  color:black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
@media (max-width: 768px) {
  .promotion {
    width: calc(50% - 20px); /* 2 items per row */
  }
}
@media (max-width: 480px) {
  .promotion {
    width: 100%; /* 1 item per row */
  }
}

</style>