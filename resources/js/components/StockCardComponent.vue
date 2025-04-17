<template>
    <v-card class="pa-3" rounded="lg" elevation="0" :style="{...cardStyle, margin: '0 4px;'}" >
        <v-row align="center" no-gutters>
            <v-col cols="auto">
                <v-avatar v-if="localImageExists || logoUrlExists" size="40"
                    class="d-flex align-center justify-space-around">
                    <img v-if="localImageExists" :src="localLogoPath" alt="Local Logo" class="w-100 h-100" />
                    <img v-else-if="logoUrlExists" :src="logoUrl" alt="Brandfetch Logo" class="w-100 h-100" />
                </v-avatar>
                <v-avatar v-else rounded="0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" fill="currentColor"
                        class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                </v-avatar>
            </v-col>

            <v-col class="ms-4">
                <div class="d-flex align-center justify-space-between w-150">
                    <div>
                        <div class="text-white text-subtitle-1 font-weight-bold">{{ symbol }}</div>
                        <div class="text-medium-emphasis">
                            <h6>
                                {{ companyName }}
                            </h6>
                        </div>
                    </div>

                    <div class="d-flex align-center">
                        <v-icon :color="isUp ? 'green' : 'red'" size="20" class="me-1">
                            {{ isUp ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold' }}
                        </v-icon>
                        <div :class="isUp ? 'text-green' : 'text-red'" class="text-subtitle-1 font-weight-bold">
                            ${{ currentPrice.toFixed(2) }}
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { useTheme } from 'vuetify';
    import useStockStream from '@/composables/useStockStream';

    const props = defineProps({
        symbol: String,
    });

    const companyName = ref('');


    const { current } = useTheme();
    const cardStyle = computed(() => ({
        backgroundColor: current.value.colors.primary,
        border: '2px solid grey',
    }));


    const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
    const logoUrl = computed(() => `https://cdn.brandfetch.io/${props.symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`);
    const localLogoPath = computed(() =>`/storage/images/logos/${props.symbol}.png`);

    const localImageExists = ref(false);
    const logoUrlExists = ref(false);

    function checkIfImageExists(pathRef, targetRef) {
        const img = new Image();
        img.src = pathRef.value;
        img.onload = () => (targetRef.value = true);
        img.onerror = () => (targetRef.value = false);
    }

    const currentPrice = ref(props.price || 0);
    const isUp = ref(true);

    const stockStream = useStockStream();
    watch(
        () => stockStream.formattedStocks.value.find(s => s.sym === props.symbol),
        (stockUpdate) => {
            if (stockUpdate && stockUpdate.vwap !== null) {
                isUp.value = stockUpdate.vwap > currentPrice.value;
                currentPrice.value = stockUpdate.vwap;
            }
        },
        { immediate: true }
    );

    onMounted(async () => {
        try {
            const response = await axios.get(`/stocks_overview/company_name/${props.symbol}`);
            companyName.value = response.data.name;
        } catch (error) {
            console.error('Error fetching company name:', error);
            companyName.value = 'Unknown Company';
        }
        checkIfImageExists(logoUrl, logoUrlExists);
        checkIfImageExists(localLogoPath, localImageExists);
    });
</script>
