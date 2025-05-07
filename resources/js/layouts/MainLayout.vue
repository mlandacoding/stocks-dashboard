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

                <v-container fluid class="pa-0 pa-sm-5 ma-0">
                    <v-row justify="end">
                        <v-col cols="auto">
                            <MarketStatus />
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="mb-4" no-gutters>


                        <v-col cols="12" sm="4">
                            <v-card class="pa-0" color="primary">
                                <stock-card symbol="SPY" />
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-card class="pa-0" color="primary">
                                <stock-card symbol="IWM" />
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-card class="pa-0" color="primary">
                                <stock-card symbol="DIA" />
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row justify="center">

                        <v-col cols="12" sm="4">
                            <LiveStocksTable title="Popular Stocks" :symbols="popular_stocks" @show-graph="updateSymbol"></LiveStocksTable>
                            <!-- <LiveStocksTable @show-graph="updateSymbol"></LiveStocksTable> -->
                        </v-col>
                        <v-col cols="12" sm="8">
                            <IntradayGraph :symbol="symbol" :previous_close="previousClose" :key="symbol">
                            </IntradayGraph>
                        </v-col>
                    </v-row>

                    <v-row justify="center" class="mb-4">
                        <v-col>
                            <SectorPerformanceGraph></SectorPerformanceGraph>
                        </v-col>

                        <v-col>
                            <LiveStocksTable title="Todays Winners" :symbols="winners" @show-graph="updateSymbol"></LiveStocksTable>
                        </v-col>

                        <v-col>
                            <LiveStocksTable title="Todays Losers" :symbols="losers" @show-graph="updateSymbol"></LiveStocksTable>
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

<script setup>
import { ref } from "vue";
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import StockCard from '@/components/StockCardComponent.vue';
import MarketStatus from "@/components/MarketStatus.vue";
import IntradayGraph from "@/components/IntradayGraph.vue";
import LiveStocksTable from "@/components/LiveStocksTable.vue";
import SectorPerformanceGraph from "@/components/SectorPerformanceGraph.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { onMounted } from 'vue';
import axios from 'axios';

const drawer = ref(false);
const symbol = ref('SPY')
const previousClose = ref('')

const losers = ref([])
const winners = ref([])
const popular_stocks = ref(['META', 'MSFT', 'AMZN','TSLA','NVDA', 'GOOGL','AAPL','AMD','MSFT', 'BRK.B','TSMC','PLTR'])

function updateSymbol({ sym, previous_close }) {
    symbol.value = sym;
    previousClose.value = previous_close;
}

const handleDrawerToggle = (value) => {
    drawer.value = value;
};



onMounted(async () => {
    try {
        const winRes = await axios.get(`winners_and_losers`);
        losers.value = winRes.data['losers'].map(item => item.symbol);
        winners.value = winRes.data['winners'].map(item => item.symbol);
    } catch (error) {
        console.error('Failed to fetch losers:', error);
    }
});

</script>
