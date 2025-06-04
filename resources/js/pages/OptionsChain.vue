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

                <v-container fluid class="pa-0" no-gutters>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <MarketStatus />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-alert type="info" color="blue-grey-lighten-4" text border="start" class="mb-3">
                                <div>
                                    <strong>Disclaimer:</strong>
                                    The price from <strong>Model - PolygonAPI</strong> is considered truth.
                                    All other prices and greeks have been calculated using the code
                                    <a href="https://github.com/mlandacoding/stocks-dashboard/tree/main/python/options_calculations" target="_blank"
                                        rel="noopener noreferrer" class="text-blue text-decoration-underline">
                                        here on GitHub
                                    </a>.
                                    This data is updated at the end of each day due to the computational cost.
                                </div>
                            </v-alert>
                        </v-col>
                    </v-row>

                    <v-col cols="12" sm="4">
                        <v-card class="pa-0" color="primary">
                            <LiveSingleStockComponent :symbols="symbolArr"></LiveSingleStockComponent>
                            <!-- <stock-card symbol="SPY" /> -->
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="12">
                        <v-row cols="12">
                            <v-col sm="11">
                                <span>
                                    <h2>Calls</h2>
                                </span>
                            </v-col>
                            <v-col sm="1" style="text-align: end;">
                                <v-chip color="green" text-color="white" label>
                                    In the Money
                                </v-chip>
                            </v-col>
                        </v-row>

                        <v-table density="compact"
                            style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em; background-color: #0c1427;">
                            <thead>
                                <tr>
                                    <th>Option Symbol</th>
                                    <th>Strike</th>
                                    <th>IV</th>
                                    <th>Model</th>
                                    <th>Last Price</th>
                                    <th>Delta</th>
                                    <th>Gamma</th>
                                    <th>Theta</th>
                                    <th>Rho</th>
                                    <th>Vega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(group, option_symbol) in groupedCalls" :key="option_symbol">
                                    <template v-for="(row, index) in group" :key="index">
                                        <tr>
                                            <!-- Only show merged columns on the first row of the group -->

                                            <template v-if="index === 0">
                                                <td :rowspan="group.length" :style="{
                                                    borderLeft: row.moneyness === 1 ? '4px solid green' : '4px solid red',
                                                    paddingLeft: row.moneyness === 1 ? '8px' : '4px solid red'
                                                }">
                                                    {{ row.option_symbol }}
                                                </td>
                                                <td :rowspan="group.length">{{ row.strike_price }}</td>
                                                <td :rowspan="group.length">{{ row.implied_volatility }}</td>
                                            </template>
                                            <!-- Skip merged cells for other rows -->
                                            <template v-else>
                                                <td v-for="i in 4" style="display: none;"></td>
                                            </template>

                                            <!-- Per-model data -->
                                            <td>{{ row.model }}</td>
                                            <td>{{ row.last_price }}</td>
                                            <td>{{ formatNullable(row.delta) }}</td>
                                            <td>{{ formatNullable(row.gamma) }}</td>
                                            <td>{{ formatNullable(row.theta) }}</td>
                                            <td>{{ formatNullable(row.rho) }}</td>
                                            <td>{{ formatNullable(row.vega) }}</td>
                                        </tr>
                                    </template>
                                </template>
                            </tbody>
                        </v-table>
                    </v-col>

                    <v-col cols="12" sm="12">
                        <v-row cols="12">
                            <v-col sm="11">
                                <span>
                                    <h2>Puts</h2>
                                </span>
                            </v-col>
                            <v-col justify="end" sm="1" style="text-align: end;">
                                <v-chip color="green" text-color="white" label>
                                    In the Money
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-table density="compact"
                            style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em; background-color: #0c1427;">
                            <thead>
                                <tr>
                                    <th>Option Symbol</th>
                                    <th>Strike</th>
                                    <th>IV</th>
                                    <th>Model</th>
                                    <th>Last Price</th>
                                    <th>Delta</th>
                                    <th>Gamma</th>
                                    <th>Theta</th>
                                    <th>Rho</th>
                                    <th>Vega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(group, option_symbol) in groupedPuts" :key="option_symbol">
                                    <template v-for="(row, index) in group" :key="index">
                                        <tr>
                                            <!-- Only show merged columns on the first row of the group -->

                                            <template v-if="index === 0">
                                                <td :rowspan="group.length" :style="{
                                                    borderLeft: row.moneyness === 1 ? '4px solid green' : '4px solid red',
                                                    paddingLeft: row.moneyness === 1 ? '8px' : '4px solid red'
                                                }">
                                                    {{ row.option_symbol }}
                                                </td>
                                                <td :rowspan="group.length">{{ row.strike_price }}</td>
                                                <td :rowspan="group.length">{{ row.implied_volatility }}</td>
                                            </template>
                                            <!-- Skip merged cells for other rows -->
                                            <template v-else>
                                                <td v-for="i in 4" style="display: none;"></td>
                                            </template>

                                            <!-- Per-model data -->
                                            <td>{{ row.model }}</td>
                                            <td>{{ row.last_price }}</td>
                                            <td>{{ formatNullable(row.delta) }}</td>
                                            <td>{{ formatNullable(row.gamma) }}</td>
                                            <td>{{ formatNullable(row.theta) }}</td>
                                            <td>{{ formatNullable(row.rho) }}</td>
                                            <td>{{ formatNullable(row.vega) }}</td>
                                        </tr>
                                    </template>
                                </template>
                            </tbody>
                        </v-table>
                    </v-col>

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
import { defineProps, ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import MarketStatus from '@/components/MarketStatus.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LiveSingleStockComponent from '@/components/LiveSingleStockComponent.vue';

const props = defineProps({
    symbol: String,
});
const showSearchDialog = ref(false);
const symbolArr = ref([props.symbol])

const drawer = ref(false);

const optionsChainCalls = ref([]);
const optionsChainPuts = ref([]);

const groupedCalls = ref([])
const groupedPuts = ref([])
// getChainCallsByUnderlyingAsset

const handleDrawerToggle = (value) => {
    drawer.value = value;
};

onMounted(async () => {
    try {
        const optionsCallsRes = await fetch(`/getChainCallsByUnderlyingAsset/${props.symbol}`);
        const optionsPutsRes = await fetch(`/getChainPutsByUnderlyingAsset/${props.symbol}`);

        optionsChainCalls.value = await optionsCallsRes.json();
        optionsChainPuts.value = await optionsPutsRes.json();

        groupedCalls.value = groupOptionsBySymbol(optionsChainCalls);
        groupedPuts.value = groupOptionsBySymbol(optionsChainPuts);
    } catch (error) {
        console.error('Failed to fetch options chain:', error);
    }
});

function groupOptionsBySymbol(optionChainValues) {
    const map = {};
    for (const row of optionChainValues.value) {
        if (!map[row.option_symbol]) map[row.option_symbol] = [];
        map[row.option_symbol].push(row);
    }
    return map;
}

function formatNullable(value) {
    return value !== null ? value : 'NULL';
}
</script>
