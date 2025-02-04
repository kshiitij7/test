<template>
    <div class="LeftSideBar">
        <v-main style="--v-layout-top: 0px;">       
            <v-navigation-drawer rail color="rgb(2, 42, 56)" location="right"></v-navigation-drawer>
    
            <v-navigation-drawer rail color="rgb(2, 42, 56)">
                <v-list>
                    <v-list-item @click="toggleDrawer" class="cursor-pointer">
                        <v-list-item-title>
                            <v-icon>mdi-chart-areaspline</v-icon>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-main>
    
        <v-navigation-drawer v-model="drawer" temporary>
            <v-card elevation="0">
                    <v-card-title>
                        <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Elevation Profile</div>
                    </v-card-title>
                    <v-divider :thickness="2" color="black"></v-divider>
                    <v-card-text>
                        <v-select v-model="elevationProfile" :items="elevationProfileLayers" label="Please Select an Option" required></v-select>
                    </v-card-text>
                </v-card>
                <v-divider :thickness="3"></v-divider>
        </v-navigation-drawer>
    </div>
    </template>
    
    <script>
    
    // import eventBus from '@/event-bus';



    
    export default {
        name: 'LeftBar',
        components: {
          
        },
        data: () => ({
            drawer: false,
        }),
        methods: {
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        },
    };
    </script>
    
    <style scoped>
    /* No changes needed for styling */
    </style>
    