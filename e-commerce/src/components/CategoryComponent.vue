<template>
  <div class="category-container">
    <div class="category" v-for="(item, index) in categories" :key="index" 
      :style="{ backgroundColor: item.backgroundColor  }">
      <img :src="item.image" alt="Category Image" />
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  data() {
    return {
      categories: [
        { name: 'Cake & Milk', image: '/C1.png',backgroundColor:'rgba(245, 40, 145, 0.1)', description: '15 items' },
        { name: 'Peach', image: '/C2.png', backgroundColor: 'rgba(255, 165, 0, 0.1)', description: '10 items' },
        { name: 'Red Apple', image: '/C3.png', backgroundColor: 'rgba(255, 0, 0, 0.1)', description: '12 items' },
        { name: 'Snack', image: '/C4.png', backgroundColor: 'rgba(39, 245, 245, 0.1)', description: '8 items' },
        { name: 'Black Plum', image: '/C5.png', backgroundColor: 'rgba(128, 0, 128, 0.1)', description: '5 items' },
        { name: 'Headstone', image: '/C6.png', backgroundColor: 'rgba(39, 245, 245, 0.1)', description: '7 items' },
        { name: 'Vegetables', image: '/C7.png', backgroundColor: 'rgba(169, 169, 169, 0.1)', description: '20 items' },
        { name: 'Orange', image: '/C8.png', backgroundColor: 'rgba(255, 165, 0, 0.1)', description: '18 items' },
        { name: 'Oganic kiwi', image: '/C9.png', backgroundColor: 'rgba(255, 192, 203, 0.1)', description: '22 items' },
        { name: 'Orange', image: '/C8.png', backgroundColor: 'rgba(245, 40, 145, 0.1)', description: '30 items' },

      ]
    }
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
   color:black;
}
.category {
  text-align: center;
  margin: 10px;
  border-radius: 10px;;
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
    width: calc(33.33% - 20px); /* 3 items per row */
  }
}

@media (max-width: 480px) {
  .category {
    width: calc(50% - 20px); /* 2 items per row */
  }
}
</style>