<template>
<div class="LeftSideBar">
    <v-main style="--v-layout-top: 0px;">
        <v-navigation-drawer rail color="rgb(2, 42, 56)">
            <v-list>
                <!-- Layers Button -->
                <v-list-item class="cursor-pointer" @click="toggleDrawer">
                    <v-icon style="color: wheat;">mdi-heart</v-icon>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-main>

    <v-navigation-drawer v-model="drawer" temporary>
        <v-card elevation="0">
            <v-card-title>
                <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Feature Info Tool</div>
            </v-card-title>
            <v-divider :thickness="2" color="black"></v-divider>
            <v-card-text>
                <v-switch color="error" v-model="featureInfoEnabled" label="Enable Feature Info" @change="toggleFeatureInfo"></v-switch>
            </v-card-text>
        </v-card>
        <v-divider :thickness="2" color="black"></v-divider>
    </v-navigation-drawer>
</div>
</template>

<script>
import eventBus from '@/event-bus';

export default {
    name: 'LeftBar',
    data: () => ({
        drawer: false,
        featureInfoEnabled: false,
    }),
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        toggleFeatureInfo() {
            eventBus.emit('toggleFeatureInfo', this.featureInfoEnabled);
        },

    },
};
</script>

<style scoped>

</style>
