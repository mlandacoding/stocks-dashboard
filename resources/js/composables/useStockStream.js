// src/composables/useStockStream.js
import { ref, computed, onMounted } from 'vue';

const initialSymbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA', 'SPY', 'IWM', 'DIA'];
const stocks = ref({});

initialSymbols.forEach(symbol => {
  stocks.value[symbol] = {
    sym: symbol,
    volume: null,
    accumulated_volume: null,
    official_open_price: null,
    vwap: null,
    previous_vwap: null,
    open: null,
    close: null,
    high: null,
    low: null,
    average_size: null,
    updated: false,
  };
});

function setupListeners() {
  window.Echo.channel('stocks').listen('StockPriceUpdated', payload => {
    payload.stocks.forEach(entry => {
      const symbol = entry.sym;
      const current = stocks.value[symbol];
      if (current) {
        current.previous_vwap = current.vwap;
        Object.assign(current, {
          volume: entry.v,
          accumulated_volume: entry.av,
          official_open_price: entry.op,
          vwap: entry.vw,
          open: entry.o,
          close: entry.c,
          high: entry.h,
          low: entry.l,
          average_size: entry.a,
          updated: true,
        });
      }
    });
  });
}

export default function useStockStream() {
  const formattedStocks = computed(() =>
    Object.entries(stocks.value).map(([symbol, data]) => ({
      sym: symbol,
      ...data,
    }))
  );

  onMounted(() => {
    if (window.Echo) {
      setupListeners();
    } else {
      const wait = setInterval(() => {
        if (window.Echo) {
          setupListeners();
          clearInterval(wait);
        }
      }, 100);
    }
  });

  return {
    formattedStocks,
  };
}
