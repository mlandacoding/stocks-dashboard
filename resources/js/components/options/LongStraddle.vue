<template>
    <v-row dense class="ma-0 pa-1">
        <v-col cols="12" sm="4">
            <v-select v-model="selectedExpiration" :items="expirationDates" label="Select Expiration"
                variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedITMCall" :items="ITMCalls" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select In-The-Money Call" variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedITMPut" :items="ITMPuts" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select In-The-Money Put" variant="underlined" dense />
        </v-col>

        <v-col cols="12">
            <v-alert color="blue" icon="mdi-alert" theme="dark" density="compact" border>
                In order to find more financial instruments for this strategy the  <b>In The Money</b> calculation has a 5% tolerance
            </v-alert>
        </v-col>

        <v-col cols="12">
            <v-alert v-if="getMaximumProfitUp() < 0" color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
                Your selected options would result in a negative maximum profit
            </v-alert>
        </v-col>

        <v-col cols="12">
            <v-alert v-if="selectedITMCall.strike_price != selectedITMPut.strike_price" color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
                Both options selected must have the same strike price to be considered a valid Straddle
            </v-alert>
        </v-col>

    </v-row>

    <v-row dense class="ma-0 pa-0">



        <v-col cols="12" sm="8">
            <v-card class="pa-0"
                style="background: #181f3a; color: #fff; border-radius: 8px; border: 1px solid #2c365a;">
                <v-card-title class="text-h6 mb-3" style="align-content: center;">
                    Strategy P&L Summary
                </v-card-title>

                <v-row dense>
                    <v-col cols="4" sm="4" class="text-center">
                        <div><strong>Max Loss:</strong></div>
                        <div style="color: #ff4560;">${{ maximumLoss.toFixed(2) }}</div>
                    </v-col>
                    <v-col cols="4" sm="4" class="text-center">
                        <div><strong>Max Profit Up:</strong></div>
                        <div style="color: #00e396;">${{ getMaximumProfitUp().toFixed(2) }}</div>
                    </v-col>
                    <v-col cols="4" sm="4" class="text-center">
                        <div><strong>Max Profit Down:</strong></div>
                        <div style="color: #00e396;">${{ getMaximumProfitDown().toFixed(2) }}</div>
                    </v-col>
                    <v-col cols="4" sm="4" class="text-center">
                        <div><strong>Break Even:</strong></div>
                        <div style="color: #facc15;">${{ breakEven.toFixed(2) }}</div>
                    </v-col>
                </v-row>

                <v-card-text>
                    <apexchart width="100%" height="300" type="area" :options="chartOptions" :series="chartSeries" />
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" sm="4">
            <v-card v-if="selectedITMCall && selectedITMPut" class="pa-4"
                style="background: #181f3a; color: #fff; border-radius: 8px; border: 1px solid #2c365a;">
                <SelectedOptionsDetails :selectedITMOption="selectedITMCall" :selectedOTMOption="selectedITMPut" />
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import LiveSingleStockComponent from '@/components/LiveSingleStockComponent.vue';
import SelectedOptionsDetails from '@/components/options/SelectedOptionsDetails.vue';

export default {
    name: 'LongStraddle',
    props: {
        strategy: String,
        symbol: String,
        in_the_money_puts: Object,
        in_the_money_calls: Object,
        expirationDates: Array
    },
    components: {
        apexchart: VueApexCharts,
        LiveSingleStockComponent,
        SelectedOptionsDetails
    },
    data() {
        return {
            drawer: false,
            selectedExpiration: null,
            selectedITMCall: null,
            selectedITMPut: null,
            underlying_asset_price: null,
            ITMCalls: [],
            ITMPuts: [],
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
                colors: ['#00e396', '#ff4560'],
                xaxis: {
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
                annotations: {

                },
                markers: {
                    size: 0,
                    strokeColors: '#fff',
                    strokeWidth: 2,
                },
                fill: {
                    type: 'solid',
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: false,
                },
            },
            chartSeries: [],
        }
    },
    async mounted() {
        if (this.expirationDates.length) {
            this.selectedExpiration = this.expirationDates[0];
        }
        try {
            const latestRes = await axios.get(`/latest_price/${this.symbol}`);
            this.underlying_asset_price = parseFloat(latestRes.data['price']);
        } catch (error) {
            console.error('Failed to load prevCloseMap:', error);
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
            if (this.selectedITMCall && this.selectedITMPut) {
                return Number(this.selectedITMCall.last_price) + Number(this.selectedITMPut.last_price);
            }
            return 0;
        },
        getMaximumProfitUp() {
            // Theoretically infinite. Simulate a 50% price increase from strike.
            if (this.selectedITMCall && this.selectedITMPut) {
                const strike = Number(this.selectedITMCall.strike_price); // assuming both have same strike
                const callPremium = Number(this.selectedITMCall.last_price);
                const putPremium = Number(this.selectedITMPut.last_price);
                const netDebit = callPremium + putPremium;

                const simulatedHigh = strike * 1.5; // simulate +50% move
                const callPayoff = Math.max(simulatedHigh - strike, 0);
                const putPayoff = 0;

                return callPayoff + putPayoff - netDebit;
            }
            return 0;
        },

        getMaximumProfitDown() {
            // Simulate price dropping to 0
            if (this.selectedITMCall && this.selectedITMPut) {
                const strike = Number(this.selectedITMPut.strike_price); // assumed same as call
                const callPremium = Number(this.selectedITMCall.last_price);
                const putPremium = Number(this.selectedITMPut.last_price);
                const netDebit = callPremium + putPremium;

                const simulatedLow = -strike * 1.5;
                const putPayoff = Math.max(strike - simulatedLow, 0);
                const callPayoff = 0;

                return putPayoff + callPayoff - netDebit;
            }
            return 0;
        },
        getMaximumProfit() {
            if (this.selectedITMCall && this.selectedITMPut) {
                return this.selectedITMCall.strike_price - this.selectedITMPut.strike_price - this.getMaximumLoss();
            }
            return 0;
        },
        getBreakeven() {
            if (this.selectedITMCall && this.selectedITMPut) {
                return Number(this.selectedITMCall.strike_price) + Number(this.getMaximumLoss());
            }
            return 0;
        },
        updateMetrics() {
            if (this.selectedITMCall && this.selectedITMPut) {
                this.maximumLoss = this.getMaximumLoss();
                console.log(this.maximumLoss);
                this.maximumProfit = this.getMaximumProfit();
                this.breakEven = this.getBreakeven();
            } else {
                this.maximumLoss = 0;
                this.maximumProfit = 0;
                this.breakEven = 0;
            }
        },
        generateChartData() {
            if (!this.selectedITMCall || !this.selectedITMPut) return;

            const strike = Number(this.selectedITMCall.strike_price); // assumed same for call & put
            const callPremium = Number(this.selectedITMCall.last_price);
            const putPremium = Number(this.selectedITMPut.last_price);
            const netDebit = callPremium + putPremium;

            const minPrice = Math.max(1, Math.floor(strike * 0.5));
            const maxPrice = Math.ceil(strike * 1.5);
            const profitSeries = [];
            const lossSeries = [];

            for (let price = minPrice; price <= maxPrice; price++) {
                let callPayoff = Math.max(price - strike, 0);
                let putPayoff = Math.max(strike - price, 0);
                let pnl = callPayoff + putPayoff - netDebit;

                profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
                lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
            }

            this.chartSeries = [
                { name: 'Profit', data: profitSeries },
                { name: 'Loss', data: lossSeries },
            ];

            this.chartOptions = {
                ...this.chartOptions,
                stroke: {
                    curve: 'straight',
                    width: 2,
                },
                fill: {
                    type: 'solid',
                    opacity: 0.4,
                }
            };
        }
    },
    watch: {
        selectedExpiration(newVal) {
            this.ITMCalls = this.in_the_money_calls[newVal];
            this.ITMPuts = this.in_the_money_puts[newVal];
            this.selectedITMCall = null;
            this.selectedITMPut = null;
        },
        selectedITMCall() {
            this.updateMetrics();
            this.generateChartData();
        },
        selectedITMPut() {
            this.updateMetrics();
            this.generateChartData();
        },
    },
};
</script>
