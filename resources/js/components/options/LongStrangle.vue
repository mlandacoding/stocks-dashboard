<template>
    <v-row dense class="ma-0 pa-1">
        <v-col cols="12" sm="4">
            <v-select v-model="selectedExpiration" :items="expirationDates" label="Select Expiration"
                variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedOTMCall" :items="OTMCalls" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select Out-Of-The-Money Call" variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedOTMPut" :items="OTMPuts" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select Out-Of-The-Money Put" variant="underlined" dense />
        </v-col>

        <v-col cols="12">
            <v-alert v-if="getMaximumProfitUp() < 0" color="#C51162" icon="mdi-cancel" theme="dark" density="compact"
                border>
                Your selected options would result in a negative maximum profit
            </v-alert>
        </v-col>

        <v-col cols="12">
            <v-alert v-if="selectedOTMCall?.strike_price < selectedOTMPut?.strike_price" color="#C51162"
                icon="mdi-cancel" theme="dark" density="compact" border>
                The Call should have a higher strike price for it to be a valid Long Strangle
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
            <v-card v-if="selectedOTMCall && selectedOTMPut" class="pa-4"
                style="background: #181f3a; color: #fff; border-radius: 8px; border: 1px solid #2c365a;">
                <SelectedOptionsDetails :selectedITMOption="selectedOTMCall" :selectedOTMOption="selectedOTMPut" />
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import LiveSingleStockComponent from '@/components/LiveSingleStockComponent.vue';
import SelectedOptionsDetails from '@/components/options/SelectedOptionsDetails.vue';

export default {
    name: 'LongStrangle',
    props: {
        strategy: String,
        symbol: String,
        out_of_the_money_puts: Object,
        out_of_the_money_calls: Object,
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
            selectedOTMCall: null,
            selectedOTMPut: null,
            underlying_asset_price: null,
            OTMCalls: [],
            OTMPuts: [],
            maximumLoss: 0,
            maximumProfit: 0,
            breakEven: 0,
            chartOptions: {
                chart: {
                    id: 'long-strangle-payoff',
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
            if (this.selectedOTMCall && this.selectedOTMPut) {
                return Number(this.selectedOTMCall.last_price) + Number(this.selectedOTMPut.last_price);
            }
            return 0;
        },
        getMaximumProfitUp() {
            if (this.selectedOTMCall && this.selectedOTMPut) {
                const callStrike = Number(this.selectedOTMCall.strike_price);
                const callPremium = Number(this.selectedOTMCall.last_price);
                const putPremium = Number(this.selectedOTMPut.last_price);
                const netDebit = callPremium + putPremium;

                const simulatedHigh = callStrike * 1.5;
                const callPayoff = Math.max(simulatedHigh - callStrike, 0);

                return callPayoff - netDebit;
            }
            return 0;
        },

        getMaximumProfitDown() {
            if (this.selectedOTMCall && this.selectedOTMPut) {
                const putStrike = Number(this.selectedOTMPut.strike_price);
                const callPremium = Number(this.selectedOTMCall.last_price);
                const putPremium = Number(this.selectedOTMPut.last_price);
                const netDebit = callPremium + putPremium;

                const simulatedLow = 0;
                const putPayoff = putStrike - simulatedLow;

                return putPayoff - netDebit;
            }
            return 0;
        },
        getMaximumProfit() {
            if (this.selectedOTMCall && this.selectedOTMPut) {
                return this.selectedOTMCall.strike_price - this.selectedOTMPut.strike_price - this.getMaximumLoss();
            }
            return 0;
        },
        getBreakevenPoints() {
            if (this.selectedOTMCall && this.selectedOTMPut) {
                const callStrike = Number(this.selectedOTMCall.strike_price);
                const putStrike = Number(this.selectedOTMPut.strike_price);
                const netDebit = Number(this.selectedOTMCall.last_price) + Number(this.selectedOTMPut.last_price);
                return callStrike + netDebit;
            }
            return 0;
        },
        updateMetrics() {
            if (this.selectedOTMCall && this.selectedOTMPut) {
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
            if (!this.selectedOTMCall || !this.selectedOTMPut) return;

            const callStrike = Number(this.selectedOTMCall.strike_price);
            const putStrike = Number(this.selectedOTMPut.strike_price);
            const callPremium = Number(this.selectedOTMCall.last_price);
            const putPremium = Number(this.selectedOTMPut.last_price);
            const netDebit = callPremium + putPremium;

            const minPrice = Math.max(1, Math.floor(putStrike * 0.5));
            const maxPrice = Math.ceil(callStrike * 1.5);

            const profitSeries = [];
            const lossSeries = [];

            for (let price = minPrice; price <= maxPrice; price++) {
                const callPayoff = Math.max(price - callStrike, 0);
                const putPayoff = Math.max(putStrike - price, 0);
                const pnl = callPayoff + putPayoff - netDebit;

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
                },
            };
        },
    },
    watch: {
        selectedExpiration(newVal) {
            this.OTMCalls = this.out_of_the_money_calls[newVal];
            this.OTMPuts = this.out_of_the_money_puts[newVal];
            this.selectedOTMCall = null;
            this.selectedOTMPut = null;
        },
        selectedOTMCall() {
            this.updateMetrics();
            this.generateChartData();
        },
        selectedOTMPut() {
            this.updateMetrics();
            this.generateChartData();
        },
    },
};
</script>
