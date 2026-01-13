import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [
      'Milks & Diaries',
      'Coffees & Teas',
      'Pet Foods',
      'Meats',
      'Vegetables',
      'Fruits',
    ],
    promotions: [],
    categories: [],
    products: [],
  }),
  getters: {},
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