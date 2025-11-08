<template>
  <button class="button" :style="{ backgroundColor: color }">{{ label }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      required: true
    },

  }
}
</script>

<style scoped>
.button {
  color: rgb(22, 22, 22);
  background-color: green;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.button:hover {
  opacity: 0.9; 
  background-color: yellow;
}
</style>