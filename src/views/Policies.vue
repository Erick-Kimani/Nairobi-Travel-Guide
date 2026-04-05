<template>
  <div class="policies-page">

    <!-- Decorative background blobs -->
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <!-- Hero -->
    <div class="hero">
      <div class="hero-inner">
        <span class="badge">Legal &amp; Community Guidelines</span>
        <h1>Terms &amp; <em>Policies</em></h1>
        <p class="hero-sub">
          Nairobi Travel Guide is built on trust — between explorers, businesses, and the city itself.
          These guidelines keep that trust intact for everyone.
        </p>
        <div class="meta">
          
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-map-card">
          <div class="map-dot pulse"></div>
          <div class="map-lines">
            <div class="ml ml1"></div>
            <div class="ml ml2"></div>
            <div class="ml ml3"></div>
          </div>
          <p class="map-label">Nairobi, Kenya</p>
          <p class="map-sub">Your city guide</p>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-wrapper">
      <div class="nav-pills">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="pill"
          :class="[{ active: activeTab === tab.id }, `pill-${tab.id}`]"
          @click="activeTab = tab.id"
        >
          <span class="pill-icon">{{ tab.icon }}</span>
          <span class="pill-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-area">

      <!-- GENERAL TERMS -->
      <div v-if="activeTab === 'general'" class="section">
        <div class="section-intro">
          <div class="intro-icon">🌐</div>
          <h4>
            These general terms apply to <strong><u>everyone</u></strong> who interacts with Nairobi Travel Guide —
            tourists, returning visitors, and business owners alike. By using the platform, you agree to what's outlined here.
          </h4>
        </div>

        <div class="cards-grid">
          <div class="policy-card card-green">
            <div class="card-header">
              <span class="card-icon">🌍</span>
              <h3>About This Platform</h3>
            </div>
            <h4>1.Nairobi Travel Guide is a travel and discovery platform designed to help new tourists explore Nairobi, Kenya. We provide curated recommendations for hotels, lounges, restaurants, and experiences across the city.</h4>
            <br>
            <h4>2.The platform is managed by our administrator team, who maintain content accuracy, approve listings, and ensure a welcoming environment for all.</h4>
          </div>

          <div class="policy-card card-green">
            <div class="card-header">
              <span class="card-icon">🔄</span>
              <h3>Platform Updates</h3>
            </div>
            <h4>Our administrators may update features, content, and policies to keep things relevant and accurate. When significant changes are made, you'll be notified.</h4>
            <div class="card-note">Changes to listings, categories, or features are at our admin team's discretion — always in the interest of a better experience.</div>
          </div>

          <div class="policy-card card-green">
            <div class="card-header">
              <span class="card-icon">🔒</span>
              <h3>Your Data &amp; Privacy</h3>
            </div>
            <h4>No personal or business data is disclosed to the public or any third party without your consent. Your information is used solely to operate and improve Nairobi Travel Guide.</h4>
            <ul>
              <li>No user data is sold or shared for advertising.</li>
              <li>Manager information only appears in approved listings.</li>
              <li>We apply industry-standard security practices.</li>
            </ul>
          </div>

          <div class="policy-card card-green highlight-card">
            <div class="card-header">
              <span class="card-icon">💳</span>
              <h3>Payments &amp; Transactions</h3>
            </div>
            <h4>Nairobi Travel Guide does not collect payments from tourists or users. All financial transactions happen directly between the traveller and the hotel or lounge manager.</h4>
            <div class="card-note">We are strictly a discovery platform — not a booking agent or payment processor. Payment disputes are handled between guests and businesses directly.</div>
          </div>

          <div class="policy-card card-green">
            <div class="card-header">
              <span class="card-icon">⚖️</span>
              <h3>Acceptable Use</h3>
            </div>
            <h4>We want this to be a respectful, inclusive community. Everyone is expected to:</h4>
            <ul>
              <li>Provide accurate information on accounts and listings.</li>
              <li>Avoid false reviews, misleading content, or spam.</li>
              <li>Treat other users, businesses, and staff with respect.</li>
              <li>Not attempt to manipulate or misuse the platform.</li>
            </ul>
          </div>

          <div class="policy-card card-green">
            <div class="card-header">
              <span class="card-icon">📬</span>
              <h3>Contact &amp; Support</h3>
            </div>
            <p>Have a question, concern, or feedback? We're here for you. Reach out at <strong class="email-link"><u>njobens@gmail.com</u></strong> and we'll respond as quickly as we can.</p>
          </div>
        </div>
      </div>

      <!-- TOURISTS / USERS -->
      <div v-if="activeTab === 'users'" class="section">
        <div class="user-hero user-hero-blue">
          <div class="uh-text">
            <span class="uh-role">For Visitors &amp; Tourists</span>
            <h2>Explore freely.<br /><em>No hidden strings.</em></h2>
            <p>Everything here is tailored for anyone discovering Nairobi as a traveller — first-time or returning.</p>
          </div>
          <div class="uh-icon">🧳</div>
        </div>

        <div class="cards-grid">
          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">🙌</span>
              <h3>Your Experience</h3>
            </div>
            <h4>Nairobi Travel Guide is <strong><u>completely free to use.</u></strong> Explore destinations, discover hotels, browse lounges, and get travel tips — all at no cost. Every visitor deserves a great start, regardless of budget.</h4>
          </div>

          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">📋</span>
              <h3>Creating an Account</h3>
            </div>
            <h4>To access personalised features, you may create an account. Here's what to expect:</h4>
            <ul>
              <li>A valid email address and display name are required.</li>
              <li>Your account information stays private — never shared.</li>
              <li>We prioritize the security of your account and implement measures to protect your information. You are also encouraged to keep your login credentials confidential and notify us immediately of any unauthorized access or suspected security concerns.</li>
            </ul>
          </div>

          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">⭐</span>
              <h3>Leaving Reviews</h3>
            </div>
            <h4>Your honest opinions help other travellers make great choices. When reviewing:</h4>
            <ul>
              <li>Share your genuine experience — positive or constructive.</li>
              <li>Don't use reviews to target individuals or spread misinformation.</li>
              <li>Reviews violating community standards may be removed.</li>
            </ul>
            <div class="card-note">Fake or incentivised reviews violate our guidelines. Repeat offences may result in account removal.</div>
          </div>

          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">💬</span>
              <h3>Interacting with Listings</h3>
            </div>
            <h4>Listings are managed by hotel and lounge managers. When contacting a business through our platform:</h4>
            <ul>
              <li>All bookings and payments are handled directly with the business.</li>
              <li>We connect users and businesses, and while disputes between them are independent of us, we remain committed to fairness and will help where we reasonably can.</li>
              <li>Had a bad experience? Report the listing so we can review it.</li>
            </ul>
          </div>

          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">🛡️</span>
              <h3>Your Safety</h3>
            </div>
            <h4>Your safety matters to us. While we verify businesses on the platform, we also encourage you to:</h4>
            <ul>
              <li>Research destinations independently before visiting.</li>
              <li>Follow local guidelines and advisories in Nairobi.</li>
              <li>Report suspicious or inaccurate content to our team.</li>
            </ul>
          </div>

          <div class="policy-card card-blue">
            <div class="card-header">
              <span class="card-icon">🚪</span>
              <h3>Guest & User Access</h3>
            </div>
            <h4>You're welcome to browse and explore as a guest at any time. However, registered users enjoy enhanced features, personalized recommendations, and a richer overall experience. Sign up to get the most out of what we offer.</h4>
          </div>
        </div>
      </div>

      <!-- MANAGERS -->
      <div v-if="activeTab === 'managers'" class="section">
        <div class="user-hero user-hero-amber">
          <div class="uh-text">
            <span class="uh-role">For Hotel &amp; Lounge Managers</span>
            <h2>List your venue.<br /><em>Reach real travellers.</em></h2>
            <p>These terms outline your rights and responsibilities as a business on Nairobi Travel Guide.</p>
          </div>
          <div class="uh-icon">🏨</div>
        </div>

        <div class="cards-grid">
          <div class="policy-card card-amber">
            <div class="card-header">
              <span class="card-icon">📝</span>
              <h3>Registering Your Business</h3>
            </div>
            <h4>To list your hotel or lounge, apply for a Manager account via gmail. Our admin team reviews all applications before approval to maintain listing quality.</h4>
            <ul>
              <li>Provide accurate and current information about your property.</li>
              <li>False claims will result in listing removal and possible suspension.</li>
              <li>You're responsible for keeping your listing up to date.</li>
            </ul>
          </div>

          <div class="policy-card card-amber highlight-card">
            <div class="card-header">
              <span class="card-icon">💰</span>
              <h3>Payments &amp; Fees</h3>
            </div>
            <h4>We charge hotels, lounges, and other listed service providers for use of our platform. However, we offer a complimentary trial period to allow managers to evaluate the application and determine whether they wish to continue using our services.</h4>
           
            <div class="card-note">Service fees are negotiated and mutually agreed upon with hotel/lounge managers. All pricing is stated openly prior to any engagement, ensuring clarity and shared understanding between all parties..</div>
          </div>

          <div class="policy-card card-amber">
            <div class="card-header">
              <span class="card-icon">🖼️</span>
              <h3>Listing Standards</h3>
            </div>
            <h4>Your listing represents your brand. All listings must meet our content standards:</h4>
            <ul>
              <li>Photos must accurately reflect your venue — no misleading stock images.</li>
              <li>Pricing and services should be truthful and regularly updated.</li>
              <li>Promotional language is welcome, but must never mislead guests.</li>
              <li>Our admin team may edit or remove content that doesn't meet guidelines.</li>
            </ul>
          </div>

          <div class="policy-card card-amber">
            <div class="card-header">
              <span class="card-icon">⭐</span>
              <h3>Reviews &amp; Guest Feedback</h3>
            </div>
            <h4>Reviews come from verified platform users. Businesses may not manipulate, remove, or inflate reviews.</h4>
            <ul>
              <li>Respond professionally to reviews via your manager dashboard.</li>
              <li>Flag potentially fraudulent reviews for admin review.</li>
              <li>Negative reviews are not removed unless they violate community standards.</li>
            </ul>
          </div>

          <div class="policy-card card-amber">
            <div class="card-header">
              <span class="card-icon">🔐</span>
              <h3>Confidentiality</h3>
            </div>
            <h4>Business data you share — contact details, operational info, verification documents — is treated with strict confidentiality.</h4>
            <ul>
              <li>Your data is never shared with third parties or competitors.</li>
              <li>Only public-listing content is visible to users.</li>
              <li>Admin staff access data only for account management purposes.</li>
            </ul>
          </div>

          <div class="policy-card card-amber">
            <div class="card-header">
              <span class="card-icon">🤝</span>
              <h3>Our Commitment to You</h3>
            </div>
            <span>We're invested in your success. A well-listed venue means more happy tourists — and a thriving city. We're here to help you grow your visibility. Reach us at <strong class="email-link">managers@nairobiguide.app</strong>.</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div class="footer-inner">
        <div class="footer-logo">
          <span class="footer-logo-dot"></span>
          Nairobi Travel Guide
        </div>
        <p class="footer-text">Last updated April 2026 &nbsp;·&nbsp; By using this platform, you agree to these terms. We're glad you're here. 🌿</p>
        <p class="footer-contact">Questions? <a href="mailto:hello@nairobiguide.app">njobens@gmail.com</a></p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PoliciesPage',
  data() {
    return {
      activeTab: 'general',
      tabs: [
        { id: 'general',  icon: '🌐', label: 'General Terms' },
        { id: 'users',    icon: '🧳', label: 'Visitors & Tourists' },
        { id: 'managers', icon: '🏨', label: 'Hotel & Lounge Managers' },
      ],
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Page shell ──────────────────────────────────── */
.policies-page {
  font-family: 'Nunito', sans-serif;
  background: #faf7f2;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* ── Soft ambient blobs ──────────────────────────── */
.bg-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
}
.blob-1 { width: 520px; height: 520px; background: #a8d5b5; top: -140px; right: -120px; }
.blob-2 { width: 400px; height: 400px; background: #f4c97e; bottom: 10%; left: -130px; }
.blob-3 { width: 300px; height: 300px; background: #aec6f0; top: 42%; right: 5%;  }

/* ── Hero ────────────────────────────────────────── */
.hero {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 4rem 5vw 3rem;
  
  /* Image Implementation */
  background-image: url('/images/Nairobi-Kenyas-Capital-Cityscapes-Skylines-By-Antony-Trivet-Travel-Photographers-16.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  border-radius: 0 0 36px 36px;
  overflow: hidden;
}

/* subtle dot-grid texture */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1.5'/%3E%3Ccircle cx='27' cy='7' r='1.5'/%3E%3Ccircle cx='47' cy='7' r='1.5'/%3E%3Ccircle cx='7' cy='27' r='1.5'/%3E%3Ccircle cx='27' cy='27' r='1.5'/%3E%3Ccircle cx='47' cy='27' r='1.5'/%3E%3Ccircle cx='7' cy='47' r='1.5'/%3E%3Ccircle cx='27' cy='47' r='1.5'/%3E%3Ccircle cx='47' cy='47' r='1.5'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-inner { position: relative; flex: 1; max-width: 560px; }

.badge {
  display: inline-block;
  background: rgba(255,255,255,0.12);
  color: #a8e6c0;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(224, 228, 226, 0.3);
  margin-bottom: 1.1rem;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
 font-size: clamp(2.4rem, 5.5vw, 3.6rem);
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 3rem;
  font-weight: 700;
}
.hero h1 em { font-style: italic; color: #000000; }

.hero-sub {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.952);
  line-height: 1.50;
  max-width: 480px;
  margin-bottom: 1.9rem;
  font-weight: 300;
}

.meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }

.meta-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.911);
  font-weight: 400;
}

.meta-divider {
  width: 4px; height: 4px;
  background: rgba(255,255,255,0.25);
  border-radius: 50%;
}

/* ── Hero visual card ────────────────────────────── */
.hero-visual { position: relative; flex-shrink: 0; }

.hero-map-card {
  width: 180px;
  height: 180px;
  background: rgba(255,255,255,0.09);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 1.5rem 1.25rem;
  backdrop-filter: blur(6px);
  text-align: center;
}

.map-dot {
  width: 14px; height: 14px;
  background: #7dd6a8;
  border-radius: 80%;
  margin: 0 auto 1rem;
  position: relative;
}

.map-dot.pulse::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid #7dd6a8;
  opacity: 2.0;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%   { transform: scale(0.8); opacity: 0.6; }
  70%  { transform: scale(1.6); opacity: 0;   }
  100% { transform: scale(0.8); opacity: 0;   }
}

.map-lines { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1rem; }
.ml { height: 4px; background: rgba(255,255,255,0.15); border-radius: 4px; }
.ml1 { width: 100%; }
.ml2 { width: 75%;  }
.ml3 { width: 55%;  }

.map-label { font-size: 13px; color: #fff; font-weight: 700; }
.map-sub   { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 3px; }

/* ── Tab Navigation ──────────────────────────────── */
.tabs-wrapper {
  position: relative;
  z-index: 2;
  padding: 1.8rem 5vw 0;
}

.nav-pills { display: flex; gap: 10px; flex-wrap: wrap; }

.pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid #ddd4c6;
  color: #7a6e63;
  background: #fff;
  transition: all 0.2s ease;
  font-family: 'Nunito', sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.pill:hover { transform: translateY(-2px); box-shadow: 0 5px 16px rgba(0,0,0,0.09); }
.pill-icon  { font-size: 15px; }

.pill-general.active  { background: #1e4a36; color: #fff; border-color: #1e4a36; box-shadow: 0 4px 16px rgba(30,74,54,0.28); }
.pill-users.active    { background: #1a4070; color: #fff; border-color: #1a4070; box-shadow: 0 4px 16px rgba(26,64,112,0.28); }
.pill-managers.active { background: #7c4a10; color: #fff; border-color: #7c4a10; box-shadow: 0 4px 16px rgba(124,74,16,0.28); }

/* ── Content Area ────────────────────────────────── */
.content-area {
  position: relative;
  z-index: 1;
  padding: 2rem 5vw 1rem;
}

/* ── Section intro strip ─────────────────────────── */
.section-intro {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ede6db;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.intro-icon { font-size: 26px; flex-shrink: 0; margin-top: 2px; }

.section-intro p   { font-size: 14.5px; color: #5a5347; line-height: 1.75; }
.section-intro strong { color: #1e4a36; }

/* ── User hero banners ───────────────────────────── */
.user-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.user-hero-blue  { background: linear-gradient(130deg, #1a3d6b 0%, #2660a4 100%); }
.user-hero-amber { background: linear-gradient(130deg, #6b3210 0%, #b85a1a 100%); }

.uh-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.5rem;
}

.user-hero h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: #fff;
  line-height: 1.25;
  margin-bottom: 0.6rem;
}
.user-hero h2 em { font-style: italic; color: rgba(255,255,255,0.65); }

.user-hero p {
  font-size: 13.5px;
  color: rgba(255,255,255,0.65);
  line-height: 1.65;
  font-weight: 300;
  max-width: 380px;
}

.uh-icon { font-size: 52px; flex-shrink: 0; opacity: 0.85; }

/* ── Cards grid ──────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
}

.policy-card {
  background: #fdc781;
  border-radius: 18px;
  padding: 1.4rem 1.5rem;
  border: 1px solid #ede6db;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.policy-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.09);
}

.highlight-card { grid-column: span 2; }

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.9rem;
  padding-bottom: 0.75rem;
}

.card-green .card-header { border-bottom: 2px solid #d4efe2; }
.card-blue .card-header  { border-bottom: 2px solid #cfe0f5; }
.card-amber .card-header { border-bottom: 2px solid #f5dec8; }

.card-icon {
  font-size: 18px;
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-green .card-icon { background: #e8f7ef; }
.card-blue .card-icon  { background: #e3eef9; }
.card-amber .card-icon { background: #fdf0e0; }

.card-header h3 { font-size: 15px; font-weight: 700; color: #1e1a16; }

.policy-card p {
  font-size: 13.5px;
  color: #63584e;
  line-height: 1.75;
  margin-bottom: 0.6rem;
}
.policy-card p:last-child { margin-bottom: 0; }

.policy-card ul { padding-left: 0; margin-top: 0.4rem; list-style: none; }

.policy-card ul li {
  font-size: 13.5px;
  color: #63584e;
  line-height: 1.75;
  margin-bottom: 0.15rem;
  padding-left: 1.1rem;
  position: relative;
}

.policy-card ul li::before {
  content: '›';
  position: absolute;
  left: 0;
  font-weight: 800;
  font-size: 15px;
  line-height: 1.6;
}

.card-green ul li::before { color: #1D9E75; }
.card-blue ul li::before  { color: #2660a4; }
.card-amber ul li::before { color: #b85a1a; }

.card-note {
  margin-top: 0.75rem;
  border-radius: 10px;
  padding: 0.65rem 0.9rem;
  font-size: 12.5px;
  line-height: 1.65;
  font-weight: 500;
}

.card-green .card-note { background: #e8f7ef; color: #1a5c3a; }
.card-blue .card-note  { background: #e3eef9; color: #1a3d6b; }
.card-amber .card-note { background: #fdf0e0; color: #6b3210; }

.policy-card strong { color: #1e1a16; font-weight: 700; }
.email-link { color: #1D9E75; }
.card-blue .email-link  { color: #2660a4; }
.card-amber .email-link { color: #b85a1a; }

/* ── Footer ──────────────────────────────────────── */
.page-footer {
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  padding: 0 5vw 2.5rem;
}

.footer-inner {
  background-image: url('/images/Nairobi-Kenyas-Capital-Cityscapes-Skylines-By-Antony-Trivet-Travel-Photographers-16.jpg');
  border-radius: 24px;
  padding: 2rem 2.5rem;
  text-align: center;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.footer-logo-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #7dd6a8;
}

.footer-text    { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 0.4rem; }
.footer-contact { font-size: 13px; color: rgba(255,255,255,0.4); }
.footer-contact a { color: #7dd6a8; text-decoration: none; font-weight: 700; }
.footer-contact a:hover { text-decoration: underline; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 680px) {
  .hero         { flex-direction: column; padding: 2.5rem 1.25rem 2rem; border-radius: 0 0 24px 24px; }
  .hero-visual  { display: none; }
  .highlight-card { grid-column: span 1; }
  .user-hero    { flex-direction: column; text-align: center; padding: 1.5rem; }
  .user-hero p  { max-width: 100%; }
  .uh-icon      { font-size: 40px; }
  .nav-pills    { flex-direction: column; }
  .pill         { width: 100%; justify-content: center; }
  .footer-inner { padding: 1.5rem 1.25rem; }
}

@media (max-width: 480px) {
  .tabs-wrapper, .content-area { padding-left: 1rem; padding-right: 1rem; }
  .cards-grid  { grid-template-columns: 1fr; }
  .page-footer { padding-left: 1rem; padding-right: 1rem; }
}
</style>