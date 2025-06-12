<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useDisplay } from "vuetify";
import GoogleAnalytics from "./GoogleAnalytics.vue";
import GoogleAnalytics from "./GoogleAnalytics.vue";

const showSearchDialog = ref(false);
const searchTerm = ref("");
const symbols = ref([]);
const { mdAndUp } = useDisplay();

const drawer = ref(false);
const emit = defineEmits(["toggle-drawer"]);

const updateDrawer = () => {
    drawer.value = !drawer.value;
    emit("toggle-drawer", drawer.value);
};

onMounted(async () => {
    try {
        const response = await axios.get("/active-assets-with_companyname");
        const data = response.data.symbols;
        symbols.value = Object.entries(data).map(([symbol, name]) => ({
            symbol,
            name,
        }));
    } catch (err) {
        console.error("Failed to load symbols", err);
    }
});

const filteredSymbols = computed(() => {
    if (!searchTerm.value) return symbols.value;
    return symbols.value.filter((item) =>
        `${item.symbol} ${item.name}`.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

const goToProfile = (symbol) => {
    window.location.href = `/company_profile/${symbol}`;
    showSearchDialog.value = false;
    searchTerm.value = "";
};
</script>

<template>
    <GoogleAnalytics />
    <v-app-bar color="primary" class="outlined-navbar" style="border-bottom: .5px solid #17223f;">
        <v-app-bar-nav-icon variant="text" @click="updateDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
            <a href="/" style="text-decoration: none; display: flex; align-items: center;">
                <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-icon.svg"
                    style="width:35px; margin-right: 5px;" />
                <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-text.svg"
                    style="width:100px; margin-right: 5px;" />
            </a>
        </v-toolbar-title>

        <v-btn icon="mdi-magnify" variant="text" @click="showSearchDialog = true" />

        <v-dialog v-model="showSearchDialog" transition="dialog-bottom-transition" class="forceLocation" @click:outside="showSearchDialog = false">
            <v-card class="search-dialog-card" :style="mdAndUp ? 'width: 30vw; height: 85vh;' : ''" >
                <v-toolbar color="primary" dark>
                    <v-btn icon @click="showSearchDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Search Companies</v-toolbar-title>
                </v-toolbar>

                <v-card-text class="pa-4" style="padding-top: 0;">
                    <v-text-field v-model="searchTerm" placeholder="Type to search companies..."
                        prepend-inner-icon="mdi-magnify" clearable hide-details density="compact" solo flat
                        color="primary" />

                    <v-list class="mt-4" style="max-height: 70vh; overflow-y: auto; background-color: #0c1427;">
                        <v-list-item v-for="item in filteredSymbols" :key="item.symbol"
                            @click="goToProfile(item.symbol)">
                            <v-list-item-title>
                                <div class="d-flex align-center justify-space-between">
                                    <span>{{ item.name }}</span>
                                    <span style="color: #5E75E8;">[{{ item.symbol }}]</span>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<style>
.primary-dropdown {
    background-color: #0c1427 !important;
}

.primary-dropdown .v-list {
    background-color: #0c1427 !important;
}

.primary-dropdown .v-list-item--active {
    background-color: rgba(94, 117, 232, 0.15) !important;
}

.primary-dropdown .v-list-item:hover {
    background-color: rgba(94, 117, 232, 0.1) !important;
}

.search-dialog-card {
  background-color: #0c1427;
  margin: auto;
}

.forceLocation > .v-overlay__content {
  position: absolute !important;
  top: 0px !important;
  left: 0;
  right: 0;
  margin: auto;
  top: 40px !important;
  pointer-events: none;
}

.forceLocation .v-card {
  pointer-events: auto;
}

</style>
