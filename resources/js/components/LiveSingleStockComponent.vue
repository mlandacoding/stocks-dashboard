<template>
    <div style="border: 1px solid rgba(255, 255, 255, 0.5); min-height: 64px;" class="d-flex align-center">
      <v-row class="w-100 h-100 pa-0 pa-sm-2 ma-0" no-gutters align="center">
        <v-col cols="7" class="h-100">
          <div class="d-flex align-center gap-2 h-100">
            <v-avatar size="32" rounded="1" class="bg-white">
              <img v-if="logoStatus[stock.sym]?.local" :src="`/storage/images/logos/${stock.sym}.png`"
                alt="Local Logo" class="w-100 h-100" />
              <img v-else-if="logoStatus[stock.sym]?.remote"
                :src="`https://cdn.brandfetch.io/${stock.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`"
                alt="Brandfetch Logo" class="w-100 h-100" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="60%" height="60%"
                class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
              </svg>
            </v-avatar>
            <span style="font-size: 14px;">{{ title }} <span style="color: #5E75E8;">[{{ stock.sym ?? '—' }}]</span></span>
          </div>
        </v-col>

        <v-col class="h-100 d-flex align-center">
          <div>${{ stock.vwap }}</div>
        </v-col>

        <v-col class="h-100 d-flex align-center justify-end">
          <div class="d-flex align-center gap-2">
            <span class="font-weight-bold">{{ stock.priceChange }}</span>
            <span :style="{
                backgroundColor: stock.percentageChange < 0
                  ? 'rgba(244, 67, 54, 0.2)'
                  : stock.percentageChange > 0
                    ? 'rgba(76, 175, 80, 0.2)'
                    : 'transparent'
              }"
              :class="[
                'font-mono px-2 py-1 rounded',
                stock.percentageChange < 0 ? 'text-red' :
                stock.percentageChange > 0 ? 'text-green' : 'text-grey'
              ]">
              {{ stock.percentageChange }}%
            </span>
          </div>
        </v-col>
      </v-row>
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
            stockGraphLoading: false,
            stock: ''
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

                    if (stock.vwap == null) {
                        if (prevClose == null) {
                            try {
                                const prevRes = await axios.get(`/prev_close/${stock.sym}`);
                                prevClose = parseFloat(prevRes.data['prev_day_close']);
                            } catch {
                                prevClose = 0;
                            }
                        }

                        try {
                            const latestRes = await axios.get(`/latest_price/${stock.sym}`);
                            latest_vwap = parseFloat(latestRes.data['price']);
                        } catch {
                            latest_vwap = -1;
                        }
                    }

                    const effectiveVWAP = latest_vwap ?? stock.vwap;

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

            this.stock = this.stocks[0];

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


        this.headers = [
            { title: '', key: 'sym' },
            { title: 'Price', key: 'vwap' },
            { title: '% Change', key: 'percentage_change', align: 'end' },

        ]


    }
};
</script>

<style scoped>
@import '../../css/liveStocksTable.css';
</style>
