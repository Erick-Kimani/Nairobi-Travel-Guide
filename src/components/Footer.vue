<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const currentYear = new Date().getFullYear();
const authStore = useAuthStore();
const router = useRouter();

// Check if user is authenticated
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Logout handler
const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/login'); // Redirect to login page after logout
  } catch (error) {
    console.error('Logout failed:', error);
    // Optionally show error notification to user
  }
};
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-section brand-info">
        <h2 class="footer-logo">EXPLORE<span>NAIROBI</span></h2>
        <p>
          Redefining luxury travel with curated experiences in the world's 
          most breathtaking locations. Your comfort is our heritage.
        </p>
        <!-- <div class="social-links">
          <a href="https://www.facebook.com/" aria-label="Facebook" class="social-icon">FB</a>
          <a href="https://www.instagram.com/" aria-label="Instagram" class="social-icon">IG</a>
          <a href="https://twitter.com/" aria-label="Twitter" class="social-icon">TW</a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" class="social-icon">LI</a>
          
        </div> -->
      <br>
        <!-- <v-btn icon="mdi-bell-outline" class="mr-2"  router-link to="/contactus" /> -->
      </div>

      <div class="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/choice">Explore Hotels</router-link></li>
          <li><router-link to="/contactus">Contact Us</router-link></li>
          
          
        </ul>
      </div>

      <div class="footer-section links">
        <h3>Support</h3>
        <ul>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/explore">Explore</router-link></li>
                
         
        </ul>
      </div>

      <div class="footer-section contact">
        <h3>Contact Us</h3>
        <!-- <p>123 Luxury Lane, Suite 500<br>Beverly Hills, CA 90210</p> -->
        <p class="contact-item"><strong>Phone:</strong> +254 723142855</p>
        <p class="contact-item"><strong>Email:</strong> njobens750@gmail.com</p>
        
        <!-- Logout Button (only shows when authenticated) -->
        <div v-if="isAuthenticated" class="logout-section">
          <button @click="handleLogout" class="logout-btn">
            <span class="logout-icon">🚪</span> Logout
          </button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} LuxeStays. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #1a1a1a;
  color: #e5e7eb;
  padding: 80px 0 20px 0;
  font-family: 'Poppins', sans-serif;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding: 0 20px;
}

/* Brand Section */

.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.footer-logo span {
  color: #d4af37; /* Matching your Gold theme */
}

.brand-info p {
  line-height: 1.6;
  font-size: 0.95rem;
  color: #a3a3a3;
  margin-bottom: 25px;
}

/* Social Icons */
.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4af37;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #d4af37;
  color: #1a1a1a;
  border-color: #d4af37;
  transform: translateY(-3px);
}

/* Link Sections */
.footer-section h3 {
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 25px;
  position: relative;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 40px;
  height: 2px;
  background-color: #d4af37;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section ul li a {
  color: #a3a3a3;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.footer-section ul li a:hover {
  color: #d4af37;
  padding-left: 5px;
}

/* Contact Section */
.contact p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #a3a3a3;
}

.contact-item {
  margin-top: 10px;
}

/* Logout Section */
.logout-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.logout-btn {
  background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
  color: #1a1a1a;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #b8941f 0%, #d4af37 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.5);
}

.logout-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(212, 175, 55, 0.4);
}

.logout-icon {
  font-size: 1.1rem;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid #333;
  margin-top: 60px;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: #666;
}

/* Responsive Grid */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }

  .logout-section {
    display: flex;
    justify-content: center;
  }

  .logout-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>