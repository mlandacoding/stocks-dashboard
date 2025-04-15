<template>
    <div>
        <h1 class="text-2xl font-bold mb-4 text-center">Stonks App</h1>

        <div class="p-4">
            <h5 class="font-semibold mb-4">* Prices have a delay of 15 minutes</h5>
            <table class="min-w-full bg-white shadow rounded overflow-hidden">
                <thead class="bg-gray-200 text-gray-700">
                    <tr>
                        <th class="p-2">Symbol</th>
                        <th class="p-2">Volume</th>
                        <th class="p-2">VWAP</th>
                        <th class="p-2">Open</th>
                        <th class="p-2">Close</th>
                        <th class="p-2">High</th>
                        <th class="p-2">Low</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stock, symbol) in stocks" :key="symbol" class="border-t hover:bg-gray-50">
                        <td class="p-2 font-medium">{{ symbol }}</td>
                        <td class="p-2">{{ stock.volume ?? '—' }}</td>
                        <td class="p-2 font-mono transition-all duration-300"
                        :class="{
                            'text-red-600': stock.previous_vwap !== null && stock.vwap < stock.previous_vwap,
                            'text-green-600': stock.previous_vwap !== null && stock.vwap > stock.previous_vwap,
                            'bg-green-100': stock.vwapFlash && stock.vwap > stock.previous_vwap,
                            'bg-red-100': stock.vwapFlash && stock.vwap < stock.previous_vwap,
                        }"
                        >
                        ${{ stock.vwap ?? '—' }}
                        </td>
                        <td>{{ stock.open ?? '—' }}</td>
                        <td>{{ stock.close ?? '—' }}</td>
                        <td>{{ stock.high ?? '—' }}</td>
                        <td>{{ stock.low ?? '—' }}</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const initialSymbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA'];
const stocks = ref({});

initialSymbols.forEach(symbol => {
    stocks.value[symbol] = {
        symm: symbol,
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


const setupListeners = () => {

    window.Echo.channel('stocks')
        .listen('StockPriceUpdated', (payload) => {
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

        })

};

// Initialize on component mount
onMounted(() => {
    setupListeners();
});
</script>
