<template>

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>All Global Data</title>
        <meta name="description"
            content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data." />
    </head>

    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-sheet class="custom-width-wrapper">
        <v-layout style="background: #0c1427;">
            <!-- Navbar -->
            <Navbar @toggle-drawer="handleDrawerToggle" />

            <!-- Sidebar Navigation Drawer -->
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />

            <!-- Main Content -->
            <v-main :class="{ 'content-expanded': !drawer, 'content-shrinked': drawer }">

                <v-container fluid class="pa-0 pa-sm-5 ma-0" no-gutters>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <MarketStatus />
                        </v-col>
                    </v-row>

                    <v-row justify="center" class="pa-0 pa-sm-5 ma-0" no-gutters>

                        <v-col cols="12" sm="3">

                        <LiveStocksTable :title="asset_details.name" :symbols="symbol_array" @show-graph="updateSymbol" :chartButton="false"/>

                        <template v-if="smAndDown">
                            <IntradayGraph :symbol="symbol" :previous_close="previousClose" :key="symbol" />
                        </template>

                        <v-card
                            style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em;"
                            color="primary"
                        >
                            <v-col cols="3"><strong>Description:</strong></v-col>
                            <v-col cols="12">{{ asset_details.description }}</v-col>
                            <v-divider class="my-3"></v-divider>
                            <v-col cols="3"><strong>Total Employees:</strong></v-col>
                            <v-col cols="9">{{ asset_details.total_employees }}</v-col>
                        </v-card>
                        </v-col>

                        <v-col v-if="!smAndDown" cols="12" sm="8">
                            <IntradayGraph :symbol="symbol" :previous_close="previousClose" :key="symbol" />
                        </v-col>
                    </v-row>
                    {{ asset_details }}

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
import { defineProps, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import LiveStocksTable from '@/components/LiveStocksTable.vue';
import MarketStatus from "@/components/MarketStatus.vue";
import IntradayGraph from "@/components/IntradayGraph.vue";
import FooterComponent from '@/components/FooterComponent.vue';
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const props = defineProps({
  symbol: String,
  asset_details: Object
});

const symbol = ref(props.symbol);
const normalizedSymbol = props.symbol?.toUpperCase() ?? '';
const symbol_array = ref([normalizedSymbol]);
const previousClose = ref('');
const drawer = ref(false);

const handleDrawerToggle = (value) => {
  drawer.value = value;
};

// Update symbol on user interaction
function updateSymbol({ sym, previous_close }) {
  symbol.value = sym;
  symbol_array.value = [sym];
  previousClose.value = previous_close;
}
</script>
