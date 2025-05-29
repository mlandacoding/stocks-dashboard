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
                            <v-card>test</v-card>
                        </v-col>
                        <v-col>
                            <v-card>test</v-card>
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
            // Bull Spread Payoff Data
            strikes: [90, 95, 100, 105, 110, 115, 120, 125, 130],
            longCallStrike: 100,
            longCallPremium: 10,
            shortCallStrike: 120,
            shortCallPremium: 4,
            bullSpreadSeries: [
                {
                    name: 'Payoff',
                    data: [],
                },
            ],
            bullSpreadOptions: {
                chart: {
                    id: 'bull-spread-payoff',
                    toolbar: { show: false },
                    zoom: { enabled: false },
                    background: 'transparent',
                },
                xaxis: {
                    categories: [],
                    title: { text: 'Asset Price', style: { color: '#fff' } },
                    labels: { show: false },
                },
                yaxis: {
                    title: { text: 'Profit / Loss', style: { color: '#fff' } },
                    labels: { show: false },
                },
                grid: {
                    borderColor: '#2c365a',
                    row: { colors: ['#222b45', 'transparent'], opacity: 0.1 },
                },
                stroke: {
                    curve: 'straight',
                    width: 3,
                    colors: ['#00e396'],
                },
                tooltip: {
                    enabled: false,
                },
                markers: {
                    size: 5,
                    colors: ['#00e396'],
                    strokeColors: '#fff',
                    strokeWidth: 2,
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.4,
                        opacityTo: 0,
                        stops: [0, 100],
                        colorStops: [
                            [
                                {
                                    offset: 0,
                                    color: '#00e396',
                                    opacity: 0.4,
                                },
                                {
                                    offset: 100,
                                    color: '#00e396',
                                    opacity: 0,
                                },
                            ],
                        ],
                    },
                },
                dataLabels: {
                    enabled: false,
                },
            },
        };
    },
    mounted() {
        this.calculateBullSpreadPayoff();
    },
    methods: {
        handleDrawerToggle(value) {
            this.drawer = value;
        },
        calculateBullSpreadPayoff() {
            this.bullSpreadSeries[0].data = this.strikes.map((price) => {
                const longCall = Math.max(0, price - this.longCallStrike) - this.longCallPremium;
                const shortCall = -1 * (Math.max(0, price - this.shortCallStrike) - this.shortCallPremium);
                return longCall + shortCall;
            });
            this.bullSpreadOptions.xaxis.categories = this.strikes;
        },
    },
};
</script>
