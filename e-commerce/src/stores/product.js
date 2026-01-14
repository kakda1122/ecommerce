import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [
      'Food & Vegetables',
      'Drinks & Beverages', 
      'Bakery & Cookies',
      'Meat & Seafood',
      'Dairy & Eggs',
      'Fruits',
      'Snacks & Sweets',
      'Pet Food'
    ],
    promotions: [],
    categories: [],
    products: [],
  }),
  getters: {
    getCategoriesByGroup: (state) => {
      const grouped = {}
      state.categories.forEach(category => {
        const groupName = category.group || 'Other'
        if (!grouped[groupName]) {
          grouped[groupName] = []
        }
        grouped[groupName].push(category)
      })
      return grouped
    },
    getCategoryById: (state) => (id) => {
      return state.categories.find(cat => cat.id === id)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
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