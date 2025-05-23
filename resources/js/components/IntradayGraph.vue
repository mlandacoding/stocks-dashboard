<template>
    <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <v-card-title><span style="text-transform:uppercase">{{ symbol }}</span> - Intraday</v-card-title>
        <div class="w-full">
            <div v-if="loading" class="flex items-center justify-center h-64">
                <v-card color="primary">
                    <br> <br>
                    <span class="text-gray-500"><h3>  Loading chart...</h3></span>
                </v-card>

            </div>

            <div v-else>
                <apexchart type="area" :height="height" :options="chartOptions" :series="chartSeries"></apexchart>
            </div>
        </div>
    </v-card>

</template>

<script>
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
            type: String,
        },
        height:{
            type: Number,
            default: 390
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
                const normalizedSymbol = this.symbol?.toUpperCase() ?? '';
                const intradayRes = await fetch(`/storage/intraday/${normalizedSymbol}.json`);


                const intradayData = await intradayRes.json();

                const pricePoints = intradayData.map(entry => ({
                    x: new Date(entry[0]),
                    y: entry[1],
                }));

                const lastPrice = pricePoints[pricePoints.length - 1]?.y;
                var prevClosePrice = 0;
                if (this.previous_close === '') {
                    try {
                        const res = await axios.get(`/prev_close/${this.symbol}`);
                        prevClosePrice = parseFloat(res.data['prev_day_close']);
                    } catch (error) {
                        console.error('Error fetching previous close:', error);
                    }
                } else {
                    prevClosePrice = parseFloat(this.previous_close);
                }

                const isGreen = lastPrice >= prevClosePrice;

                const cutoff = new Date(intradayData[0][0]);
                cutoff.setUTCHours(20, 15, 0, 0);

                const pre_market_cutoff = new Date(intradayData[0][0]);
                pre_market_cutoff.setUTCHours(13, 30, 0, 0);

                const regularHoursData = [];
                const afterHoursData = [];
                const preMarketHoursData = [];

                intradayData.forEach(entry => {
                    const entryTime = new Date(entry[0]);
                    if(entryTime <= pre_market_cutoff){
                        preMarketHoursData.push([entryTime.getTime(), entry[1]]);
                    }
                    if (entryTime >= cutoff) {
                        afterHoursData.push([entryTime.getTime(), entry[1]]);
                    } else {
                        regularHoursData.push([entryTime.getTime(), entry[1]]);
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
