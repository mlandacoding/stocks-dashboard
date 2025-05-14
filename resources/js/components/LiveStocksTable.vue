<template>
    <div style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em;">
        <v-card-title v-if="title && chartButton" class="d-flex align-center pe-2">
            {{ title }}
            <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table :headers="headers" :items="stocks" density="compact" :search="search" :items-per-page="10"
            class="custom-table" @click:row="goToProfile" :hover=true>
            <template #item.company_name="{ item }">
                {{ title }}
            </template>

            <template #item.sym="{ item }">
                <div class="d-flex align-center gap-2">
                    <v-avatar size="32" rounded="1" class="bg-white">
                        <img v-if="logoStatus[item.sym]?.local" :src="`/storage/images/logos/${item.sym}.png`"
                            alt="Local Logo" class="w-100 h-100" />
                        <img v-else-if="logoStatus[item.sym]?.remote"
                            :src="`https://cdn.brandfetch.io/${item.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`"
                            alt="Brandfetch Logo" class="w-100 h-100" />
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="60%" height="60%"
                            class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </v-avatar>
                    <span v-if="!this.chartButton">{{ title }} <span style="color: #5E75E8;">[{{ item.sym ?? '—'
                            }}]</span></span>
                    <span v-else>[{{ item.sym ?? '—' }}]</span>
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
                <div class="d-flex gap-2 text-end justify-end text-end">
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

            <template #item.chart="{ item }">
                <v-btn color="primary" variant="flat" prepend-icon="mdi-chart-line"
                    class="text-white text-capitalize font-weight-bold" @click="showStockGraph(item.sym)"
                    style="border: 1px solid rgba(255, 255, 255, 0.2) !important;border-radius: 1px;">
                </v-btn>
            </template>

            <template v-slot:bottom>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import useStockStream from '@/composables/useStockStream';



export default {
    props: {
        title: {
            type: String,
        },
        symbols: {
            type: Array,
        },
        chartButton: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            search: '',
            stocks: [],
            flashStates: {},
            logoStatus: {},
            apiKey: import.meta.env.VITE_POLYGON_API_KEY,
            headers: [],
            prevCloseMap: {},
            hasPreloaded: false,
            isReady: false,
            stockGraphLoading: false
        };
    },
    setup() {
        const { formattedStocks: globalFormattedStocks } = useStockStream();
        return { globalFormattedStocks };
    },
    watch: {
        globalFormattedStocks: {
            async handler() {
                await this.rebuildStocks();
            },
            immediate: true,
            deep: true
        },
        symbols(newSymbols) {
            this.rebuildStocks();
        },
        stocks: {
            handler(newVal) {
                if (!this.hasPreloaded && newVal.length > 0) {
                    this.preloadLogosForStocks(newVal);
                    this.hasPreloaded = true;
                }
            },
            immediate: true
        }
    },
    methods: {
        async rebuildStocks() {
            if (!this.isReady || !this.symbols.length) return;

            this.latestVWAPCache = this.latestVWAPCache || {};

            this.stocks = (
                await Promise.all(this.globalFormattedStocks.map(async (stock) => {
                    if (!this.symbols.includes(stock.sym)) return null;

                    const existing = this.stocks.find(s => s.sym === stock.sym);
                    const prevVWAP = existing?.vwap ?? null;
                    const vwapChanged = prevVWAP !== null && stock.vwap !== prevVWAP;

                    let percentageChange = null;
                    let priceChange = null;

                    const matched = this.prevCloseMap.find(entry => entry.symbol === stock.sym);
                    let prevClose = matched ? matched.prev_day_close : null;
                    let latest_vwap = null;

                    // Fallback logic
                    if (stock.vwap == null) {
                        // Fetch prev close if missing
                        if (prevClose == null) {
                            try {
                                const prevRes = await axios.get(`/prev_close/${stock.sym}`);
                                prevClose = parseFloat(prevRes.data['prev_day_close']);
                            } catch {
                                prevClose = 0;
                            }
                        }

                        // Fetch latest price only once per symbol
                        if (this.latestVWAPCache[stock.sym] !== undefined) {
                            latest_vwap = this.latestVWAPCache[stock.sym];
                        } else {
                            try {
                                const latestRes = await axios.get(`/latest_price/${stock.sym}`);
                                latest_vwap = parseFloat(latestRes.data['price']);
                                this.latestVWAPCache[stock.sym] = latest_vwap;
                            } catch {
                                latest_vwap = -1;
                                this.latestVWAPCache[stock.sym] = latest_vwap;
                            }
                        }
                    }

                    const effectiveVWAP = latest_vwap ?? stock.vwap ?? existing?.vwap ?? null;


                    if (stock.vwap == null && effectiveVWAP !== null) {
                        stock.vwap = effectiveVWAP;
                    }


                    if (!prevClose || prevClose === 0 || effectiveVWAP === null) return null;

                    percentageChange = ((effectiveVWAP - prevClose) / prevClose) * 100;
                    percentageChange = percentageChange.toFixed(2);
                    priceChange = (effectiveVWAP - prevClose).toFixed(2);

                    return {
                        ...stock,
                        previous_vwap: prevVWAP,
                        vwapFlash: vwapChanged,
                        prev_day_close: prevClose,
                        vwap: effectiveVWAP,
                        percentageChange,
                        priceChange,
                    };
                }))
            ).filter(Boolean);

            setTimeout(() => {
                this.stocks.forEach(s => (s.vwapFlash = false));
            }, 600);
        },
        checkIfImageExists(src, callback) {
            const img = new Image();
            img.onload = () => callback(true);
            img.onerror = () => callback(false);
            img.src = src;
        },
        preloadLogosForStocks(stocks) {
            stocks.forEach(stock => {
                const symbol = stock.sym;
                if (this.logoStatus[symbol]?.local) return;
                if (!this.logoStatus[symbol]) {
                    const remote = `https://cdn.brandfetch.io/${symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${this.apiKey}`;
                    this.checkIfImageExists(remote, exists => {
                        this.logoStatus[symbol] = {
                            ...(this.logoStatus[symbol] || {}),
                            remote: exists
                        };
                    });
                }
            });
        },
        showStockGraph(sym) {
            const stock = this.stocks.find(s => s.sym === sym);
            if (stock) {
                this.stockGraphLoading = true;
                this.$emit('show-graph', {
                    sym: stock.sym,
                    previous_close: stock.prev_day_close
                });
            }
        },
        goToProfile(event, row) {
            if (!this.stockGraphLoading) {
                window.location.href = `/company_profile/${row.item.sym}`;
            }
            this.stockGraphLoading = false;
            //
        }
    },
    async created() {
        try {
            const prevCloseRes = await fetch('/storage/cache/previous_close.json');
            const previousCloseData = await prevCloseRes.json();
            this.prevCloseMap = previousCloseData;
        } catch (error) {
            console.error('Failed to load prevCloseMap:', error);
        }
        this.isReady = true;

        if (this.chartButton) {
            this.headers = [
                { title: 'Symbol', key: 'sym' },
                { title: 'Price', key: 'vwap' },
                { title: '% Change', key: 'percentage_change', align: 'end' },
                { title: 'Chart', key: 'chart' },
            ]
        } else {
            this.headers = [
                { title: 'Data Delayed', key: 'sym' },
                { title: 'Price', key: 'vwap' },
                { title: '% Change', key: 'percentage_change', align: 'end' },

            ]
        }

    }
};
</script>

<style scoped>
@import '../../css/liveStocksTable.css';
</style>
