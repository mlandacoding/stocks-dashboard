<template>
    <v-card class="pa-4" rounded="xl" elevation="0" :style="cardStyle">
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <v-avatar size="40" class="d-flex align-center justify-space-around">
            <img v-if="localImageExists" :src="localLogoPath" alt="Local Logo" class="w-100 h-100" />
            <img v-else :src="logoUrl" alt="Brandfetch Logo"class="w-100 h-100" />
          </v-avatar>
        </v-col>

        <v-col class="ms-4">
          <div class="d-flex align-center justify-space-between w-100">
            <div>
              <div class="text-white text-subtitle-1 font-weight-bold">{{ symbol }}</div>
              <div class="text-medium-emphasis text-body-2">{{ company_name }}</div>
            </div>

            <div class="d-flex align-center">
              <v-icon :color="isUp ? 'green' : 'red'" size="20" class="me-1">
                {{ isUp ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold' }}
              </v-icon>
              <div :class="isUp ? 'text-green' : 'text-red'" class="text-subtitle-1 font-weight-bold">
                ${{ price.toFixed(2) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </template>


  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useTheme } from 'vuetify';

  const props = defineProps({
    logoUrl: String,
    symbol: String,
    company_name: String,
    price: Number,
    isUp: Boolean,
  });

  const svgPath = ref(null);

  const { current } = useTheme();

  const cardStyle = computed(() => ({
    backgroundColor: current.value.colors.primary,
    border: '2px solid grey',
  }));

  const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
  const logoUrl = computed(() =>`https://cdn.brandfetch.io/${props.symbol}/h/40/w/40?c=${apiKey}`)

    const localImageExists = ref(false)
    const localLogoPath = computed(() => `/storage/images/logos/${props.symbol}.png`)


  onMounted(async () => {
    try {
      const response = await fetch(`/stocks/${props.symbol}`);
      const data = await response.json();

      const res = await fetch(localLogoPath.value, { method: 'HEAD' })
        localImageExists.value = res.ok
    } catch (error) {
      localImageExists.value = false
    }
  });
  </script>
