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
    color: {
      type: String,
      default: 'green' 
    }
  }
}
</script>

<style scoped>
.button {
  color: rgb(22, 22, 22);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button:hover {
  opacity: 0.9; 
}
</style>