<script setup>
import { ref, defineEmits  } from "vue";

const drawer = ref(false);
const emit = defineEmits(["toggle-drawer"]);

const updateDrawer = () => {
  drawer.value = !drawer.value;
  emit("toggle-drawer", drawer.value);
};

</script>
<template>
    <v-app-bar color="primary" class="outlined-navbar" style="border-bottom: .5px solid #17223f;">
    <v-app-bar-nav-icon variant="text" @click="updateDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>
        <div style="display: flex; align-items: center;">
            <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-icon.svg"
                style="width:35px; margin-right: 5px;" />
            <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-text.svg"
                style="width:100px; margin-right: 5px;" />
        </div>
    </v-toolbar-title>

    <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
</v-app-bar>
</template>

