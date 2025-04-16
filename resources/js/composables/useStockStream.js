// src/composables/useStockStream.js
import { ref, computed, onMounted } from 'vue';

const initialSymbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA'];
const stocks = ref({});

// Initialize the stock records with only the raw data structure
initialSymbols.forEach(symbol => {
  stocks.value[symbol] = {
    sym: symbol,
    volume: null,
    accumulated_volume: null,
    official_open_price: null,
    vwap: null,
    previous_vwap: null, // raw previous value provided from stream updates
    open: null,
    close: null,
    high: null,
    low: null,
    average_size: null,
    updated: false,
  };
});

function useStockStream() {
  const formattedStocks = computed(() =>
    Object.entries(stocks.value).map(([symbol, data]) => ({
      sym: symbol,
      ...data,
    }))
  );

  const setupListeners = () => {
    window.Echo.channel('stocks').listen('StockPriceUpdated', payload => {
      payload.stocks.forEach(entry => {
        const symbol = entry.sym;
        const current = stocks.value[symbol];
        if (current) {
          // Store the previous VWAP for the consumer (but note:
          // the "flash" behavior will be handled in the UI)
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
  };

  onMounted(() => {
    if (window.Echo) {
      setupListeners();
    } else {
      // Wait for Echo to become available
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

export default useStockStream;
