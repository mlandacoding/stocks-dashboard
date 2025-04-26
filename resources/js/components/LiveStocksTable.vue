<template>
    <div style="border: 1px solid rgba(255, 255, 255, 0.2) !important;border-radius: 1px;">


        <v-card-title class="d-flex align-center pe-2">
            Popular Stocks

            <v-spacer></v-spacer>

            <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" flat
                hide-details single-line></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="stocks" density="compact" :search="search" :items-per-page="10"
            class="custom-table">
            <template #item.sym="{ item }">
                <div class="d-flex align-center gap-2">
                    <v-avatar size="32" rounded="1" class="bg-white">
                        <img v-if="logoStatus[item.sym]?.local" :src="`/storage/images/logos/${item.sym}.png`"
                            alt="Local Logo" class="w-100 h-100" />
                        <img v-else-if="logoStatus[item.sym]?.remote"
                            :src="`https://cdn.brandfetch.io/${item.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`"
                            alt="Brandfetch Logo" class="w-100 h-100" />
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="75%" height="75%"
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
                <v-btn v-if="$vuetify.display.mdAndUp" color="primary" variant="flat" prepend-icon="mdi-chart-line"
                    class="text-white text-capitalize font-weight-bold" @click="showStockGraph(item.sym)"
                    style="border: 1px solid rgba(255, 255, 255, 0.2) !important;border-radius: 1px;">
                </v-btn>
            </template>
            <template v-slot:bottom>
                <v-container class="text-end">
                Pricing delayed approximately 15 minutes*
                </v-container>

            </template>
        </v-data-table>
    </div>
    <!-- </v-container> -->
</template>

<script>
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
                { title: '% Change', key: 'percentage_change' , align: 'end'},
                { title: 'Chart', key: 'chart' },
            ],
            prevCloseMap: {},
            hasPreloaded: false,
            popular_stocks: ['META', 'MSFT', 'AMZN','TSLA',
            'NVDA', 'GOOGL','AAPL','AMD',
            'MSFT', 'BRK.B','TSMC','AVGO']
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
                this.stocks = (
    await Promise.all(newVal.map(async (stock) => {
        if (this.popular_stocks.includes(stock.sym)) {
            const existing = this.stocks.find(s => s.sym === stock.sym);
            const prevVWAP = existing?.vwap ?? null;
            const vwapChanged = prevVWAP !== null && stock.vwap !== prevVWAP;

            let percentageChange = null;
            let priceChange = null;

            const matched = this.prevCloseMap.find(entry => entry.symbol === stock.sym);
            const prevClose = matched ? matched.prev_day_close : null;

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
        }

        // Non-popular stocks return nothing
        return null;
            }))
        ).filter(Boolean);

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
                if (!this.hasPreloaded && newVal.length > 0) {
                    this.preloadLogosForStocks(newVal);
                    this.hasPreloaded = true;
                }
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
                this.$emit('show-graph', {
                    sym: stock.sym,
                    previous_close: stock.prev_day_close
                });
            }
        }

    },
    async mounted() {
        try {
            const prevCloseRes = await fetch('/storage/cache/previous_close.json');
            const previousCloseData = await prevCloseRes.json();

            this.prevCloseMap = previousCloseData;
        } catch (error) {
            console.error('Failed to load prevCloseMap:', error);
        }

        const logos = import.meta.glob('/storage/images/logos/*.png');
        Object.keys(logos).forEach(path => {
            const symbol = path.split('/').pop().replace('.png', '');
            this.logoStatus[symbol] = { local: true };
        });

        this.popular_stocks.forEach((value) =>{
            const stock = {
                symbol: value,
                vwap: 172.34
            };
            this.stocks.push(stock);
        });
    }
};
</script>

<style scoped>
@import '../../css/liveStocksTable.css';
</style>
