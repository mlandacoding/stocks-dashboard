<template>
    <v-row dense class="ma-0 pa-1">
        <v-col cols="12" sm="4">
            <v-select v-model="selectedExpiration" :items="expirationDates" label="Select Expiration"
                variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedITMOption" :items="ITMOptions" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select In-The-Money Put" variant="underlined" dense />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select v-model="selectedOTMOption" :items="OTMOptions" :item-title="itemTitle" item-value="option_symbol"
                return-object label="Select Out-Of-The-Money Put" variant="underlined" dense />
        </v-col>

        <v-col cols="12">
            <v-alert v-if="maximumProfit < 0" color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
                Your selected options would result in a negative maximum profit
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
                        <div><strong>Max Profit:</strong></div>
                        <div style="color: #00e396;">${{ maximumProfit.toFixed(2) }}</div>
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
            <v-card v-if="selectedITMOption && selectedOTMOption" class="pa-4"
                style="background: #181f3a; color: #fff; border-radius: 8px; border: 1px solid #2c365a;">
                <SelectedOptionsDetails :selectedITMOption="selectedITMOption" :selectedOTMOption="selectedOTMOption" />
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import LiveSingleStockComponent from '@/components/LiveSingleStockComponent.vue';
import SelectedOptionsDetails from '@/components/options/SelectedOptionsDetails.vue';

export default {
    name: 'BearPutSpread',
    props: {
        strategy: String,
        symbol: String,
        in_the_money_puts: Object,
        out_of_the_money_puts: Object,
        putsByExpiration: Object,
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
    mounted() {
        this.expirationDates = Object.keys(this.putsByExpiration).sort();

        if (this.expirationDates.length) {
            this.selectedExpiration = this.expirationDates[0];
        }

        document.title = 'Bear Put Spread Visualizer | Options Strategy Builder';

        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
        }
        meta.content = 'Analyze Bear Put Spread strategies in real-time. Use our interactive builder to understand payoffs, breakevens, and downside protection.';

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
                return this.selectedITMOption.strike_price - this.selectedOTMOption.strike_price - this.getMaximumLoss();
            }
            return 0;
        },
        getBreakeven() {
            if (this.selectedITMOption && this.selectedOTMOption) {
                return Number(this.selectedITMOption.strike_price) - Number(this.getMaximumLoss());
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

    const higherStrike = Number(this.selectedITMOption.strike_price);
    const lowerStrike = Number(this.selectedOTMOption.strike_price);
    const netDebit = Number(this.selectedITMOption.last_price) - Number(this.selectedOTMOption.last_price);

    const minPrice = Math.max(1, Math.floor(lowerStrike * 0.9));
    const maxPrice = Math.ceil(higherStrike * 1.1);
    const profitSeries = [];
    const lossSeries = [];

    for (let price = minPrice; price <= maxPrice; price++) {
        let pnl = 0;
        if (price <= lowerStrike) {
            pnl = higherStrike - lowerStrike - netDebit;
        } else if (price >= higherStrike) {
            pnl = -netDebit;
        } else {
            pnl = (higherStrike - price) - netDebit;
        }

        profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
        lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
    }

    this.chartSeries = [
        { name: 'Profit', data: profitSeries },
        { name: 'Loss', data: lossSeries },
    ];
}
    },
    watch: {
        selectedExpiration(newVal) {
            this.ITMOptions = this.in_the_money_puts[newVal];
            this.OTMOptions = this.out_of_the_money_puts[newVal];
            this.selectedITMOption = null;
            this.selectedOTMOption = null;
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
