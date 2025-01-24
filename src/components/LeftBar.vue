<template>
<div class="LeftSideBar">
    
    <v-main style="--v-layout-top: 0px;">
        <v-app-bar color="rgb(2, 42, 56)" height="140" elevation="0"></v-app-bar>
        <v-navigation-drawer rail color="rgb(2, 42, 56)" location="right"></v-navigation-drawer>
        <v-navigation-drawer rail color="rgb(2, 42, 56)">
            <v-list>
                <!-- Layers Button -->
                <v-list-item class="cursor-pointer" @click="toggleDrawer">
                    <v-icon style="color: wheat;">mdi-layers-triple</v-icon>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-main>
    
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
            <v-list-item>
                <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Layers</div>
            </v-list-item>
            <v-divider :thickness="2" color="black"></v-divider>
            <v-expansion-panels>
                <v-expansion-panel elevation="0">
                    <v-expansion-panel-title>Administrative Boundaries</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <!-- Boundary Layer Checkboxes -->
                        <v-list-item v-for="(adminLayer, index) in adminLayers" :key="index">
                            <v-checkbox color="primary" :label="adminLayer.name" v-model="adminLayer.visible" style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" @change="onAdminBoundaryVisibilityChange(adminLayer)"></v-checkbox>
                        </v-list-item>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel elevation="0">
                    <v-expansion-panel-title>
                        Project Boundaries
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <!-- Project Layer Checkboxes -->
                        <v-list-item v-for="(projectLayer, index) in projectLayers" :key="index">
                            <v-checkbox color="primary" :label="projectLayer.name" v-model="projectLayer.visible" style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" @change="onProjectBoundaryVisibilityChange(projectLayer)"></v-checkbox>
                        </v-list-item>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-divider></v-divider>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

  
  
<script>
import eventBus from '@/event-bus';

export default {
    name: 'LeftBar',
    data: () => ({
        drawer: false,
        adminLayers: [{
                name: 'India Boundary',
                visible: true
            },

        ],
        projectLayers: [{
            name: 'Ganga Basin',
            visible: true
        }, ],
    }),
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        onAdminBoundaryVisibilityChange(adminLayer) {
            eventBus.emit('toggle-layer-visibility', {
                name: adminLayer.name,
                visible: adminLayer.visible,
            });
        },
        onProjectBoundaryVisibilityChange(projectLayer) {
            eventBus.emit('toggle-layer-visibility', {
                name: projectLayer.name,
                visible: projectLayer.visible,
            });
        },
    },
};
</script>
  
  
<style scoped>
/* No changes needed for styling */
</style>
