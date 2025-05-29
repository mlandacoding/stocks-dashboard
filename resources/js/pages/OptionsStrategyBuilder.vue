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
                            <h3>Options Strategy Builder</h3>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 18px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Bull Spread</span>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="300" :options="bullSpreadOptions" :series="bullSpreadSeries" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 18px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Bear Spread</span>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="300" :options="bearSpreadOptions" :series="bearSpreadSeries" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" elevation="3" style="background: #181f3a; color: #fff; border-radius: 18px; border: 1px solid #2c365a;">
                                <v-card-title class="d-flex align-center justify-space-between" style="font-size: 1.3rem; font-weight: 600;">
                                    <span>Straddle</span>
                                </v-card-title>
                                <v-card-text>
                                    <apexchart type="area" height="300" :options="straddleOptions" :series="straddleSeries" />
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
</style>

<script>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import MarketStatus from '@/components/MarketStatus.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import VueApexCharts from 'vue3-apexcharts';
import { bullSpreadSeries, bullSpreadOptions } from '@/components/option_graphs/IconBullSpreadGraph';
import { bearSpreadSeries, bearSpreadOptions } from '@/components/option_graphs/IconBearSpreadGraph';
import { straddleSeries, straddleOptions } from '@/components/option_graphs/IconStraddleGraph';

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
            bullSpreadSeries,
            bullSpreadOptions,
            bearSpreadSeries,
            bearSpreadOptions,
            straddleSeries,
            straddleOptions,
        };
    },
    mounted() {
        this.calculateBullSpreadPayoff();
        this.calculateBearSpreadPayoff();
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
    },
};
</script>
