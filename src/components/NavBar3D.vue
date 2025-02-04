<template>
    <v-app-bar app color="white" dark class="button-bar" height="60" elevation="2">
      <v-spacer></v-spacer>
  
      <div v-for="tab in tabs" :key="tab.route">
        <router-link :to="tab.route">
          <v-btn ref="setNavButtons" :class="{ 'active': isActive(tab.route) }">
            <v-icon :icon="tab.icon" size="x-large" style="color: rgb(2, 42, 56);"></v-icon>
            <div style="color: rgb(2, 42, 56); font-family: 'Poppins', sans-serif; font-weight: 500;">
              {{ tab.name }}
            </div>
          </v-btn>
        </router-link>
      </div>
  
  
  
      <v-spacer></v-spacer>
    </v-app-bar>
  </template>
  
  <script>
  import gsap from "gsap";
  
  export default {
    name: "NavBarMain",
    data() {
      return {
       
        navButtons: [], // Store button refs manually
        tabs: [
          { name: "Home", route: "/", icon: "mdi-home" },
          { name: "Ganga Basin", route: "/basin", icon: "mdi-leaf" },
          { name: "Water Quality", route: "/quality", icon: "mdi-water-check" },
          { name: "Flood Hazard", route: "/flood", icon: "mdi-alert" },
          { name: "Solid Waste", route: "/solid", icon: "mdi-recycle" },
          { name: "About", route: "/about", icon: "mdi-information" },
        ],
      };
    },
    methods: {
      isActive(route) {
        return this.$route.path === route;
      },
      setNavButtons(el) {
        if (el) this.navButtons.push(el);
      },
    },
    mounted() {
      this.$nextTick(() => {
        // Select actual button elements from v-btn
        const buttons = this.navButtons.map((btn) => btn.$el.querySelector("button"));
  
        // 🟢 Animate buttons (slide-in effect)
        gsap.from(buttons, {
          duration: 1,
          opacity: 0,
          y: -30,
          stagger: 0.15,
          ease: "power3.out",
        });
  
        // 🟠 Hover animations
        buttons.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(el, { scale: 1.1, rotationX: 10, duration: 0.3 });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(el, { scale: 1, rotationX: 0, duration: 0.3 });
          });
        });
  
        // 🔵 Get actual img element inside v-img
        const gangaImg = this.$refs.gangaLogo.$el.querySelector("img");
  
        if (gangaImg) {
          gangaImg.onload = () => {
            gsap.from(gangaImg, {
              duration: 1,
              opacity: 0,
              scale: 0.8,
              ease: "power3.out",
            });
  
            // 🟣 Bounce effect on click
            gangaImg.addEventListener("click", () => {
              gsap.to(gangaImg, {
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: "bounce.out",
                duration: 0.5,
              });
            });
          };
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .active {
    height: 60px;
    background-color: rgba(2, 42, 56, 0.2);
    font-size: 15px;
  }
  </style>
  