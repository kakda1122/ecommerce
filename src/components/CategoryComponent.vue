<template>
  <div class="category-container">
    <div class="category" v-for="(item, index) in categories" :key="index">
      <img :src="item.image" alt="Category Image" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  data() {
    return {
      categories: [
        { name: 'Cake & Milk', image: '/C1.png' },
        { name: 'Peach', image: '/C2.png' },
        { name: 'Red Apple', image: '/C3.png' },
        { name: 'Snack', image: '/C4.png' },
        { name: 'Black Plum', image: '/C5.png' },
        { name: 'Headstone', image: '/C6.png' },
        { name: 'Vegetables', image: '/C7.png' },
        { name: 'Orange', image: '/C8.png' },
        { name: 'Oganic kiwi', image: '/C9.png' },
        { name: 'Orange', image: '/C8.png' },
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
  background-color: rgb(208, 185, 223,0.5);
  border-radius: 10px;
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