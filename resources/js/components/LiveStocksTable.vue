<template>
    <v-container style="color:aqua" class="py-12 custom-card">
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
        class="custom-table"
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

<style scoped>
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
    background: none !important; /* Remove background hover color */
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
