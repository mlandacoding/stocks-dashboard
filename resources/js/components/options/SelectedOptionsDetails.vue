<template>
  <v-card-title class="text-h6">Selected Options Details</v-card-title>
  <v-card-text>
    <v-row dense>
      <!-- ITM Option -->
      <v-col cols="12" sm="6">
        <div class="mb-2">

          <div class="text-caption text-grey-lighten-1">{{ selectedITMOption.option_symbol }}</div>
          <div class="text-caption text-blue-lighten-1">Last Price: {{ selectedITMOption.last_price }}</div>
          <div class="text-caption text-blue-lighten-1">Strike Price: {{ selectedITMOption.strike_price }}</div>
          <div class="text-caption text-blue-lighten-1">Implied Volatility: {{ selectedITMOption.implied_volatility }}</div>
        </div>
        <ul class="pl-3">
          <li>Delta: {{ selectedITMOption.delta }}</li>
          <li>Gamma: {{ selectedITMOption.gamma }}</li>
          <li>Theta: {{ selectedITMOption.theta }}</li>
          <li>Vega: {{ selectedITMOption.vega }}</li>
        </ul>
      </v-col>

      <!-- OTM Option -->
      <v-col cols="12" sm="6">
        <div class="mb-2">

          <div class="text-caption text-grey-lighten-1">{{ selectedOTMOption.option_symbol }}</div>
          <div class="text-caption text-blue-lighten-1">Last Price: {{ selectedOTMOption.last_price }}</div>
          <div class="text-caption text-blue-lighten-1">Strike Price: {{ selectedOTMOption.strike_price }}</div>
          <div class="text-caption text-blue-lighten-1">Implied Volatility: {{ selectedOTMOption.implied_volatility }}</div>
        </div>
        <ul class="pl-3">
          <li>Delta: {{ selectedOTMOption.delta }}</li>
          <li>Gamma: {{ selectedOTMOption.gamma }}</li>
          <li>Theta: {{ selectedOTMOption.theta }}</li>
          <li>Vega: {{ selectedOTMOption.vega }}</li>
        </ul>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({
  selectedITMOption: {
    type: Object,
    required: true,
  },
  selectedOTMOption: {
    type: Object,
    required: true,
  },
});
</script>
