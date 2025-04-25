<template>
    <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <v-card-title>{{ symbol }}</v-card-title>
        <div class="w-full">
            <div v-if="loading" class="flex items-center justify-center h-64">
                <span class="text-gray-500">Loading chart...</span>
            </div>

            <div v-else>
                <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
            </div>
        </div>
    </v-card>

</template>

<script>
import ApexCharts from 'apexcharts';
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
    },
    data() {
        return {
            loading: true,
            chartOptions: {},
            chartSeries: [],
        };
    },
    mounted() {
        this.loadChartData();
    },
    methods: {
        async loadChartData() {
            try {
                const intradayRes = await fetch(`/storage/intraday/${this.symbol}.json`);
                const prevCloseRes = await fetch('/storage/cache/previous_close.json');

                const intradayData = await intradayRes.json();
                const previousCloseData = await prevCloseRes.json();
                const prevCloseObj = previousCloseData.find(entry => entry.symbol === this.symbol);

                const pricePoints = intradayData.map(entry => ({
                    x: new Date(entry.timestamp),
                    y: entry.price,
                }));

                const lastPrice = pricePoints[pricePoints.length - 1]?.y;
                const prevClosePrice = parseFloat(prevCloseObj.prev_day_close);

                const isGreen = lastPrice >= prevClosePrice;

                const cutoff = new Date(intradayData[0].timestamp);
                cutoff.setUTCHours(20, 15, 0, 0);

                const regularHoursData = [];
                const afterHoursData = [];

                intradayData.forEach(entry => {
                    const entryTime = new Date(entry.timestamp);
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
                ];

                this.chartOptions = {
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
                        type: ['gradient', 'solid'], // First one is gradient for regular, second one no fill
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
