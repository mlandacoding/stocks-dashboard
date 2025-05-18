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

                <v-container fluid class="pa-0 pa-sm-5 ma-0" no-gutters>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <MarketStatus />
                        </v-col>
                    </v-row>

                    <v-col cols="12" sm="12">
                        <v-table density="compact" style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em; background-color: #0c1427;">
                        <thead>
                            <tr>
                                <th>Option Symbol</th>
                                <th>Type</th>
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
                            <template v-for="(group, option_symbol) in groupedOptions" :key="option_symbol">
                                <template v-for="(row, index) in group" :key="index">
                                    <tr>
                                        <!-- Only show merged columns on the first row of the group -->

                                        <template v-if="index === 0">
                                            <td
                                            :rowspan="group.length"
                                            :style="{
                                                borderLeft: row.moneyness === 1 ? '4px solid green' : '4px solid red',
                                                paddingLeft: row.moneyness === 1 ? '8px' : '4px solid red'
                                            }"
                                            >
                                            {{ row.option_symbol }}
                                            </td>
                                            <td :rowspan="group.length">{{ row.option_type }}</td>
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

const props = defineProps({
    symbol: String,
});

const drawer = ref(false);
const optionsChain = ref([]);

const handleDrawerToggle = (value) => {
    drawer.value = value;
};

onMounted(async () => {
    try {
        const response = await fetch(`/getOptionsChainByUnderlyingAsset/${props.symbol}`);
        optionsChain.value = await response.json();
    } catch (error) {
        console.error('Failed to fetch options chain:', error);
    }
});

const headers = [
    { title: 'Option Symbol', key: 'option_symbol' },
    { title: 'Type', key: 'option_type' },
    { title: 'Strike', key: 'strike_price' },
    { title: 'IV', key: 'implied_volatility' },
    { title: 'Last Price', key: 'last_price' },
    { title: 'Updated At', key: 'last_price_updated_at' },
    { title: 'Model', key: 'model' },
    { title: 'Moneyness', key: 'moneyness' },
    { title: 'Delta', key: 'delta' },
    { title: 'Gamma', key: 'gamma' },
    { title: 'Theta', key: 'theta' },
    { title: 'Rho', key: 'rho' },
    { title: 'Vega', key: 'vega' },
];

const groupedOptions = computed(() => {
    const map = {};
    for (const row of optionsChain.value) {
        if (!map[row.option_symbol]) map[row.option_symbol] = [];
        map[row.option_symbol].push(row);
    }
    return map;
});

function formatNullable(value) {
    return value !== null ? value : 'NULL';
}
</script>
