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
            <template #item.percentage_change="{ item }">
                <div class="d-flex align-center gap-2">
                    <span><b>{{ item.priceChange }}</b></span>
                    <span :style="{
                        backgroundColor: item.percentageChange < 0
                            ? 'rgba(244, 67, 54, 0.2)'
                            : item.percentageChange > 0
                                ? 'rgba(76, 175, 80, 0.2)'
                                : 'transparent'
                    }" :class="[
                        'font-mono px-2 py-1 rounded',
                        item.percentageChange < 0
                            ? 'text-red'
                            : item.percentageChange > 0
                                ? 'text-green'
                                : 'text-grey'
                    ]">
                        {{ item.percentageChange }}%
                    </span>
                </div>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import useStockStream from '@/composables/useStockStream';

export default {
    name: 'LiveStocksTable',
    data() {
        return {
            search: '',
            stocks: [],
            flashStates: {},
            logoStatus: {},
            apiKey: import.meta.env.VITE_POLYGON_API_KEY,
            headers: [
                { title: 'Symbol', key: 'sym' },
                { title: 'Price', key: 'vwap' },
                { title: '% Change', key: 'percentage_change' },
            ],
        };
    },
    setup() {
        const { formattedStocks: globalFormattedStocks } = useStockStream();
        return { globalFormattedStocks };
    },
    watch: {
        globalFormattedStocks: {
        async handler(newVal) {
            // Update the stocks array based on the incoming formatted stocks
            this.stocks = await Promise.all(newVal.map(async (stock) => {
                const existing = this.stocks.find(s => s.sym === stock.sym);
                const prevVWAP = existing?.vwap ?? null;
                const vwapChanged = prevVWAP !== null && stock.vwap !== prevVWAP;

                let percentageChange = null;
                let priceChange = null;
                let prevClose = existing?.prev_day_close;

                // Check if prev_day_close exists; if not, fetch it
                if (!prevClose) {
                    try {
                        const response = await axios.get(`/stocks_overview/company_name/${stock.sym}`);
                        prevClose = response.data.prev_day_close;
                    } catch (error) {
                        console.error(`Error fetching prev_day_close for ${stock.sym}:`, error);
                    }
                }

                // Calculate percentage change and price change if we have prevClose and vwap
                if (prevClose != null && stock.vwap != null) {
                    percentageChange = ((stock.vwap - prevClose) / prevClose) * 100;
                    percentageChange = percentageChange.toFixed(2);
                    priceChange = (stock.vwap - prevClose).toFixed(2);
                }

                return {
                    ...stock,
                    previous_vwap: prevVWAP,
                    vwapFlash: vwapChanged,
                    prev_day_close: prevClose,
                    percentageChange,
                    priceChange,
                };
            }));

            // Reset the flash state after a short delay
            setTimeout(() => {
                this.stocks.forEach(s => (s.vwapFlash = false));
            }, 600);
        },
        immediate: true,
        deep: true
    },
    stocks: {
        handler(newVal) {
            this.preloadLogosForStocks(newVal);
        },
        immediate: true
    }
    },
    methods: {
        checkIfImageExists(src, callback) {
            const img = new Image();
            img.onload = () => callback(true);
            img.onerror = () => callback(false);
            img.src = src;
        },
        preloadLogosForStocks(stocks) {
            stocks.forEach(stock => {
                const symbol = stock.sym;
                if (!this.logoStatus[symbol]) {
                    const local = `/storage/images/logos/${symbol}.png`;
                    const remote = `https://cdn.brandfetch.io/${symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${this.apiKey}`;

                    this.checkIfImageExists(local, exists => {
                        this.logoStatus[symbol] = {
                            ...(this.logoStatus[symbol] || {}),
                            local: exists
                        };
                    });

                    this.checkIfImageExists(remote, exists => {
                        this.logoStatus[symbol] = {
                            ...(this.logoStatus[symbol] || {}),
                            remote: exists
                        };
                    });
                }
            });
        },

        async enrichStocksV2(){
            for (let stock of this.stocks) {
                if (!stock.prev_day_close) {  // Only enrich if `prev_day_close` is missing
                    const response = await axios.get(`/stocks_overview/company_name/${stock.sym}`);
                    stock.prev_day_close = response.data.prev_day_close;
                }
            }
        }
    },
    async mounted() {
        // await this.enrichStocks();
    }
};
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
