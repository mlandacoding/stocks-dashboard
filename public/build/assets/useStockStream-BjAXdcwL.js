import { s as computed, g as ref, h as onMounted, i as axios } from "./app-B8Z1Fyv-.js";
const stocks = ref({});
function setupWebSocketListeners() {
  window.Echo.channel("stocks").listen("StockPriceUpdated", (payload) => {
    payload.stocks.forEach((entry) => {
      const symbol = entry.sym;
      if (!stocks.value[symbol]) {
        stocks.value[symbol] = { sym: symbol };
      }
      const current = stocks.value[symbol];
      current.previous_vwap = current.vwap ?? null;
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
        updated: true
      });
    });
  });
}
function ensureWebSocketConnection() {
  if (window.Echo) {
    setupWebSocketListeners();
  } else {
    const wait = setInterval(() => {
      if (window.Echo) {
        setupWebSocketListeners();
        clearInterval(wait);
      }
    }, 100);
  }
}
async function fetchSymbolsFromAPI() {
  try {
    const response = await axios.get("/active-assets");
    const symbols = response.data.symbols || [];
    symbols.forEach((symbol) => {
      if (!stocks.value[symbol]) {
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
          updated: false
        };
      }
    });
  } catch (error) {
    console.error("Error fetching active assets:", error);
  }
}
function useStockStream() {
  const formattedStocks = computed(
    () => Object.values(stocks.value).map((stock) => ({
      sym: stock.sym,
      ...stock
    }))
  );
  onMounted(async () => {
    await fetchSymbolsFromAPI();
    ensureWebSocketConnection();
  });
  return {
    formattedStocks
  };
}
export {
  useStockStream as u
};
