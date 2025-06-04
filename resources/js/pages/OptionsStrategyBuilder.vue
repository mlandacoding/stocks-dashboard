<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" />
    <v-sheet class="custom-width-wrapper">
        <v-layout style="background: #0c1427">
            <Navbar @toggle-drawer="handleDrawerToggle" />
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />

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
                            <h4>Strategy: {{ strategy }}</h4>
                            <h4>Symbol: {{ symbol }}</h4>
                        </v-col>
                    </v-row>

                    <v-row>

                        <v-col cols="12" sm="4">
                            <v-select v-model="selectedExpiration" :items="expirationDates" label="Select Expiration"
                                variant="underlined" dense />
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-select v-model="selectedITMOption" :items="ITMOptions" :item-title="itemTitle"
                                item-value="option_symbol" return-object label="Select In-The-Money Call"
                                variant="underlined" dense
                            />
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-select v-model="selectedOTMOption" :items="OTMOptions" :item-title="itemTitle"
                                item-value="option_symbol" return-object label="Select Out-Of-The-Money Call" variant="underlined"
                                dense />
                        </v-col>

                        <v-col cols="12">
                            <v-alert v-if="maximumProfit.toFixed(2) < maximumLoss.toFixed(2) " color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
                                Your selected options result in a maximum profit that is less than the maximum loss.
                                You would be paying more in premiums than you would gain from the strategy.
                            </v-alert>
                        </v-col>


                        <v-col cols="12" sm="4">
                            <v-card v-if="selectedITMOption && selectedOTMOption">
                                <v-card-title>Strategy Summary</v-card-title>
                                <v-card-text>
                                    <p><strong>In the Money Option:</strong> {{ selectedITMOption.option_symbol }}</p>
                                    <p><strong>Out of the Money Option:</strong> {{ selectedOTMOption.option_symbol }}</p>
                                    <p><strong>Maximum Loss:</strong> ${{ maximumLoss.toFixed(2) }}</p>
                                    <p><strong>Maximum Profit:</strong> ${{ maximumProfit.toFixed(2) }}</p>
                                    <p><strong>Break Even:</strong> ${{ breakEven.toFixed(2) }}</p>
                                </v-card-text>

                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="8">
                            <v-card style="background: #181f3a; color: #fff; border-radius: 1px; border: 1px solid #2c365a;">
                                <v-card-title>P/L at Expiration</v-card-title>
                                <v-card-text>
                                    <apex-chart width="100%" height="300" type="line"
:options="chartOptions"
                                        :series="chartSeries"
                                    ></apex-chart>
                                </v-card-text>
                            </v-card>
                        </v-col>


                    </v-row>
                </v-container>
                <FooterComponent />
            </v-main>
        </v-layout>
    </v-sheet>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import MarketStatus from '@/components/MarketStatus.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
    name: 'OptionsStrategyBuilder',
    props: {
        strategy: String,
        symbol: String,
        in_the_money_calls: Object,
        out_of_the_money_calls: Object,
        callsByExpiration: Object,
    },
    components: {
        Navbar,
        Sidebar,
        MarketStatus,
        FooterComponent,
        ApexChart: VueApexCharts,
    },
    data() {
        return {
            drawer: false,
            selectedExpiration: null,
            selectedITMOption: null,
            selectedOTMOption: null,
            expirationDates: [],
            ITMOptions: [],
            OTMOptions: [],
            maximumLoss: 0,
            maximumProfit: 0,
            breakEven: 0,
            chartOptions: {
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
                enabled: true,
                theme: 'dark',
                y: {
                    formatter: (val) => `$${val.toFixed(2)}`,
                    title: {
                        formatter: () => 'P/L',
                    },
                },
                x: {
                    show: true,
                    formatter: (val) => `Price: $${val}`,
                },
            },
            markers: {
                size: 3,
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
            chartSeries: [],
        }
    },
    mounted() {
        this.expirationDates = Object.keys(this.callsByExpiration).sort();

        if (this.expirationDates.length) {
            this.selectedExpiration = this.expirationDates[0];
        }
    },
    methods: {
        handleDrawerToggle() {
            this.drawer = !this.drawer;
        },
        itemTitle(option) {
            if (!option) return '';
            return `${option.strike_price} (${option.option_symbol}) - $${option.last_price}`;
        },
        getMaximumLoss() {
            if (this.selectedITMOption && this.selectedOTMOption) {
                return this.selectedITMOption.last_price - this.selectedOTMOption.last_price;
            }
            return 0;
        },
        getMaximumProfit() {
            if (this.selectedITMOption && this.selectedOTMOption) {
                return this.selectedOTMOption.strike_price - this.selectedITMOption.strike_price - this.getMaximumLoss();
            }
            return 0;
        },
        getBreakeven() {
            if (this.selectedITMOption && this.selectedOTMOption) {
                return Number(this.selectedITMOption.strike_price) + Number(this.getMaximumLoss());
            }
            return 0;
        },
        updateMetrics() {
            if (this.selectedITMOption && this.selectedOTMOption) {
                this.maximumLoss = this.getMaximumLoss();
                this.maximumProfit = this.getMaximumProfit();
                this.breakEven = this.getBreakeven();
            } else {
                this.maximumLoss = 0;
                this.maximumProfit = 0;
                this.breakEven = 0;
            }
        },
        generateChartData() {
            if (!this.selectedITMOption || !this.selectedOTMOption) return;

            const lowerStrike = Number(this.selectedITMOption.strike_price);
            const upperStrike = Number(this.selectedOTMOption.strike_price);
            const netDebit = Number(this.selectedITMOption.last_price) - Number(this.selectedOTMOption.last_price);

            const minPrice = Math.floor(lowerStrike * 0.9);
            const maxPrice = Math.ceil(upperStrike * 1.1);

            const categories = [];
            const data = [];

            for (let price = minPrice; price <= maxPrice; price += 10) {
                categories.push(price);
                let pnl = 0;
                if (price <= lowerStrike) {
                    pnl = -netDebit;
                } else if (price >= upperStrike) {
                    pnl = (upperStrike - lowerStrike) - netDebit;
                } else {
                    pnl = (price - lowerStrike) - netDebit;
                }
                data.push(Number(pnl.toFixed(2)));
            }

            // update series and categories
            this.chartOptions.xaxis.categories = categories;
            this.chartSeries = [
                {
                    name: 'Payoff',
                    data: data
                }
            ];
        }
    },
    watch: {
        selectedExpiration(newVal) {
            this.ITMOptions = this.in_the_money_calls[newVal];
            this.OTMOptions = this.out_of_the_money_calls[newVal];
        },
        selectedITMOption() {
            this.updateMetrics();
            this.generateChartData();
        },
        selectedOTMOption() {
            this.updateMetrics();
            this.generateChartData();
        },
    },
};
</script>

<style scoped>
.custom-width-wrapper {
    min-height: 100vh;
}

.selected-option {
    background-color: #1e3a8a !important;
    color: white;
    transition: background-color 0.2s;
}

.hidden-option {
    display: none;
}
</style>
