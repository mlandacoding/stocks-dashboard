<template>
    <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <v-card-title>{{ symbol }}</v-card-title>
        <div class="w-full">
            <div v-if="loading" class="flex items-center justify-center h-64">
                <span class="text-gray-500">Loading chart...</span>
            </div>

            <div v-else>
                <apexchart type="area" height="445" :options="chartOptions" :series="chartSeries"></apexchart>
            </div>
        </div>
    </v-card>

</template>

<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
    name: 'IntradayChart',
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        symbol: {
            type: String,
            default: 'SPY',
        },
        previous_close: {
            type: String
        }
    },
    data() {
        return {
            loading: true,
            chartOptions: {},
            chartSeries: [],
            previousCloseData: []
        };
    },
    async mounted() {
        this.loadChartData();
    },
    methods: {
        async loadChartData() {
            try {
                const intradayRes = await fetch(`/storage/intraday/${this.symbol}.json`);


                const intradayData = await intradayRes.json();

                const pricePoints = intradayData.map(entry => ({
                    x: new Date(entry.timestamp),
                    y: entry.price,
                }));

                const lastPrice = pricePoints[pricePoints.length - 1]?.y;
                const prevClosePrice = parseFloat(this.previous_close);

                const isGreen = lastPrice >= prevClosePrice;

                const cutoff = new Date(intradayData[0].timestamp);
                cutoff.setUTCHours(20, 15, 0, 0);

                const pre_market_cutoff = new Date(intradayData[0].timestamp);
                pre_market_cutoff.setUTCHours(13, 30, 0, 0);

                const regularHoursData = [];
                const afterHoursData = [];
                const preMarketHoursData = [];

                intradayData.forEach(entry => {
                    const entryTime = new Date(entry.timestamp);
                    if(entryTime <= pre_market_cutoff){
                        preMarketHoursData.push([entryTime.getTime(), entry.price]);
                    }
                    if (entryTime >= cutoff) {
                        afterHoursData.push([entryTime.getTime(), entry.price]);
                    } else {
                        regularHoursData.push([entryTime.getTime(), entry.price]);
                    }
                });

                this.chartSeries = [
                    {
                    name: 'Regular Hours',
                    data: regularHoursData,
                    color: isGreen ? '#00C076' : '#FF3B30',
                    },
                    {
                    name: 'After Hours',
                    data: afterHoursData,
                    color: isGreen ? '#A6EBC9' : '#F8B4B4',
                    },
                    {
                    name: 'Pre Market',
                    data: preMarketHoursData,
                    color: '#808080',
                    },
                ];

                this.chartOptions = {
                    annotations: {
                        yaxis: [
                            {
                                y: prevClosePrice,
                                borderColor: '#999',
                                strokeDashArray: 4,
                                label: {
                                    borderColor: '#999',
                                    style: {
                                        color: '#fff',
                                        background: '#999',
                                    },
                                    text: `Prev Close: $${prevClosePrice.toFixed(2)}`,
                                }
                            }
                        ]
                    },
                    chart: {
                        id: `chart-${this.symbol}`,
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    grid: {
                        yaxis: {
                            lines: {
                                show: false,
                            },
                        },
                    },
                    stroke: {
                        curve: 'straight',
                        width: 2,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    colors: [isGreen ? '#00e396' : '#ff4560'],
                    fill: {
                        type: ['gradient', 'solid'],
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.4,
                            opacityTo: 0,
                            stops: [0, 100],
                            colorStops: [
                            [
                                {
                                offset: 0,
                                color: isGreen ? '#00e396' : '#ff4560',
                                opacity: 0.4,
                                },
                                {
                                offset: 100,
                                color: isGreen ? '#00e396' : '#ff4560',
                                opacity: 0,
                                },
                            ]
                            ],
                        },
                        opacity: [1, 0],
                    },
                    tooltip: {
                        x: {
                            format: 'HH:mm',
                        },
                        theme: 'dark',
                    }
                };

                this.loading = false;
            } catch (error) {
                console.error('Error loading chart data:', error);
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped></style>
