<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h3>About ShopHub</h3>
            <p>Your trusted online marketplace for quality products. We offer a wide range of categories including groceries, electronics, fashion, and more.</p>
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">📧</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Customer Service</h3>
            <ul class="footer-links">
              <li><a href="#" @click="navigateTo('help')">Help Center</a></li>
              <li><a href="#" @click="navigateTo('contact')">Contact Us</a></li>
              <li><a href="#" @click="navigateTo('returns')">Returns & Refunds</a></li>
              <li><a href="#" @click="navigateTo('shipping')">Shipping Info</a></li>
              <li><a href="#" @click="navigateTo('faq')">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><a href="#" @click="navigateTo('categories')">All Categories</a></li>
              <li><a href="#" @click="navigateTo('deals')">Today's Deals</a></li>
              <li><a href="#" @click="navigateTo('new')">New Arrivals</a></li>
              <li><a href="#" @click="navigateTo('popular')">Popular Products</a></li>
              <li><a href="#" @click="navigateTo('gift')">Gift Cards</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to get special offers and updates</p>
            <div class="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                v-model="email"
                @keyup.enter="subscribe"
              />
              <button @click="subscribe" class="subscribe-btn">Subscribe</button>
            </div>
            <div class="payment-methods">
              <h4>Payment Methods</h4>
              <div class="payment-icons">
                <span class="payment-icon">💳</span>
                <span class="payment-icon">💰</span>
                <span class="payment-icon">📱</span>
                <span class="payment-icon">🏦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
          <div class="legal-links">
            <a href="#" @click="navigateTo('privacy')">Privacy Policy</a>
            <a href="#" @click="navigateTo('terms')">Terms of Service</a>
            <a href="#" @click="navigateTo('cookies')">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FooterComponent',
  setup() {
    const email = ref('')

    const subscribe = () => {
      if (email.value.trim()) {
        console.log('Subscribing email:', email.value)
        // Handle newsletter subscription
        email.value = ''
      }
    }

    const navigateTo = (page) => {
      console.log('Navigate to:', page)
      // Handle navigation
    }

    return {
      email,
      subscribe,
      navigateTo
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  margin-top: auto;
}

.footer-content {
  padding: 3rem 0 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #bdc3c7;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #3498db;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #34495e;
  color: #ecf0f1;
  text-decoration: none;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.3s;
}

.social-link:hover {
  background-color: #3498db;
  transform: translateY(-2px);
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #34495e;
  border-radius: 4px;
  background-color: #34495e;
  color: #ecf0f1;
  font-size: 0.9rem;
}

.newsletter-form input::placeholder {
  color: #95a5a6;
}

.subscribe-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.subscribe-btn:hover {
  background-color: #2980b9;
}

.payment-methods h4 {
  color: #3498db;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.payment-icons {
  display: flex;
  gap: 0.5rem;
}

.payment-icon {
  font-size: 1.5rem;
  opacity: 0.8;
}

.footer-bottom {
  background-color: #1a252f;
  padding: 1.5rem 0;
  border-top: 1px solid #34495e;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-content p {
  margin: 0;
  color: #95a5a6;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: #95a5a6;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.legal-links a:hover {
  color: #3498db;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 2rem 0 1.5rem;
  }
  
  .footer-section h3 {
    font-size: 1.1rem;
  }
  
  .payment-icons {
    justify-content: center;
  }
}
</style>
