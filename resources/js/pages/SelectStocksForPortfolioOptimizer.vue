<template>

    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-sheet class="custom-width-wrapper">
        <v-layout style="background: #0c1427;">
            <!-- Navbar -->
            <Navbar @toggle-drawer="handleDrawerToggle" />

            <!-- Sidebar Navigation Drawer -->
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />

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
                            <v-autocomplete
                                v-model="selectedStocks"
                                :items="filteredSymbols"
                                :item-title="item => item ? `${item.name} [${item.symbol}]` : ''"
                                :item-value="item => item && item.symbol"
                                label="Select stocks"
                                multiple
                                chips
                                clearable
                                style="background:#0c1427; color:#fff; border:2px solid #fff;"
                                v-model:search="searchTerm"
                            />
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
import { ref, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import MarketStatus from '@/components/MarketStatus.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import VueApexCharts from 'vue3-apexcharts';
import { useDisplay } from "vuetify";
import axios from 'axios';


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
            selectedStocks: [],
            mdAndUp: useDisplay(),
            selectedStrategy: null,
        };
    },
    computed: {
        filteredSymbols() {
            if (!this.searchTerm) return this.symbols;
            return this.symbols.filter((item) =>
                `${item.symbol} ${item.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },
    async mounted(){
        try {
            const response = await axios.get("/active-assets-with_companyname");
            const data = response.data.symbols;
            this.symbols = Object.entries(data).map(([symbol, name]) => ({
                symbol,
                name,
            }));
        } catch (err) {
            console.error("Failed to load symbols", err);
        }
        console.log(symbols);
    },
    methods: {
        handleDrawerToggle(value) {
            this.drawer = value;
        },
    },
};
</script>
