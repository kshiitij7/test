<template>
    <div class="LeftSideBar">
        <v-main style="--v-layout-top: 0px;">
            <v-app-bar color="rgb(2, 42, 56)" height="140" elevation="0"></v-app-bar>
            <v-navigation-drawer rail color="rgb(2, 42, 56)" location="right"></v-navigation-drawer>
    
            <v-navigation-drawer rail color="rgb(2, 42, 56)">
                <v-list>
                    <v-list-item @click="toggleDrawer" class="cursor-pointer">
                        <v-list-item-title>
                            <v-icon>mdi-compare</v-icon>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-main>
    
        <v-navigation-drawer v-model="drawer" temporary>
            <v-card elevation="0">
                <v-card-text>
                    <v-title>
                        <div class="text-h8 font-weight-bold">Left Side</div>
                    </v-title>
                    <v-select v-model="leftSelect" :items="months" label="Please Select a Layer" @change="validateSelection"></v-select>
                    <v-title>
                        <div class="text-h8 font-weight-bold">Right Side</div>
                    </v-title>
                    <v-select v-model="rightSelect" :items="months" label="Please Select a Layer" @change="validateSelection"></v-select>
                    <v-btn  :disabled="!isBothSelected || showError" :color="comparisonStarted ? 'red' : 'green'" @click="toggleComparison">{{ comparisonStarted ? 'Disable Compare' : 'Compare' }} </v-btn>
                    <div v-if="showError" style="font-size: 15px; color: red; margin-top: 20px;">Please Select Different Layers.</div>
                </v-card-text>
            </v-card>
        </v-navigation-drawer>
    </div>
    </template>
    
    <script>
    import eventBus from '@/event-bus';
    
    export default {
        name: 'LeftBar',
        data: () => ({
            drawer: false,
            leftSelect: null,
            rightSelect: null,
            months: ["Evapotranspiration", "Precipitation"],
            comparisonStarted: false, 
        }),
        computed: {
            isBothSelected() {
                return this.leftSelect && this.rightSelect;
            },
            showError() {
                return this.leftSelect === this.rightSelect;
            },
        },
        methods: {
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
            validateSelection() {
                this.showError = this.leftSelect === this.rightSelect;
            },
            toggleComparison() {
                if (!this.comparisonStarted) {
                    if (!this.showError) {
                        this.comparisonStarted = true;
                        eventBus.emit("compare-layers", {left: this.leftSelect,right: this.rightSelect,});
                    }
                } else {
                    this.comparisonStarted = false;
                    eventBus.emit("remove-comparison");
                }
            },
        },
    };
    </script>
    
    <style scoped>
    /* No changes needed for styling */
    </style>
    