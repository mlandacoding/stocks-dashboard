<template>
    <v-container style="color:aqua" class="py-12 custom-card">
        <h5 class="font-semibold mb-4">* Prices have a delay of 15 minutes</h5>

        <v-text-field v-model="search" label="Search by symbol" prepend-inner-icon="mdi-magnify" class="mb-4"
            clearable />

        <v-data-table :headers="headers" :items="stocks" :search="search" :items-per-page="5" class="custom-table">
            <template #item.sym="{ item }">
                <div class="d-flex align-center gap-2">
                    <v-avatar size="32" rounded class="bg-white">
                        <img v-if="logoStatus[item.sym]?.local" :src="`/storage/images/logos/${item.sym}.png`"
                            alt="Local Logo" class="w-100 h-100" />
                        <img v-else-if="logoStatus[item.sym]?.remote"
                            :src="`https://cdn.brandfetch.io/${item.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`"
                            alt="Brandfetch Logo" class="w-100 h-100" />
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="90%" height="90%"
                            class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </v-avatar>

                    <span>{{ item.sym ?? '—' }}</span>
                </div>
            </template>
            <template #item.vwap="{ item }">
                <span :class="[
                    'font-mono transition-all duration-300',
                    {
                        'text-red': item.previous_vwap !== null && item.vwap < item.previous_vwap,
                        'text-green': item.previous_vwap !== null && item.vwap > item.previous_vwap,
                        'bg-green-lighten-4': flashStates[item.sym] && item.vwap > item.previous_vwap,
                        'bg-red-lighten-4': flashStates[item.sym] && item.vwap < item.previous_vwap,
                    }
                ]">
                    ${{ item.vwap != null ? item.vwap.toFixed(2) : '—' }}
                </span>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import useStockStream from '@/composables/useStockStream';

const search = ref('');
const { formattedStocks: globalFormattedStocks } = useStockStream();
const stocks = ref([]);

// Create a local reactive object to control the flash state for each stock symbol.
const flashStates = ref({});

// Initialize flash states for the expected symbols.
['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA'].forEach(symbol => {
    flashStates.value[symbol] = false;
});

// Watch for changes in the streamed stock data and trigger a flash effect when VWAP changes.
watch(
    globalFormattedStocks,
    (newVal) => {
        stocks.value = newVal.map(stock => {
            const existing = stocks.value.find(s => s.sym === stock.sym);
            const prevVWAP = existing?.vwap ?? null;

            const vwapChanged = prevVWAP !== null && stock.vwap !== prevVWAP;

            return {
                ...stock,
                previous_vwap: prevVWAP,
                vwapFlash: vwapChanged,
            };
        });

        // Clear flash flags after short delay
        setTimeout(() => {
            stocks.value.forEach(s => (s.vwapFlash = false));
        }, 600);
    },
    { immediate: true, deep: true }
);

// Define table headers.
const headers = [
    { title: 'Symbol', key: 'sym' },
    { title: 'Price', key: 'vwap' },
    { title: '% Change', },

];

const logoStatus = ref({});

const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

function preloadLogosForStocks(stocks) {
    stocks.forEach(stock => {
        const symbol = stock.sym;

        // Only check if not already in cache
        if (!logoStatus.value[symbol]) {
            const local = `/storage/images/logos/${symbol}.png`;
            const remote = `https://cdn.brandfetch.io/${symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`;

            checkIfImageExists(local, exists => {
                logoStatus.value[symbol] = { ...(logoStatus.value[symbol] || {}), local: exists };
            });

            checkIfImageExists(remote, exists => {
                logoStatus.value[symbol] = { ...(logoStatus.value[symbol] || {}), remote: exists };
            });
        }
    });
}

// Recheck logos when stocks update
watch(stocks, (newVal) => {
    preloadLogosForStocks(newVal);
}, { immediate: true });

function checkIfImageExists(src, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = src;
}

</script>

<style scoped>
.gap-2 {
    gap: 0.5rem;
}

/* Dark theme styling */
.custom-card {
    background-color: #0c1427 !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
}

/* Force Search Bar to Stay Dark */
.custom-input :deep(.v-input__control) {
    background: #1a2238 !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

/* Make sure text is visible */
.custom-input :deep(.v-field__input) {
    color: rgb(255, 255, 255) !important;
    background-color: #0c1427 !important;
}

/* Keep background dark when focused */
.custom-input :deep(.v-input.v-input--focused) .v-input__control {
    background: #1a2238 !important;
    border-color: white !important;
}

/* Fix label color */
.custom-input :deep(.v-label) {
    color: rgba(255, 255, 255, 0.7) !important;
}

/* Table styling */
.custom-table {
    background: #0c1427 !important;
    color: white !important;
}

/* Table header styling */
.custom-table .v-data-table-header {
    background: #1a2238 !important;
    color: white !important;
    font-weight: bold;
}

/* Remove hover effect from table headers */
.custom-table .v-data-table-header th:hover {
    background: none !important;
}

/* Table row hover effect */
.custom-table .v-data-table__tbody tr:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}

/* Thinner Border Lines */
.custom-table .v-data-table__th,
.custom-table .v-data-table__td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
}
</style>
