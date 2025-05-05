<template>

      <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <div class="w-full">
          <div v-if="loading" class="flex items-center justify-center h-64">
            <span class="text-gray-500">Loading chart...</span>
          </div>
          <div v-else>
            <apexchart type="bar" height="400" :options="chartOptions" :series="chartSeries" />
          </div>
        </div>
      </v-card>

  </template>

  <script>
  import VueApexCharts from 'vue3-apexcharts';
  import axios from 'axios';

  export default {
    name: 'StockSectorBarChart',
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        loading: true,
        chartOptions: {},
        chartSeries: [
          {
            name: 'Percentage Change',
            data: [],
          },
        ],
        categories: [],
      };
    },
    async mounted() {
      await this.loadData();
    },
    methods: {
      async loadData() {
        try {
          const response = await axios.get(`/get_sectors`);
          const sectorData = response.data;


          this.categories = sectorData.map((item) => item.sector_name);
          this.chartSeries[0].data = sectorData.map((item) => item.percentage_change);


          this.chartOptions = {
            chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false },
              zoom: { enabled: false },
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: '70%',
                borderRadius: 4,
                colors: {
                  ranges: [
                    {
                      from: -100,
                      to: -0.0001,
                      color: '#FF3B30',
                    },
                    {
                      from: 0,
                      to: 100,
                      color: '#00C076',
                    },
                  ],
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: this.categories,
              labels: {
                style: {
                  colors: '#ffffff',
                  fontSize: '14px',
                },
              },
              axisBorder: { show: false },
              axisTicks: { show: false },
              offsetX: 50,
            },
            yaxis: {
              labels: {
                style: {
                  colors: 'grey',
                  fontSize: '11px',
                },
              },
            },
            grid: {
              show: false,
            },
            title: {
              text: 'Sector Performance',
              align: 'left',
              style: {
                color: '#ffffff',
                fontSize: '18px',
              },
            },
            tooltip: {
              theme: 'dark',
              custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                const sectorName = this.categories[dataPointIndex];
                const value = series[seriesIndex][dataPointIndex].toFixed(2);
                return `
                  <div style="padding: 8px;">
                    <strong>${sectorName}</strong><br/>
                    ${value}%
                  </div>
                `;
              },
            },
          };

          this.loading = false;
        } catch (error) {
          console.error('Error loading sector data:', error);
          this.loading = false;
        }
      },
    },
  };
  </script>

  <style scoped></style>
