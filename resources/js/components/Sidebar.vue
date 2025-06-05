<script setup>
import { defineProps, defineEmits } from "vue";

const items = [
    { title: 'Market Summary', link: '/', value: 'bar' },
]

const props = defineProps({
  drawer: Boolean, // Receives the drawer state from MainLayout.vue
});

const emit = defineEmits(["update:drawer"]);

const toggleDrawer = () => {
  emit("update:drawer", !props.drawer);
};
</script>

<template>
  <v-navigation-drawer color="primary" :model-value="drawer" :width="250" @update:modelValue="toggleDrawer"
    class="outlined-sidebar" style ="border-right: 2px solid #17223f;">
    <v-list density="compact">
      <div class="justify-content-center">
        <v-list-subheader style="color: white; background-color: #17223f;">Stocks</v-list-subheader>
      </div>

      <v-divider></v-divider>

      <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
        <a :href="item.link" style="color: white; text-decoration: none;">{{ item.title }}</a>
      </v-list-item>

      <v-divider></v-divider>
      <div class="justify-content-center">
        <v-list-subheader style="color: white; background-color: #17223f;">Options</v-list-subheader>
      </div>

      <v-divider></v-divider>

      <v-list-item>
        <a href="/optionsStrategyBuilder" style="color: white; text-decoration: none;">Option Strategy Builder</a>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
