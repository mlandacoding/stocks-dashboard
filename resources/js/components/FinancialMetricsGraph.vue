<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Financial Metrics - {{ symbol }}</h2>
        <apexchart v-if="series.length" type="line" height="400" :options="chartOptions" :series="series"/>
    </div>
  </template>

  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import VueApexCharts from 'vue3-apexcharts';

  export default defineComponent({
    name: 'FinancialChart',
    components: {
      apexchart: VueApexCharts,
    },
    props: {
      symbol: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const series = ref([]);
      const chartOptions = ref({});

      onMounted(async () => {
        try {
          const response = await axios.get(
            `/getMetricsForLastFive/${props.symbol}?metrics=gross_profit,net_cash_flow`
          );

          const data = response.data;

          const categories = data['Gross Profit'].map(entry =>
            new Date(entry.filing_date).toLocaleDateString()
          );

          const grossProfitData = data['Gross Profit'].map(entry =>
            parseFloat(entry.value)
          );

          const netCashFlowData = data['Net Cash Flow'].map(entry =>
            parseFloat(entry.value)
          );

          series.value = [
            {
              name: 'Gross Profit',
              type: 'column',
              data: grossProfitData,
            },
            {
              name: 'Net Cash Flow',
              type: 'line',
              data: netCashFlowData,
            },
          ];

          chartOptions.value = {
            chart: {
                height: 400,
                type: 'line',
                toolbar: { show: false },
                zoom: { enabled: false },
            },

            stroke: {
              width: [0, 3],
            },
            title: {
              text: 'Gross Profit (Bar) vs Net Cash Flow (Line)',
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
            },
            labels: categories,
            grid: {
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
              type: 'category'
            },
            yaxis: [
            {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    {
      opposite: true,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
            ],
            tooltip: {
                x: {
                    format: 'HH:mm',
                },
                theme: 'dark',
            }
          };
        } catch (error) {
          console.error('Failed to fetch metrics:', error);
        }
      });

      return {
        series,
        chartOptions,
      };
    },
  });
  </script>
