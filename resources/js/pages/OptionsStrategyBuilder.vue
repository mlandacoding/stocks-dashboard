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



                    <v-row dense class="ma-0 pa-1">
                        <v-col>
                            <h3>Options Strategy Builder</h3>
                            <h4>Strategy: {{ strategy }}</h4>
                            <h4>Symbol: {{ symbol }}</h4>
                        </v-col>
                    </v-row>
                    <v-col cols="12" sm="4" class="ma-1 pa-1">
                        <v-card class="pa-0" color="primary">
                            <LiveSingleStockComponent :symbols="[symbol]"></LiveSingleStockComponent>
                        </v-card>
                    </v-col>
                    <br>

                    <v-row dense class="ma-0 pa-1">
                        <v-col cols="12" sm="12">
                            <BullCallSpread v-if="strategy == 'bullSpread'"
                                :strategy="strategy"
                                :symbol="symbol"
                                :callsByExpiration="callsByExpiration"
                                :out_of_the_money_calls="out_of_the_money_calls"
                                :in_the_money_calls="in_the_money_calls">
                            </BullCallSpread>

                            <BearPutSpread v-if="strategy == 'bearSpread'"
                                :strategy="strategy"
                                :symbol="symbol"
                                :putsByExpiration="putsByExpiration"
                                :out_of_the_money_puts="out_of_the_money_puts"
                                :in_the_money_puts="in_the_money_puts">
                            </BearPutSpread>

                            <LongStraddle v-if="strategy == 'longStraddle'"
                                :strategy="strategy"
                                :symbol="symbol"
                                :expirationDates="expirationDates"
                                :in_the_money_calls="in_the_money_calls"
                                :in_the_money_puts="in_the_money_puts">
                            </LongStraddle>
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
import LiveSingleStockComponent from '@/components/LiveSingleStockComponent.vue';
import BullCallSpread from '@/components/options/BullCallSpread.vue';
import BearPutSpread from '@/components/options/BearPutSpread.vue';
import LongStraddle from '@/components/options/LongStraddle.vue';

export default {
    name: 'OptionsStrategyBuilder',
    props: {
        strategy: String,
        symbol: String,
        in_the_money_calls: Object,
        out_of_the_money_calls: Object,
        in_the_money_puts: Object,
        out_of_the_money_puts: Object,
        callsByExpiration: Object,
        putsByExpiration: Object,
        expirationDates: Object
    },
    components: {
        Navbar,
        Sidebar,
        MarketStatus,
        FooterComponent,
        LiveSingleStockComponent,
        BullCallSpread,
        BearPutSpread,
        LongStraddle
    },
    data() {
        return {
            drawer: false,
        }
    },
    mounted() {
    },
    methods: {
        handleDrawerToggle() {
            this.drawer = !this.drawer;
        },

    },
    watch: {
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
