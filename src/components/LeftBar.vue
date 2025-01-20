<template>
<div class="LeftSideBar">
    <v-main style="--v-layout-top: 0px;">
        <v-navigation-drawer rail color="rgb(2, 42, 56)">
            <v-list>
                <!-- Layers Button -->
                <v-list-item class="cursor-pointer" @click="toggleLayersDrawer">
                    <v-icon style="color: wheat;">mdi-layers-triple</v-icon>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-main> 

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-expansion-panels>
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title>Administrative Boundaries</v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Layer Checkboxes -->
              <v-list-item v-for="(adminLayer, index) in adminLayers" :key="index">
                <v-checkbox color="rgb(2, 42, 56)" :label="adminLayer.name" v-model="adminLayer.visible" 
                style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" @change="onAdminBoundaryVisibilityChange(adminLayer)"></v-checkbox>
              </v-list-item>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title>
              Project Boundaries
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Layer Checkboxes -->
              <v-list-item v-for="(projectLayer, index) in projectLayers" :key="index">
                <v-checkbox color="rgb(2, 42, 56)" :label="projectLayer.name" v-model="projectLayer.visible"
                style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" @change="onProjectBoundaryVisibilityChange(projectLayer)"></v-checkbox>
              </v-list-item>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
    adminLayers: [
      { name: 'India Boundary', visible: true },
      { name: 'States', visible: false },
      { name: 'Districts', visible: false },
      { name: 'Sub-Districts', visible: false },
    ],
    projectLayers: [
    { name: 'Ganga Basin', visible: true },
    ],
  }),
  methods: {
    toggleLayersDrawer() {
      this.drawer = !this.drawer;
    },
    onAdminBoundaryVisibilityChange(adminLayer) {
      eventBus.emit('toggle-layer-visibility', {name: adminLayer.name,visible: adminLayer.visible,});
    },
    onProjectBoundaryVisibilityChange(projectLayer) {
      eventBus.emit('toggle-layer-visibility', {name: projectLayer.name,visible: projectLayer.visible,});
    },
  },
};
</script>

<style scoped>

</style>