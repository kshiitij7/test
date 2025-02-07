<template>
  <v-main>
    <v-container class="container" fluid :style="{ backgroundImage: `url(${backgroundImage})` }">
      <v-row justify="center">
        <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="3">
          <div @click="flipCard(index)" class="card-wrapper" :class="{ flipped: card.flipped }">
            <div class="card-inner">
              <!-- Front Side with Hover Effect -->
              <v-hover v-slot:default="{ props }">
                <v-card v-bind="props" class="card-wrap card-front">
                  <v-img v-if="card.image" :src="card.image" class="card-bg"></v-img>
                  <v-card-title class="card-info">
                    <div>
                      <h1><v-icon>{{ card.icon }}</v-icon> {{ card.title }}</h1>
                      <p>{{ card.description }}</p>
                    </div>
                  </v-card-title>
                </v-card>
              </v-hover>

              <!-- Back Side -->
              <v-card class="card-wrap card-back">
                <v-card-text class="card-back-info">
                  <p>{{ card.details }}</p>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage: require("@/assets/HomeImages/aboutBack.png"),
      cards: [
        {
          icon: "mdi-leaf",
          title: "Ganga Basin",
          description: "Click to Read More",
          details: "The Ganga Basin is a crucial water source for millions.",
          image: "https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=",
          flipped: false,
        },
        {
          icon: "mdi-water-check",
          title: "Water Quality",
          description: "Click to Read More",
          details: "Water quality monitoring ensures clean and safe water.",
          image: "https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
          flipped: false,
        },
        {
          icon: "mdi-alert",
          title: "Flood Hazard",
          description: "Click to Read More",
          details: "Flood hazards impact infrastructure and ecosystems.",
          image: "https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
          flipped: false,
        },
        {
          icon: "mdi-recycle",
          title: "Solid Waste",
          description: "Click to Read More",
          details: "Proper waste management reduces environmental pollution.",
          image: "https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
          flipped: false,
        },
      ],
    };
  },
  methods: {
    flipCard(index) {
      this.cards[index].flipped = !this.cards[index].flipped;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px 50px;
  display: flex;
  flex-wrap: wrap;
  background-size: cover;
  background-position: center;
}

.card-wrapper {
  perspective: 1000px;
  width: 100%;
  height: 320px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  backface-visibility: hidden;
}

/* Front Card Styling */
.card-front {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-bg {
  opacity: 0.9;
  transition: opacity 0.6s ease-out;
  border-radius: 12px;
}

.card-info {
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(30%);
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-info h1 {
  font-family: "Poppins", sans-serif;
  color: whitesmoke;
  font-size: 25px;
  font-weight: 700;
}

.card-info p {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  opacity: 0;
  color: white;
  text-decoration: underline;
  text-shadow: rgba(black, 1) 0 2px 3px;
}

.card-wrap:hover .card-info {
  transform: translateY(0);
}

.card-wrap:hover .card-info p {
  opacity: 1;
}

/* Back Card Styling */
.card-back {
  transform: rotateY(180deg);
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.card-back-info p {
  font-size: 16px;
  color: #ddd;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-family: "Poppins", sans-serif;
  text-align: justify;
}
</style>
