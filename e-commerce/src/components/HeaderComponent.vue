<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
        <div class="logo">
          <h1>ShopHub</h1>
        </div>
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="search-btn">Search</button>
        </div>
        <div class="header-actions">
          <div class="cart-icon" @click="toggleCart">
            <span class="icon">🛒</span>
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </div>
          <div class="user-menu">
            <button @click="toggleUserMenu" class="user-btn">
              <span class="icon">👤</span>
              <span>Account</span>
            </button>
            <div class="dropdown" v-show="showUserMenu">
              <a href="#" @click="login">Login</a>
              <a href="#" @click="register">Register</a>
              <a href="#" @click="viewOrders">Orders</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navigation">
      <div class="container">
        <ul class="nav-menu">
          <li><a href="#" @click="navigateTo('home')">Home</a></li>
          <li><a href="#" @click="navigateTo('categories')">Categories</a></li>
          <li><a href="#" @click="navigateTo('deals')">Deals</a></li>
          <li><a href="#" @click="navigateTo('about')">About</a></li>
          <li><a href="#" @click="navigateTo('contact')">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HeaderComponent',
  setup() {
    const searchQuery = ref('')
    const cartCount = ref(0)
    const showUserMenu = ref(false)

    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        console.log('Searching for:', searchQuery.value)
        // Emit search event or navigate to search results
      }
    }

    const toggleCart = () => {
      console.log('Toggle cart')
      // Emit cart toggle event
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const navigateTo = (page) => {
      console.log('Navigate to:', page)
      // Handle navigation
    }

    const login = () => {
      console.log('Login')
      showUserMenu.value = false
    }

    const register = () => {
      console.log('Register')
      showUserMenu.value = false
    }

    const viewOrders = () => {
      console.log('View orders')
      showUserMenu.value = false
    }

    return {
      searchQuery,
      cartCount,
      showUserMenu,
      handleSearch,
      toggleCart,
      toggleUserMenu,
      navigateTo,
      login,
      register,
      viewOrders
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-top {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo h1 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
}

.search-bar {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  display: flex;
  align-items: center;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #2980b9;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.cart-icon .icon {
  font-size: 1.5rem;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.user-btn .icon {
  font-size: 1.2rem;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 150px;
  z-index: 1000;
}

.dropdown a {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
}

.dropdown a:hover {
  background-color: #f8f9fa;
}

.dropdown a:last-child {
  border-bottom: none;
}

.navigation {
  background-color: #f8f9fa;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin: 0;
}

.nav-menu a {
  display: block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.nav-menu a:hover {
  background-color: #e9ecef;
  color: #3498db;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-bar {
    width: 100%;
    margin: 0;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-menu a {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
