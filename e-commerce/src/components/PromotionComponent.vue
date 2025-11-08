<template>
  <div class="promotion-container">
    <div class="promotion" v-for="(promotion, index) in promotions" :key="index">
      <img :src="promotion.image" alt="Promotion Image" class="promotion-image" />
      <div class="promo-content">
        <h3>{{ promotion.title }}</h3>
        <ButtonComponent 
          :label="'Shop Now'" 
          :color="promotion.buttonColor" 
          @click="shopNow(promotion)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

export default {
  name: 'PromotionComponent',
  components: {
    ButtonComponent
  },
  props: {
    promotion: {
      type: Object,
      required: true
    }
  },
    methods: {
    shopNow(promotion) {
      alert("Let's shop: " + promotion.title);
    }
  },
  data() {
    return {
      promotions: [
        { title: 'Everyday Fresh & Clean with Our Products', image: '/C10.jpg', buttonText: 'Shop Now' },
        { title: 'Make your Breakfast Healthy and Easy', image: '/C14.png', buttonText: 'Shop Now' },
        { title: 'The Best Organic Products Online currently', image: '/C12.jpg', buttonText: 'Shop Now' }
      ]
    }
  }
}

</script>

<style scoped>
.promotion-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  justify-content: space-around;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: small;
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
  color: rgb(9, 9, 9);
  text-align: center;
  padding: 10px;
  background-color: rgba(205, 200, 200, 0.5);
  border-radius: 10px;
}
@media (max-width: 768px) {
  .promotion {
    width: calc(50% - 20px); /* 2 items per row */
    font-size: x-small;
  }
}

@media (max-width: 480px) {
  .promotion {
    width: 100%; /* 1 item per row */
  }
}
</style>