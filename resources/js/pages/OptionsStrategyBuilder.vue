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

                        <v-col>
                            <v-alert v-if="maximumProfit.toFixed(2) < maximumLoss.toFixed(2) " color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
                            Your selected options result in a maximum profit that is less than the maximum loss.
                            You would be paying more in premiums than you would gain from the strategy.
                        </v-alert>

                            <v-card v-if="selectedITMOption && selectedOTMOption" class="mt-4">
                                <v-card-title>Strategy Summary</v-card-title>
                                <v-card-text>
                                    <p><strong>Selected In the Money Option:</strong> {{ selectedITMOption.option_symbol }}</p>
                                    <p><strong>Selected Out of the Money Option:</strong> {{ selectedOTMOption.option_symbol }}</p>
                                    <p><strong>Maximum Loss:</strong> ${{ maximumLoss.toFixed(2) }}</p>
                                    <p><strong>Maximum Profit:</strong> ${{ maximumProfit.toFixed(2) }}</p>
                                    <p><strong>Break Even:</strong> ${{ breakEven.toFixed(2) }}</p>
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
            breakEven: 0
        };
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
                console.log(this.selectedITMOption.strike_price);
                console.log(this.getMaximumLoss());
                console.log(Number(this.selectedITMOption.strike_price) + Number(this.getMaximumLoss()));
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
        }
    },
    watch: {
        selectedExpiration(newVal) {
            this.ITMOptions = this.in_the_money_calls[newVal];
            this.OTMOptions = this.out_of_the_money_calls[newVal];
        },
        selectedITMOption() {
            this.updateMetrics();
        },
        selectedOTMOption() {
            this.updateMetrics();
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
