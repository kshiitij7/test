<template>
<v-main>
    <div class="image-container">
        <!-- Image with slideshow controls -->
        <transition name="fade">
            <v-img :src="images[currentImageIndex]" class="image" :key="currentImageIndex" />
        </transition>

        <!-- Left Arrow Button -->
        <v-btn @click="prevImage" icon class="left-arrow">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <!-- Right Arrow Button -->
        <v-btn @click="nextImage" icon class="right-arrow">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        
        
    </div>
    
</v-main>
</template>

<script>
import CarouselCard from './CarouselCard.vue';

export default {
    name: 'HomePage',
    compnents: {
       CarouselCard,
    },
    data() {
        return {
            images: [
                require('@/assets/HomeImages/1.png'),
                require('@/assets/HomeImages/2.png'),
                // Add more images here...
            ],
            currentImageIndex: 0,

        }
    },

    methods: {
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        },
        startSlideshow() {
            this.interval = setInterval(() => {
                this.nextImage();
            }, 5000);
        },

    },

};
</script>

<style scoped>
.image-container {
    position: relative;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
}

.left-arrow,
.right-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background-color: #022a38;
    color: wheat;
    border-radius: 50%;
    opacity: 0.8;
}

.left-arrow:hover,
.right-arrow:hover {
    opacity: 1;
}

.left-arrow {
    left: .5%;
}

.right-arrow {
    right: .5%;
}

.card {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 2;
    opacity: 0.8;
    background: #ffffff;
}

.card-title {
    font-weight: bold;
}

.dialog-card {
    background: white;
    opacity: 0.9;

}
</style>
