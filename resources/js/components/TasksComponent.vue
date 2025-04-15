<template>
    <v-container class="py-12" style="color:aqua">
      <h1 class="text-2xl font-bold mb-12 text-center" style="color: aqua">Stonks App</h1>

      <h5 class="font-semibold mb-4">* Prices have a delay of 15 minutes</h5>

      <v-text-field
        v-model="search"
        label="Search by symbol"
        prepend-inner-icon="mdi-magnify"
        class="mb-4"
        clearable
      />

      <v-data-table
        :headers="headers"
        :items="formattedStocks"
        :search="search"
        :items-per-page="5"
        class="elevation-2"
      >
        <template #item.vwap="{ item }">
          <span
            :class="[
              'font-mono transition-all duration-300',
              {
                'text-red': item.previous_vwap !== null && item.vwap < item.previous_vwap,
                'text-green': item.previous_vwap !== null && item.vwap > item.previous_vwap,
                'bg-green-lighten-4': item.vwapFlash && item.vwap > item.previous_vwap,
                'bg-red-lighten-4': item.vwapFlash && item.vwap < item.previous_vwap,
              },
            ]"
          >
            ${{ item.vwap ?? '—' }}
          </span>
        </template>
        <template #item.volume="{ item }">
          {{ item.volume ?? '—' }}
        </template>
        <template #item.open="{ item }">
          {{ item.open ?? '—' }}
        </template>
        <template #item.close="{ item }">
          {{ item.close ?? '—' }}
        </template>
        <template #item.high="{ item }">
          {{ item.high ?? '—' }}
        </template>
        <template #item.low="{ item }">
          {{ item.low ?? '—' }}
        </template>
      </v-data-table>
    </v-container>
  </template>

  <script setup>
  import { ref, onMounted, computed } from 'vue';

  const search = ref('');
  const initialSymbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA'];
  const stocks = ref({});

  initialSymbols.forEach(symbol => {
    stocks.value[symbol] = {
      sym: symbol,
      volume: null,
      accumulated_volume: null,
      official_open_price: null,
      vwap: null,
      previous_vwap: null,
      vwapFlash: false,
      open: null,
      close: null,
      high: null,
      low: null,
      average_size: null,
      updated: false,
    };
  });

  const headers = [
    { title: 'Symbol', key: 'sym' },
    { title: 'Volume', key: 'volume' },
    { title: 'VWAP', key: 'vwap' },
    { title: 'Open', key: 'open' },
    { title: 'Close', key: 'close' },
    { title: 'High', key: 'high' },
    { title: 'Low', key: 'low' },
  ];

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
        current.previous_vwap = current.vwap;

        if (stocks.value[symbol]) {
          Object.assign(stocks.value[symbol], {
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

          current.vwapFlash = true;
          setTimeout(() => {
            current.vwapFlash = false;
          }, 400);
        }
      });
    });
  };

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
  </script>
