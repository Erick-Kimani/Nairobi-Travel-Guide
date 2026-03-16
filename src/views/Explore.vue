<template>
  <div class="explore-kenya">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=85&fit=crop"
          alt="Kenya landscape"
          class="hero-img"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-eyebrow">Discover the Heart of Africa</p>
        <h1 class="hero-title">Kenya Awaits</h1>
        <p class="hero-sub">
          From sun-scorched savannas to the turquoise Indian Ocean — explore Kenya's most
          breathtaking destinations and the wild stories they hold.
        </p>
        <a href="#destinations" class="hero-cta">Begin the Journey</a>
      </div>
      <div class="hero-scroll-hint">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Intro Bar -->
    <div class="intro-bar">
      <div class="intro-stat" v-for="stat in stats" :key="stat.label">
        <span class="stat-num">{{ stat.num }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Destinations -->
    <section id="destinations" class="destinations">
      <div class="section-header">
        <span class="section-tag">Top Destinations</span>
        <h2 class="section-title">Kenya's Finest</h2>
      </div>

      <div
        v-for="(dest, i) in destinations"
        :key="dest.id"
        :id="dest.id"
        class="destination-block"
        :class="{ reverse: i % 2 !== 0 }"
      >
        <!-- Image Grid -->
        <div class="dest-images">
          <div class="img-main-wrap">
            <img :src="dest.images[0]" :alt="dest.name" class="img-main" loading="lazy" />
            <div class="img-badge">{{ dest.badge }}</div>
          </div>
          <div class="img-secondary-grid">
            <img
              v-for="(img, idx) in dest.images.slice(1)"
              :key="idx"
              :src="img"
              :alt="dest.name + ' ' + (idx + 2)"
              class="img-secondary"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Text -->
        <div class="dest-text">
          <span class="dest-tag">{{ dest.region }}</span>
          <h2 class="dest-name">{{ dest.name }}</h2>
          <p class="dest-intro">{{ dest.intro }}</p>
          <div class="dest-divider"></div>
          <p class="dest-detail">{{ dest.detail }}</p>

          <div class="dest-highlights">
            <div class="highlight" v-for="h in dest.highlights" :key="h.label">
              <span class="highlight-icon">{{ h.icon }}</span>
              <div>
                <span class="highlight-label">{{ h.label }}</span>
                <span class="highlight-val">{{ h.value }}</span>
              </div>
            </div>
          </div>

          <div class="best-time">
            <span class="best-time-icon">🗓</span>
            <span><strong>Best Time to Visit:</strong> {{ dest.bestTime }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Scenic Views -->
    <section class="scenic-grid-section">
      <div class="section-header">
        <span class="section-tag">Hidden Gems</span>
        <h2 class="section-title">More Kenya to Explore</h2>
        <p class="section-desc">
          Beyond the famous parks, Kenya hides extraordinary landscapes waiting to be discovered.
        </p>
      </div>
      <div class="scenic-grid">
        <div class="scenic-card" v-for="gem in hiddenGems" :key="gem.name">
          <div class="scenic-img-wrap">
            <img :src="gem.image" :alt="gem.name" loading="lazy" />
            <div class="scenic-overlay">
              <p class="scenic-desc">{{ gem.desc }}</p>
            </div>
          </div>
          <div class="scenic-info">
            <h3>{{ gem.name }}</h3>
            <p>{{ gem.tagline }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Travel Tips -->
    <section class="tips-section">
      <div class="tips-bg">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80&fit=crop"
          alt="Kenya wildlife"
        />
        <div class="tips-overlay"></div>
      </div>
      <div class="tips-content">
        <span class="section-tag light">Practical Info</span>
        <h2 class="tips-title">Before You Go</h2>
        <div class="tips-grid">
          <div class="tip-card" v-for="tip in travelTips" :key="tip.title">
            <span class="tip-icon">{{ tip.icon }}</span>
            <h4>{{ tip.title }}</h4>
            <p>{{ tip.text }}</p>
          </div>
        </div>

        <!-- Blog CTA -->
        <div class="tips-blog-cta">
          <p>
            Planning your first trip to Kenya? Our blog covers everything you need to know —
            from visa requirements and health precautions to currency tips and the best time
            to visit. We've done the research so you don't have to.
          </p>
          <router-link to="/blog" class="tips-blog-btn">
            Read the Full Kenya Travel Guide
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="explore-footer">
      <p>🌍 Explore Kenya — Where Every Landscape Tells a Story</p>
    </footer>
  </div>
</template>

<script>
import '@/assets/explore.css'

export default {
  name: 'ExploreKenya',
  data() {
    return {
      stats: [
        { num: '58+', label: 'National Parks & Reserves' },
        { num: '67', label: 'Wildlife Species' },
        { num: '536 km', label: 'Stunning Coastline' },
        { num: '1.5M+', label: 'Visitors Yearly' },
      ],

      destinations: [
        {
          id: 'nairobi',
          name: 'Nairobi',
          region: 'Central Kenya',
          badge: 'Capital City',
          intro:
            'The only city in the world with a national park on its doorstep — Nairobi blends cosmopolitan energy with raw wilderness in a way found nowhere else on Earth.',
          detail:
            "Nairobi National Park sits just 7 km from the CBD, where lions roam against a backdrop of city skyscrapers. Beyond the park, the David Sheldrick Wildlife Trust offers intimate encounters with orphaned elephants, while the Giraffe Centre lets you hand-feed endangered Rothschild giraffes. The city's Karen Blixen Museum, vibrant Maasai Market, and bustling Carnivore Restaurant complete an experience that is uniquely Nairobi.",
          highlights: [
            { icon: '🦁', label: 'Nairobi National Park', value: '117 km² of wilderness' },
            { icon: '🐘', label: 'David Sheldrick Trust', value: 'Elephant orphan sanctuary' },
            { icon: '🦒', label: 'Giraffe Centre', value: 'Rothschild giraffes up close' },
          ],
          bestTime: 'Year-round; dry seasons (Jan–Feb, Jul–Oct) for wildlife',
          images: [
            'public/images/nairobi-national-park-main-gate.jpeg',
            'public/images/baby-elephant-walking-herd.jpg',
            'public/images/Picture 22 .jpg',
          ],
        },
        {
          id: 'mombasa',
          name: 'Mombasa',
          region: 'Kenya Coast',
          badge: 'Ocean Paradise',
          intro:
            'A sun-soaked island city where Swahili culture, ancient Arab trade routes, and powdery white beaches create an intoxicating blend of history and paradise.',
          detail:
            "Mombasa's Old Town is a labyrinth of carved wooden doors and coral-stone architecture reflecting centuries of Arab, Persian, and Portuguese influence. Fort Jesus, a UNESCO World Heritage Site, guards the harbor with imposing 16th-century walls. Just north and south of the city stretch some of Africa's most spectacular beaches — Diani, Watamu, and Bamburi — where the warm Indian Ocean laps against fine white sand and vibrant coral reefs teem with marine life.",
          highlights: [
            { icon: '🏰', label: 'Fort Jesus', value: 'UNESCO World Heritage Site' },
            { icon: '🏖', label: 'Diani Beach', value: "Ranked among Africa's finest" },
            { icon: '🐠', label: 'Marine Parks', value: 'World-class snorkeling & diving' },
          ],
          bestTime: 'October – March (dry & warm coast season)',
          images: [
            'public/images/Fort Jesus.jpg',
            'public/images/Mombasa.jpg',
            'public/images/marine-park-mombasa.jpg',
          ],
        },
        {
          id: 'masai-mara',
          name: 'Maasai Mara',
          region: 'Rift Valley',
          badge: 'Safari Capital',
          intro:
            'The Great Wildebeest Migration — 1.5 million animals thundering across open plains — earns the Maasai Mara its title as the greatest wildlife spectacle on Earth.',
          detail:
            "Stretching across 1,510 km² of golden savanna, the Maasai Mara National Reserve is Kenya's crown jewel of wildlife. Year-round game drives reveal the Big Five with remarkable frequency. From July to October, the legendary Wildebeest Migration pours across the Mara River in heart-stopping crossings. Hot-air balloon safaris at dawn offer a cinematic perspective, floating silently above herds of elephants while the sky blushes pink. The Maasai people, inseparable from this land, welcome visitors into their manyattas with extraordinary warmth.",
          highlights: [
            { icon: '🦓', label: 'Great Migration', value: '1.5M wildebeest, Jul–Oct' },
            { icon: '🦁', label: 'Big Five', value: 'Lions, leopards, elephants & more' },
            { icon: '🎈', label: 'Balloon Safari', value: 'Dawn flights over the plains' },
          ],
          bestTime: 'July – October for the Great Migration',
          images: [
            'public/images/Picture 18 .jpg',
            'public/images/Picture 19 .jpg',
            'public/images/Hotair balloon.jpg',
          ],
        },
        {
          id: 'amboseli',
          name: 'Amboseli',
          region: 'Southern Kenya',
          badge: 'Land of Giants',
          intro:
            "Beneath the perpetual snow of Mount Kilimanjaro, Amboseli's elephant herds roam ancient seasonal floodplains, creating the most iconic imagery in all of African photography.",
          detail:
            "Amboseli National Park is famous for more than elephants — it is famous for elephants with the world's most photographed mountain as their backdrop. The park's swamps, fed by underground Kilimanjaro glaciers, draw enormous concentrations of wildlife to open plains and acacia woodland. Amboseli is also one of the best places in Africa to observe elephant behavior up close; decades of research have made these herds remarkably relaxed around vehicles, allowing truly intimate encounters. Over 400 bird species and spectacular views of Africa's highest peak complete the picture.",
          highlights: [
            { icon: '🐘', label: 'Elephant Herds', value: 'Largest free-roaming populations' },
            { icon: '🏔', label: 'Mount Kilimanjaro', value: "5,895m — Africa's highest" },
            { icon: '🐦', label: 'Bird Life', value: '400+ species recorded' },
          ],
          bestTime: 'June – October & January – February',
          images: [
            'public/images/Herd of Elephants.jpg',
            'public/images/Mount Kilimanjaro.jpg',
            'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=600&q=80&fit=crop',
          ],
        },
        {
          id: 'Nakuru',
          name: 'Lake Nakuru & Flamingos',
          region: 'Great Rift Valley',
          badge: 'Flamingo Lake',
          intro:
            'A saline jewel in the Rift Valley floor, Lake Nakuru turns rose-pink at dawn as tens of thousands of lesser flamingos wade its shallow shores in mesmerizing formations.',
          detail:
            "Located in the Great Rift Valley, the alkaline Lake Nakuru sits at approximately 1,754 meters (5,755 ft), surrounded by acacia woodland and yellow-barked fever trees. Though water levels have fluctuated in recent years—sometimes driving populations to nearby lakes—lesser flamingos still congregate in significant numbers to feed on the lake's algae, often creating a brilliant pink edge. While boat rides are now available in specific sections of Lake Nakuru National Park, the primary hippo-watching boat safaris are usually associated with the neighboring freshwater Lake Naivasha. Nearby Crescent Island Game Sanctuary (on Lake Naivasha) provides an intimate walking safari experience among zebra, giraffe, and waterbuck. Just a short distance from Naivasha Hell's Gate National Park offers a unique opportunity to cycle or hike past dramatic gorges and geothermal steam vents, providing a completely different, rugged Kenyan experience within the same rift valley landscape.",
          highlights: [
            { icon: '🦩', label: 'Lesser Flamingos', value: 'Tens of thousands year-round' },
            { icon: '🦛', label: 'Hippo Pods', value: 'Boat safaris on the lake' },
            { icon: '🚴', label: "Hell's Gate", value: 'Cycle safaris through gorges' },
          ],
          bestTime: 'November – April for peak flamingo numbers',
          images: [
            'public/images/Lake Nakuru.jpg',
            'public/images/hippo-family-river.jpg',
            'public/images/Hells-gate.jpg',
          ],
        },
      ],

      hiddenGems: [
        {
          name: 'Samburu National Reserve',
          tagline: "Northern Kenya's rare species haven",
          desc: "Home to the rare \"Northern Special Five\" — Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx.",
          image: 'public/images/Beisa Oryx.jpg',
        },
        {
          name: 'Tsavo National Parks',
          tagline: "Kenya's largest wilderness",
          desc: 'Two vast parks — Tsavo East & West — covering over 20,000 km² with red-dust elephants, volcanic landscapes, and the Ngulia Hills.',
          image: 'public/images/Elephant.jpg',
        },
        {
          name: 'Mount Kenya',
          tagline: "Africa's second highest peak",
          desc: 'A UNESCO World Heritage Site with glaciers, alpine meadows, and challenging trekking routes through its three main summits.',
          image: 'public/images/Mt.Kenya.jpg',
        },
        {
          name: 'Watamu & Malindi',
          tagline: 'Pristine northern coast gems',
          desc: "Marine National Parks with whale sharks, sea turtles, and some of East Africa's most untouched coral reefs.",
          image: 'public/images/underwater-turtle-swimming-coral-reef (1).jpg',
        },
        {
          name: 'Lake Nakuru',
          tagline: 'Rhino & flamingo sanctuary',
          desc: "A soda lake famous for flamingo flocks and one of Kenya's best places to spot both black and white rhino.",
          image: 'public/images/Lake Nakuru.jpg',
        },
        {
          name: "Hell's Gate",
          tagline: 'Walk among the wildlife',
          desc: "Unique gorges and geothermal features in a park where you can cycle and hike without a vehicle — one of Kenya's most adventurous experiences.",
          image: 'public/images/Hells-gate.jpg',
        },
      ],

      travelTips: [
        {
          icon: '✈️',
          title: 'Getting Here',
          text: "Jomo Kenyatta International Airport in Nairobi serves major international routes. Mombasa's Moi Airport handles coastal arrivals.",
        },
        {
          icon: '🛂',
          title: 'Visa & Entry',
          text: 'Kenya operates an eVisa system. Apply online before travel at evisa.go.ke. East African citizens enjoy visa-free entry.',
        },
        {
          icon: '💉',
          title: 'Health',
          text: 'Yellow fever vaccination is required from countries with risk. Malaria prophylaxis is recommended. Travel insurance is essential.',
        },
        {
          icon: '🇰🇪',
          title: 'Currency',
          text: 'Kenyan Shilling (KES). USD is widely accepted in tourist areas. ATMs available in major towns. Mpesa mobile money is universal.',
        },
        {
          icon: '🌡️',
          title: 'Climate',
          text: 'Kenya has two rainy seasons (Mar–May, Oct–Dec). The coast is tropical year-round. Highlands can be cool — bring layers.',
        },
        {
          icon: '🦟',
          title: 'Safety',
          text: 'Follow park rules, use reputable operators, and stay in designated areas. Kenya is welcoming — respect local customs and wildlife distances.',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Blog CTA block inside Travel Tips section */
.tips-blog-cta {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.tips-blog-cta p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.75;
  margin: 0;
}

.tips-blog-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ff9800;
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.tips-blog-btn:hover {
  background: #ffb74d;
  transform: translateY(-2px);
}

.tips-blog-btn svg {
  transition: transform 0.2s ease;
}

.tips-blog-btn:hover svg {
  transform: translateX(4px);
}
</style>