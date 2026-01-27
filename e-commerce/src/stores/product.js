import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [],
    promotions: [],
    categories: [],
    products: []
  }),
  getters: {
    getCategoriesByGroup: (state) => {
      return (groupName) => state.categories.filter((category) => category.group === groupName)
    },
    getProductsByGroup: (state) => {
      return (groupName) => state.products.filter((product) => product.group === groupName)
    },
    getProductsByCategory: (state) => {
      return (categoryId) => state.products.filter((product) => product.categoryId == categoryId)
    },
    getPopularProducts: (state) => {
      return state.products.filter((product) => product.countSold > 10)
    },
    getProductById: (state) => {
      return (productId) => state.products.find((product) => product.id == productId)
    },
    getCategoryById: (state) => {
      return (categoryId) => state.categories.find((category) => category.id == categoryId)
    }
  },
  actions: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3000/api/groups')
        this.groups = await response.json()
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/api/categories')
        this.categories = await response.json()
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async fetchPromotions() {
      try {
        const response = await fetch('http://localhost:3000/api/promotions')
        this.promotions = await response.json()
      } catch (error) {
        console.error('Error fetching promotions:', error)
      }
    },
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/api/products')
        this.products = await response.json()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async initializeData() {
      await Promise.all([
        this.fetchGroups(),
        this.fetchCategories(),
        this.fetchPromotions(),
        this.fetchProducts()
      ])
    }
  }
})