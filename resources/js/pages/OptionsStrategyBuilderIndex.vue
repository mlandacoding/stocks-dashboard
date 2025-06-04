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
                            <h3>Options Strategy Builder</h3>
                        </v-col>
                    </v-row>

                    <v-row cols="12" sm="12" md="4" lg="3">
                        <v-col sm="2" md="2" lg="3">
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 1px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Bull Spread</span>
                                    <v-btn color="accent" variant="tonal" text ref="bullSpread" @click="openStrategyDialog('bullSpread')" >
                                        <v-icon>mdi-play</v-icon>
                                        <span>Build</span>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="250" :options="bullSpreadOptions" :series="bullSpreadSeries" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col sm="2" md="2" lg="3">
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 1px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Bear Spread</span>
                                    <v-btn color="accent" variant="tonal" text @click="openStrategyDialog('bearSpread')">
                                        <v-icon>mdi-play</v-icon>
                                        <span>Build</span>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="250" :options="bearSpreadOptions" :series="bearSpreadSeries" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col sm="2" md="2" lg="3">
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 1px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Long Straddle</span>
                                    <v-btn color="accent" variant="tonal" text>
                                        <v-icon>mdi-play</v-icon>
                                        <span>Build</span>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="250" :options="straddleOptions" :series="straddleSeries" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col sm="2" md="2" lg="3">
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 1px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Long Strangle</span>
                                    <v-btn color="accent" variant="tonal" text>
                                        <v-icon>mdi-play</v-icon>
                                        <span>Build</span>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="250" :options="longStrangleOptions" :series="longStrangleSeries" />
                                </v-card-text>
                            </v-card>
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
import { bullSpreadSeries, bullSpreadOptions } from '@/components/option_graphs/IconBullSpreadGraph';
import { bearSpreadSeries, bearSpreadOptions } from '@/components/option_graphs/IconBearSpreadGraph';
import { straddleSeries, straddleOptions } from '@/components/option_graphs/IconStraddleGraph';
import { longStrangleSeries, longStrangleOptions } from '@/components/option_graphs/IconLongStrangleGraph';



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
            bullSpreadSeries,
            bullSpreadOptions,
            bearSpreadSeries,
            bearSpreadOptions,
            straddleSeries,
            straddleOptions,
            longStrangleSeries,
            longStrangleOptions,
            mdAndUp: useDisplay(),
            selectedStrategy: null,
        };
    },
    async mounted(){
        this.calculateBullSpreadPayoff();
        this.calculateBearSpreadPayoff();
        try {
            const response = await axios.get("/active-assets-with_companyname");
            const data = response.data.symbols;
            this.symbols = Object.entries(data).map(([symbol, name]) => ({
                symbol,
                name,
            }));
        } catch(error){
            console.error('Error fetching data');
        }
    },
    methods: {
        handleDrawerToggle(value) {
            this.drawer = value;
        },
        calculateBullSpreadPayoff() {
            this.bullSpreadSeries[0].data = this.bullSpreadOptions.xaxis.categories.map((price) => {
                const longCall = Math.max(0, price - 100) - 10;
                const shortCall = -1 * (Math.max(0, price - 120) - 4);
                return longCall + shortCall;
            });
        },
        calculateBearSpreadPayoff() {
            this.bearSpreadSeries[0].data = this.bearSpreadOptions.xaxis.categories.map((price) => {
                const longCall = 10 - Math.max(0, price - 100);
                const shortCall = -1 * (4 - Math.max(0, price - 120));
                return longCall + shortCall;
            });
        },
        goToProfile(symbol){
            window.location.href = `/optionsStrategyBuilder/${this.selectedStrategy}/${symbol}`;
            this.showSearchDialog = false;
            this.searchTerm = "";
        },
        openStrategyDialog(strategy) {
            this.selectedStrategy = strategy;
            this.showSearchDialog = true;
        },

    },
    computed: {
        filteredSymbols() {
            if (!this.searchTerm) return this.symbols;
            return this.symbols.filter(item =>
            `${item.symbol} ${item.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    }
};
</script>
