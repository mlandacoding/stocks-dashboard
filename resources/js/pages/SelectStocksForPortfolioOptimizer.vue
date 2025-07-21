<template>

    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-sheet class="custom-width-wrapper">
        <v-layout style="background: #0c1427;">
            <!-- Navbar -->
            <Navbar @toggle-drawer="handleDrawerToggle" />

            <!-- Sidebar Navigation Drawer -->
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />

            <v-dialog v-model="showSearchDialog" transition="dialog-bottom-transition" class="forceLocation" @click:outside="showSearchDialog = false">
                <v-card class="search-dialog-card" :style="mdAndUp ? 'width: 90vw; height: 85vh;' : 'width: 90vw; height: 85vh;'">
                    <v-toolbar color="primary" dark>
                        <v-btn icon @click="showSearchDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Search Companies</v-toolbar-title>
                    </v-toolbar>
                    <v-card-subtitle v-if="selectedStrategy" class="text-center" style="color: #5E75E8; font-weight: bold;">
                        Building: {{ selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1).replace(/([A-Z])/g, ' $1') }}
                    </v-card-subtitle>
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

            <!-- Main Content -->
            <v-main :class="{ 'content-expanded': !drawer, 'content-shrinked': drawer }">

                <v-container fluid class="pa-3" no-gutters>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <MarketStatus />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <h3>Portfolio Optimizer</h3>
                        </v-col>
                    </v-row>



                </v-container>
                <FooterComponent></FooterComponent>
            </v-main>
        </v-layout>



    </v-sheet>


</template>

<style scoped>
.content-expanded {
    margin-left: 0;
    transition: margin-left 0.8s ease-in-out;
}

.content-shrinked {
    margin-left: 5px;
    transition: margin-left 0.8s ease-in-out;
}

.custom-width-wrapper {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
}

@media (max-width: 600px) {
    .custom-width-wrapper {
        padding: 0 !important;
        margin: 0 !important;
    }
}

primary-dropdown {
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

<script>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import MarketStatus from '@/components/MarketStatus.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import VueApexCharts from 'vue3-apexcharts';
import { useDisplay } from "vuetify";


export default {
    name: 'OptionsStrategyBuilder',
    components: {
        Navbar,
        Sidebar,
        MarketStatus,
        FooterComponent,
        apexchart: VueApexCharts,
    },
    data() {
        return {
            drawer: false,
            showSearchDialog: false,
            searchTerm: '',
            symbols: [],
            mdAndUp: useDisplay(),
            selectedStrategy: null,
        };
    },
    async mounted(){
    },
    methods: {
        handleDrawerToggle(value) {
            this.drawer = value;
        },
    },
    computed: {
    }
};
</script>
